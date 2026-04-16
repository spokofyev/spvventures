"""
Telegram bot providing a Claude Code-like interface via Telegram.

Setup:
  1. Copy .env.example to .env and fill in your tokens
  2. pip install -r requirements.txt
  3. python bot.py
"""

import os
import logging
from collections import defaultdict

import anthropic
from dotenv import load_dotenv
from telegram import Update
from telegram.constants import ChatAction, ParseMode
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

load_dotenv()

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

TELEGRAM_BOT_TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]
ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]

_raw_ids = os.getenv("ALLOWED_USER_IDS", "").strip()
ALLOWED_USER_IDS: set[int] = (
    {int(uid.strip()) for uid in _raw_ids.split(",") if uid.strip()}
    if _raw_ids
    else set()
)

MAX_TG_MESSAGE = 4096

# Per-user conversation history: list of {"role": ..., "content": ...}
conversation_histories: dict[int, list] = defaultdict(list)

claude = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

SYSTEM_PROMPT = """You are Claude Code, an expert AI assistant for software engineering tasks running via Telegram. You help with:
- Writing, reviewing, and debugging code in any language
- Architecture decisions and technical design
- Explaining complex concepts clearly
- Analysing code and suggesting improvements
- Shell commands, git operations, and DevOps tasks

Format your responses for readability. Use markdown code blocks (```language) for code snippets. Be concise but thorough."""


def _is_allowed(user_id: int) -> bool:
    return not ALLOWED_USER_IDS or user_id in ALLOWED_USER_IDS


def _split_message(text: str) -> list[str]:
    """Split text into Telegram-safe chunks respecting MAX_TG_MESSAGE."""
    if len(text) <= MAX_TG_MESSAGE:
        return [text]
    chunks = []
    while text:
        if len(text) <= MAX_TG_MESSAGE:
            chunks.append(text)
            break
        # Try to split at a newline boundary
        split_at = text.rfind("\n", 0, MAX_TG_MESSAGE)
        if split_at == -1:
            split_at = MAX_TG_MESSAGE
        chunks.append(text[:split_at])
        text = text[split_at:].lstrip("\n")
    return chunks


async def _send_long(update: Update, text: str) -> None:
    """Send potentially-long text, splitting across multiple messages if needed."""
    for chunk in _split_message(text):
        await update.message.reply_text(chunk, parse_mode=ParseMode.MARKDOWN)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_id = update.effective_user.id
    if not _is_allowed(user_id):
        await update.message.reply_text("Sorry, you are not authorised to use this bot.")
        return
    await update.message.reply_text(
        "👋 *Claude Code on Telegram*\n\n"
        "Ask me anything about software engineering — code, debugging, architecture, shell commands, and more.\n\n"
        "Commands:\n"
        "• /clear — Start a new conversation\n"
        "• /help — Show this message",
        parse_mode=ParseMode.MARKDOWN,
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await start(update, context)


async def clear(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_id = update.effective_user.id
    if not _is_allowed(user_id):
        return
    conversation_histories[user_id].clear()
    await update.message.reply_text("✅ Conversation cleared. Starting fresh!")


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_id = update.effective_user.id
    if not _is_allowed(user_id):
        await update.message.reply_text("Sorry, you are not authorised to use this bot.")
        return

    user_text = update.message.text
    if not user_text:
        return

    await context.bot.send_chat_action(
        chat_id=update.effective_chat.id, action=ChatAction.TYPING
    )

    history = conversation_histories[user_id]
    history.append({"role": "user", "content": user_text})

    try:
        # Build messages with prompt caching on the system prompt.
        # The cache_control marker is placed on the system block so that the
        # large system prompt is cached across turns, reducing cost significantly.
        response = claude.messages.create(
            model="claude-opus-4-7",
            max_tokens=8192,
            system=[
                {
                    "type": "text",
                    "text": SYSTEM_PROMPT,
                    "cache_control": {"type": "ephemeral"},
                }
            ],
            thinking={"type": "adaptive"},
            messages=history,
        )

        # Extract the text reply (skip thinking blocks)
        reply_parts = [
            block.text
            for block in response.content
            if block.type == "text"
        ]
        reply = "\n".join(reply_parts).strip()

        if not reply:
            reply = "_(No response generated)_"

        # Append the full content (including thinking blocks) to maintain
        # accurate conversation history for the API.
        history.append({"role": "assistant", "content": response.content})

        await _send_long(update, reply)

        logger.info(
            "user=%d tokens_in=%d tokens_out=%d cache_read=%d cache_write=%d",
            user_id,
            response.usage.input_tokens,
            response.usage.output_tokens,
            getattr(response.usage, "cache_read_input_tokens", 0),
            getattr(response.usage, "cache_creation_input_tokens", 0),
        )

    except anthropic.RateLimitError:
        await update.message.reply_text("⚠️ Rate limit hit. Please wait a moment and try again.")
        history.pop()  # Remove the unsent user message
    except anthropic.AuthenticationError:
        await update.message.reply_text("❌ API authentication failed. Check your ANTHROPIC_API_KEY.")
        history.pop()
    except anthropic.APIError as exc:
        logger.error("Anthropic API error: %s", exc)
        await update.message.reply_text(f"❌ API error: {exc.message}")
        history.pop()
    except Exception as exc:
        logger.exception("Unexpected error: %s", exc)
        await update.message.reply_text("❌ An unexpected error occurred. Please try again.")
        history.pop()


def main() -> None:
    app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(CommandHandler("clear", clear))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    logger.info("Bot started. Press Ctrl+C to stop.")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
