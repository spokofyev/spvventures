"""
Telegram bot that drives Claude Code via the `claude` CLI.
No Anthropic API key needed — uses your current Claude Code plan.

Setup:
  1. Copy .env.example to .env and set TELEGRAM_BOT_TOKEN
  2. pip install -r requirements.txt
  3. python bot.py
"""

import asyncio
import json
import logging
import os
import subprocess
from collections import defaultdict

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

_raw_ids = os.getenv("ALLOWED_USER_IDS", "").strip()
ALLOWED_USER_IDS: set[int] = (
    {int(uid.strip()) for uid in _raw_ids.split(",") if uid.strip()}
    if _raw_ids
    else set()
)

CLAUDE_BIN = os.getenv("CLAUDE_BIN", "claude")
WORK_DIR = os.getenv("CLAUDE_WORK_DIR", os.path.expanduser("~"))
MAX_TG_MESSAGE = 4096

# Per-user Claude Code session IDs (persists for the lifetime of the bot process)
user_sessions: dict[int, str] = {}
# Lock per user to prevent concurrent claude invocations
user_locks: dict[int, asyncio.Lock] = defaultdict(asyncio.Lock)


def _is_allowed(user_id: int) -> bool:
    return not ALLOWED_USER_IDS or user_id in ALLOWED_USER_IDS


def _split_message(text: str) -> list[str]:
    """Split text into Telegram-safe chunks, preferring newline boundaries."""
    if len(text) <= MAX_TG_MESSAGE:
        return [text]
    chunks = []
    while text:
        if len(text) <= MAX_TG_MESSAGE:
            chunks.append(text)
            break
        split_at = text.rfind("\n", 0, MAX_TG_MESSAGE)
        if split_at == -1:
            split_at = MAX_TG_MESSAGE
        chunks.append(text[:split_at])
        text = text[split_at:].lstrip("\n")
    return chunks


async def _run_claude(prompt: str, session_id: str | None) -> tuple[str, str]:
    """
    Invoke `claude -p` and return (reply_text, session_id).
    Raises RuntimeError on failure.
    """
    cmd = [
        CLAUDE_BIN,
        "-p", prompt,
        "--output-format", "json",
    ]
    if session_id:
        cmd += ["--resume", session_id]

    loop = asyncio.get_running_loop()

    def _run() -> subprocess.CompletedProcess:
        return subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            cwd=WORK_DIR,
            timeout=120,
        )

    proc = await loop.run_in_executor(None, _run)

    if proc.returncode != 0:
        stderr = proc.stderr.strip()
        raise RuntimeError(stderr or f"claude exited with code {proc.returncode}")

    try:
        data = json.loads(proc.stdout)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Unexpected output: {proc.stdout[:200]}") from exc

    if data.get("is_error"):
        raise RuntimeError(data.get("result", "Unknown error from claude"))

    reply = data.get("result", "").strip()
    new_session_id = data.get("session_id", session_id or "")
    return reply, new_session_id


async def _send_long(update: Update, text: str) -> None:
    for chunk in _split_message(text):
        try:
            await update.message.reply_text(chunk, parse_mode=ParseMode.MARKDOWN)
        except Exception:
            # Fall back to plain text if markdown fails
            await update.message.reply_text(chunk)


# ── Command handlers ──────────────────────────────────────────────────────────

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not _is_allowed(update.effective_user.id):
        await update.message.reply_text("Sorry, you are not authorised to use this bot.")
        return
    await update.message.reply_text(
        "*Claude Code — Telegram*\n\n"
        "Ask me anything: code, debugging, shell commands, architecture.\n\n"
        "Commands:\n"
        "• /clear — start a fresh session\n"
        "• /help  — show this message",
        parse_mode=ParseMode.MARKDOWN,
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await start(update, context)


async def clear(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    uid = update.effective_user.id
    if not _is_allowed(uid):
        return
    user_sessions.pop(uid, None)
    await update.message.reply_text("Session cleared. Starting fresh!")


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    uid = update.effective_user.id
    if not _is_allowed(uid):
        await update.message.reply_text("Sorry, you are not authorised to use this bot.")
        return

    user_text = update.message.text
    if not user_text:
        return

    async with user_locks[uid]:
        await context.bot.send_chat_action(
            chat_id=update.effective_chat.id, action=ChatAction.TYPING
        )

        session_id = user_sessions.get(uid)
        try:
            reply, new_session_id = await _run_claude(user_text, session_id)
            user_sessions[uid] = new_session_id
            logger.info("user=%d session=%s", uid, new_session_id)
        except asyncio.TimeoutError:
            await update.message.reply_text("⏱ Timed out (>120s). Try a simpler prompt.")
            return
        except RuntimeError as exc:
            logger.error("claude error for user=%d: %s", uid, exc)
            await update.message.reply_text(f"❌ {exc}")
            return

        if not reply:
            reply = "_(No response)_"

        await _send_long(update, reply)


# ── Entry point ───────────────────────────────────────────────────────────────

def main() -> None:
    app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(CommandHandler("clear", clear))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    logger.info("Bot started (claude bin: %s, workdir: %s)", CLAUDE_BIN, WORK_DIR)
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
