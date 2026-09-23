# kulonspace.com email — minimum working setup

Three DNS records. That is the whole job.

Everything else (DKIM, DMARC, forwarding, send-as) is optional hardening that
can wait. Do not do it now.

## The three records

<https://vercel.com/spokofyevs-projects/~/domains/kulonspace.com> → **DNS** tab.
Leave the Name field blank on all three.

| # | Type | Name | Value | Priority |
|---|------|------|-------|----------|
| 1 | TXT | *(blank)* | `google-site-verification=…` ← copy from Google | — |
| 2 | MX | *(blank)* | `smtp.google.com` | `1` |
| 3 | TXT | *(blank)* | `v=spf1 include:_spf.google.com ~all` | — |

Add record 1, press **Confirm** in the Google console, then add 2 and 3.

If Confirm fails, wait five minutes and press it again. That is DNS
propagation, not a mistake.

## Then

Open the Gmail app, add `sergey@kulonspace.com` as a second account.
It sends and receives. Done.

## Later, if you want it (not now)

- **DKIM** — admin.google.com → Apps → Google Workspace → Gmail →
  Authenticate email → Generate. Adds one TXT at `google._domainkey`.
  Improves deliverability. Worth doing within a week or two.
- **DMARC** — TXT at `_dmarc`:
  `v=DMARC1; p=none; rua=mailto:sergey@kulonspace.com`
  Start at `p=none`. Only tighten to `p=reject` after weeks of clean reports.
- **One inbox instead of two** — forward Workspace to the personal Gmail and
  add a send-as identity. Needs 2-Step Verification plus an App Password.
  Fiddly, and Google keeps tightening app-password policy. The second-account
  approach above is more robust.

## Verifying

```bash
dig MX  kulonspace.com +short        # expect: 1 smtp.google.com.
dig TXT kulonspace.com +short        # expect: verification + spf
```

## Note on the superseded plan

Earlier versions of this doc described free forwarding via Forward Email
(MX `mx1`/`mx2.forwardemail.net`, SPF `v=spf1 -all`). **Do not apply those.**
They conflict with Workspace: two providers cannot share MX records, and
`v=spf1 -all` forbids all outbound mail as the domain, which would reject
everything sent from `sergey@kulonspace.com`.
