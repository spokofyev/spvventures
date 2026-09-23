# kulonspace.com — email

**Plan changed 2026-09-23: Google Workspace, not Forward Email forwarding.**

Google Workspace gives a real mailbox at `sergey@kulonspace.com` that both
sends and receives. That supersedes the free forwarding plan below, which was
receive-only.

## ⚠️ Do NOT apply the old forwarding records

An earlier version of this file listed Forward Email MX records plus
`v=spf1 -all`. **Applying those alongside Google Workspace will break mail:**

- A domain can have only one mail provider's MX records. Forward Email's and
  Google's cannot coexist.
- `v=spf1 -all` declares that *nobody* may send as `@kulonspace.com`. With
  Workspace active, every message sent from `sergey@kulonspace.com` would be
  rejected or spam-filed.
- `p=reject` DMARC on top of a contradictory SPF compounds the failure.

Those records were correct for a receive-only forwarding setup. They are
actively wrong for Workspace.

## Step 1 — verify domain ownership

Google offers two options; **either one alone is sufficient.** TXT is the
simpler path.

| Type | Name | Value |
|------|------|-------|
| TXT | *(blank / `@`)* | `google-site-verification=…` — copy from the Workspace console |
| *or* CNAME | `kgvym7lbufjn` | `gv-7k55ngncarnqhy.dv.googlehosted.com` |

**Copy the verification token from Google's own UI using its copy button.**
Do not retype it or transcribe it from a screenshot — it is a random string,
and one wrong character fails verification with no useful error.

## Step 2 — mail routing (after verification succeeds)

Google's current setup uses a single MX record:

| Type | Name | Value | Priority |
|------|------|-------|----------|
| MX | *(blank / `@`)* | `smtp.google.com` | `1` |

The legacy five-record set (`aspmx.l.google.com`, `alt1…` … `alt4…`) still
works but is no longer what Google recommends. Use whichever the console
shows you — both hostnames verified live 2026-09-23.

There must be **no other MX records** on the domain.

## Step 3 — authentication

| Type | Name | Value |
|------|------|-------|
| TXT | *(blank / `@`)* | `v=spf1 include:_spf.google.com ~all` |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:sergey@kulonspace.com` |

`include:_spf.google.com` authorises Google's sending infrastructure —
verified live and currently resolving.

DMARC starts at `p=none` deliberately: it monitors and reports without
rejecting anything while mail flow settles. Tighten to `p=quarantine` and
then `p=reject` after a couple of weeks of clean reports. Jumping straight
to `p=reject` on a new domain risks silently destroying legitimate mail.

**DKIM** is generated inside the Workspace admin console (Apps → Google
Workspace → Gmail → Authenticate email) and produces a long TXT record at
`google._domainkey`. Turn it on — SPF alone is not enough for good
deliverability.

## Where these go

<https://vercel.com/spokofyevs-projects/~/domains/kulonspace.com> → **DNS** tab.

## Open question: two inboxes

Workspace creates a **separate mailbox** at `sergey@kulonspace.com`. It does
not redirect into `prokofiev.sv@gmail.com`, which was the original goal. Left
as-is that means two inboxes to monitor.

Options:
- Use the Workspace inbox as primary and let the personal Gmail be personal.
- Set Workspace to forward to the personal Gmail, and add
  `sergey@kulonspace.com` as a *Send mail as* identity there — one inbox,
  correct reply address. Usually the right answer when the domain address is
  mainly outward-facing.

## Cost

Workspace Business Starter is roughly $7–8.40/user/month. For comparison the
abandoned alternatives were $0 (receive-only forwarding) and ~$3/month
(Forward Email paid, forwarding plus outbound SMTP). Workspace costs more and
delivers considerably more: a real mailbox, plus Drive, Calendar and Meet on
the domain.
