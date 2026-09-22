# kulonspace.com — email forwarding to Gmail

Free, no-signup email forwarding for `kulonspace.com`, delivered to
`prokofiev.sv@gmail.com`. Everything is configured in DNS; there is no
account to create and no monthly cost.

## Provider

[Forward Email](https://forwardemail.net) — open source, free tier, and the
only major forwarder whose free plan is **configured entirely through DNS
records**. No signup, no dashboard, no password.

## Where the records go

`kulonspace.com` is registered through **Vercel Registrar** and uses Vercel's
nameservers (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`), so Vercel is the
authoritative DNS host.

Vercel Dashboard → **Domains** → **kulonspace.com** → **DNS** tab → *Add Record*.

## The records

### Required — makes mail arrive

| Type | Name        | Value                                     | Priority |
|------|-------------|-------------------------------------------|----------|
| MX   | *(leave blank / `@`)* | `mx1.forwardemail.net`          | `10`     |
| MX   | *(leave blank / `@`)* | `mx2.forwardemail.net`          | `20`     |
| TXT  | *(leave blank / `@`)* | `forward-email=prokofiev.sv@gmail.com` | — |

Both MX records must exist and be spelled exactly as above, and there must be
**no other MX records** on the domain.

The TXT record above is a **catch-all**: every address at the domain
(`hello@`, `sergey@`, `invoices@`, anything) forwards to the Gmail inbox. No
per-address setup, ever.

To forward only specific addresses instead of catch-all, use this form:

```
forward-email=hello:prokofiev.sv@gmail.com,invoices:prokofiev.sv@gmail.com
```

### Recommended — anti-spoofing hardening

| Type | Name     | Value                                     |
|------|----------|-------------------------------------------|
| TXT  | *(blank / `@`)* | `v=spf1 -all`                      |
| TXT  | `_dmarc` | `v=DMARC1; p=reject; adkim=s; aspf=s`     |

These two say: *nobody is authorised to send mail as `@kulonspace.com`, and
receiving servers should reject anything that claims to be.* On a brand-new
domain this is the correct, strictest setting — it stops the domain being used
in spoofing and phishing before it ever gets a reputation.

They only govern **outbound** mail. Inbound forwarding is unaffected.

## Verifying

DNS propagation takes anywhere from a minute to an hour (TTL is 3600s).

```bash
dig MX kulonspace.com +short
dig TXT kulonspace.com +short
```

Then send a test message to any address at the domain and watch the Gmail
inbox.

## Known trade-offs

**The destination address is public.** On the free tier the forwarding target
lives in a public TXT record, so anyone who queries DNS for `kulonspace.com`
can read `prokofiev.sv@gmail.com`. This is inherent to the free plan — the
config *is* the DNS. Options if that matters:

- Forward Email's paid plan (~$3/mo) stores the mapping encrypted instead.
- Cloudflare Email Routing is free and keeps destinations private, but the
  domain's nameservers would have to move from Vercel to Cloudflare.

**Catch-all attracts spam eventually.** Dictionary attacks on catch-all
domains are common once a domain has been around a while. Gmail's spam
filtering absorbs most of it. Switch to the named-alias form above if it ever
gets noisy.

**This is receive-only.** Forwarding *into* Gmail works immediately. Sending
*as* `you@kulonspace.com` is a separate problem — it needs an outbound SMTP
relay plus Gmail's "Send mail as" setup, and requires relaxing the `v=spf1
-all` record above. Forward Email's free tier does not include outbound SMTP.
