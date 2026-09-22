# kulonspace.com — email forwarding to Gmail

Route all mail at `kulonspace.com` — including `sergey@kulonspace.com` — into
`prokofiev.sv@gmail.com`. Free, no account, no monthly cost.

## Status

| Piece | State |
|---|---|
| Domain registered (Vercel Registrar) | ✅ done |
| Vercel nameservers authoritative | ✅ verified (`ns1`/`ns2.vercel-dns.com`) |
| Forward Email MX hosts reachable | ✅ verified 2026-09-22 |
| Record values validated | ✅ syntax + hosts confirmed |
| **Records applied to the zone** | ❌ **must be pasted by hand — see below** |
| Receiving mail at the domain | ⛔ blocked until records applied |
| Sending *as* the domain | ⛔ not possible on the free tier — see Limits |

## Provider

[Forward Email](https://forwardemail.net) — open source, free tier, and the
only major forwarder whose free plan is configured **entirely through DNS**.
No signup, no dashboard, no password to store.

## Applying the records

`kulonspace.com` uses Vercel's nameservers, so Vercel is the authoritative DNS
host: <https://vercel.com/spokofyevs-projects/~/domains/kulonspace.com>
→ **DNS** tab → *Add Record*. Leave the Name field blank on the first four.

| Type | Name | Value | Priority |
|------|------|-------|----------|
| MX   | *(blank)* | `mx1.forwardemail.net` | `10` |
| MX   | *(blank)* | `mx2.forwardemail.net` | `20` |
| TXT  | *(blank)* | `forward-email=prokofiev.sv@gmail.com` | — |
| TXT  | *(blank)* | `v=spf1 -all` | — |
| TXT  | `_dmarc`  | `v=DMARC1; p=reject; adkim=s; aspf=s` | — |

Both MX records must exist, spelled exactly as above, with **no other MX
records** on the domain.

### What each one does

Records 1–3 make mail arrive. The third is a **catch-all**: every address at
the domain — `sergey@`, `hello@`, `invoices@`, anything invented on the spot —
forwards to Gmail with no further DNS work, ever.

Records 4–5 are anti-spoofing. They declare that *nobody* is authorised to
send mail as `@kulonspace.com` and that receivers should reject anything
claiming to be. On a domain that sends no outbound mail this is the correct
strictest setting, and it stops the domain being used for phishing before it
builds any reputation. They govern outbound only; inbound forwarding is
unaffected.

### Locking to one address instead

To forward only `sergey@` and bounce everything else, replace record 3 with:

```
forward-email=sergey:prokofiev.sv@gmail.com
```

Capitalisation is irrelevant to delivery — Forward Email matches the local
part case-insensitively, as does every mainstream provider. `Sergey@kulonspace.com`
on a business card resolves to the same mailbox.

## Verifying

TTL is 3600s, so propagation takes a minute to an hour.

```bash
dig MX kulonspace.com +short
dig TXT kulonspace.com +short
dig TXT _dmarc.kulonspace.com +short
```

## Limits worth understanding

**This is receive-only, and that has a visible consequence.** Mail sent *to*
`sergey@kulonspace.com` lands in Gmail. But replies go out as
`prokofiev.sv@gmail.com` — the domain address cannot send. Handing the address
out and then replying from a Gmail address undercuts much of the point of
having the domain.

Fixing that requires outbound SMTP, which the free tier does not include:

- **Forward Email paid (~$3/mo)** — adds SMTP, so Gmail's *Send mail as* works
  and replies come from `sergey@kulonspace.com`. Also encrypts the forwarding
  mapping. This is the cheapest real fix. Requires relaxing record 4 (`v=spf1
  -all`) to authorise the relay.
- **Google Workspace (~$7/user/mo)** — a full mailbox rather than forwarding.

**The destination address is public.** On the free tier the forwarding target
lives in a public TXT record, so anyone querying DNS for `kulonspace.com` can
read `prokofiev.sv@gmail.com`. This is inherent — on this plan the config *is*
the DNS. Cloudflare Email Routing is free and keeps destinations private, but
the nameservers would have to move off Vercel.

**Catch-all attracts spam eventually.** Dictionary attacks on catch-all
domains are routine once a domain has age. Gmail's filtering absorbs most of
it; switch to the locked-down form above if it gets noisy.
