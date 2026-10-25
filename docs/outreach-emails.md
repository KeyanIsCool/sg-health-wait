# Outreach emails — requesting permission to display live A&E wait times

Three public clusters cover every public hospital A&E in Singapore:

- **SingHealth** — SGH, CGH, KKH, SKH
- **NUHS** — NUH, NTFGH, Alexandra Hospital
- **NHG** (National Healthcare Group) — TTSH, KTPH, Woodlands Health

Private hospitals (Mount Elizabeth, Gleneagles, Raffles Hospital, etc.) are addressed separately.

Replace the placeholders (`[Your name]`, `[Your email]`, `[sg-health-wait.vercel.app]`, polling frequency, etc.) before sending. Send one email per cluster — not individual hospitals — because the cluster corp-comms team routes permissions internally.

**Tone note:** polite, specific, short. The recipient is a comms officer who gets a lot of mail; the shorter and more concrete the ask, the higher the chance of a response.

---

## 1. SingHealth

**Send to:** `corporate.communications@singhealth.com.sg`
**CC:** `webmaster@sgh.com.sg` (optional, so the technical team sees it)
**Subject:** Permission request — displaying SingHealth A&E wait times on a public-benefit website

> Dear SingHealth Group Corporate Communications team,
>
> My name is Keyan and I am building a small public-benefit website — **SG Health Wait** ([https://sg-health-wait.vercel.app](https://sg-health-wait.vercel.app)) — that helps Singapore residents quickly compare estimated A&E wait times across public and private hospitals when they are deciding where to go for care.
>
> I am writing to formally request SingHealth's permission to **read and display the live A&E estimated wait time** figures that your hospitals (SGH, CGH, KKH, SKH) already publish on their public websites, with full attribution to the originating hospital on every record.
>
> **What I would like to do**
>
> - Fetch the wait-time figure from each hospital's public A&E page once every **15 minutes**, with a clearly identified user agent (`SG-Health-Wait/1.0 — <my email>`).
> - Display the figure on my site **tagged as "Official — source: <Hospital name>"**, with a direct link back to the hospital's own page as the authoritative source.
> - Show a timestamp ("Updated 7 min ago") and automatically downgrade or hide the number if it becomes stale.
> - Reproduce the number only — not the hospital's branding, layout, or any other content.
>
> **Intent and funding**
>
> This is a **personal, public-benefit project**, not a commercial service. I am a Singapore resident building this because I have personally struggled to decide between A&E options during family emergencies. The site may carry **modest display advertising** (Google AdSense) solely to cover **domain renewal, hosting, and database costs**. There is no paid tier, no sponsored placement of hospitals, no clinical recommendation, and A&E ordering is never influenced by advertising. Every page carries a prominent emergency notice directing users to call 995 for emergencies.
>
> **Safeguards**
>
> - I will respect `robots.txt` and any technical rate limit you specify.
> - I will **stop immediately** on any written request from your office, and provide a contact address (`hello@sg-health-wait.vercel.app`) for take-down requests.
> - I will not fetch any authenticated endpoint, bypass any technical measure, or republish anything beyond the single wait-time figure.
> - I will link back to the hospital's own wait-time page on every record and never present my estimate as more authoritative than yours.
>
> If this is acceptable, I would be grateful for a short written confirmation (an email reply is sufficient). If you would prefer alternative arrangements — a slower fetch rate, a different attribution format, an API arrangement, or a licensing conversation — I am happy to work within whatever framework SingHealth suggests.
>
> I appreciate how busy your team is and I understand if the answer is no. Thank you for considering this request.
>
> Warm regards,
> **Keyan [Last name]**
> [Your email]
> [Your phone, optional]
> [https://sg-health-wait.vercel.app](https://sg-health-wait.vercel.app)
> [https://github.com/KeyanIsCool/sg-health-wait](https://github.com/KeyanIsCool/sg-health-wait) *(source code, for transparency)*

---

## 2. NUHS (National University Health System)

**Send to:** `corporate_communications@nuhs.edu.sg`
**CC:** `info@nuh.com.sg` (optional)
**Subject:** Permission request — displaying NUHS A&E wait times on a public-benefit website

> Dear NUHS Corporate Communications team,
>
> My name is Keyan and I am building a small public-benefit website — **SG Health Wait** ([https://sg-health-wait.vercel.app](https://sg-health-wait.vercel.app)) — that helps Singapore residents quickly compare estimated A&E wait times across hospitals when deciding where to seek care.
>
> I am writing to formally request NUHS's permission to **read and display the live A&E estimated wait time** figures that your hospitals (NUH, NTFGH, Alexandra Hospital) publish on their public websites, with full attribution on every record.
>
> **What I would like to do**
>
> - Fetch the wait-time figure from each hospital's public A&E page once every **15 minutes**, with an identified user agent (`SG-Health-Wait/1.0 — <my email>`).
> - Display the figure on my site **tagged as "Official — source: <Hospital name>"**, linking back to the originating hospital page as the authoritative source.
> - Show a timestamp and automatically mark the figure stale if the source hasn't been reached recently.
> - Reproduce the single wait-time number only — not any branding, layout, or other content.
>
> **Intent and funding**
>
> This is a **personal, public-benefit project**, not a commercial service. I built it because I have, more than once, found myself trying to work out which A&E to go to during a family emergency and wished a single comparison existed. The site may carry **modest display advertising** (Google AdSense) solely to cover **domain, hosting, and database costs**. There is no paid tier, no sponsored placement, no clinical recommendation, and hospital ordering is never influenced by advertising. Every page carries a prominent emergency notice directing users to call 995 for emergencies.
>
> **Safeguards**
>
> - I will respect `robots.txt` and any technical rate limit you specify.
> - I will **stop immediately** on any written request from your office.
> - I will not fetch any authenticated endpoint or bypass any technical measure.
> - A contact address (`hello@sg-health-wait.vercel.app`) is available for take-down or correction requests, and I will respond within one working day.
>
> If this is acceptable, a short written confirmation would be enough for me to proceed. If NUHS would prefer a different arrangement — slower polling, a specific attribution line, an API or licence — I am happy to work within whatever framework you suggest.
>
> I appreciate the time your team spends on requests like this. Thank you for considering it.
>
> Warm regards,
> **Keyan [Last name]**
> [Your email]
> [Your phone, optional]
> [https://sg-health-wait.vercel.app](https://sg-health-wait.vercel.app)
> [https://github.com/KeyanIsCool/sg-health-wait](https://github.com/KeyanIsCool/sg-health-wait)

---

## 3. NHG (National Healthcare Group)

**Send to:** `corporate_communications@nhg.com.sg`
**CC:** `enquiries@ttsh.com.sg` (optional)
**Subject:** Permission request — displaying NHG A&E wait times on a public-benefit website

> Dear NHG Group Communications team,
>
> My name is Keyan and I am building a small public-benefit website — **SG Health Wait** ([https://sg-health-wait.vercel.app](https://sg-health-wait.vercel.app)) — that helps Singapore residents quickly compare estimated A&E wait times across hospitals when deciding where to seek care.
>
> I am writing to formally request NHG's permission to **read and display the live A&E estimated wait time** figures that your hospitals (TTSH, KTPH, Woodlands Health) publish on their public websites, with full attribution on every record.
>
> **What I would like to do**
>
> - Fetch the wait-time figure from each hospital's public A&E page once every **15 minutes**, with an identified user agent (`SG-Health-Wait/1.0 — <my email>`).
> - Display the figure on my site **tagged as "Official — source: <Hospital name>"**, with a direct link back to the originating hospital page.
> - Show a timestamp and automatically mark the figure stale when it is no longer recent.
> - Reproduce only the single wait-time number — not any branding, page layout, or other content.
>
> **Intent and funding**
>
> This is a **personal, public-benefit project**, not a commercial service. I built it after personally having to make quick decisions between A&E options during family emergencies and wishing a single comparison existed. The site may carry **modest display advertising** (Google AdSense) solely to cover **domain, hosting, and database costs**. There is no paid tier, no sponsored placement, no clinical recommendation, and hospital ordering is never influenced by advertising. Every page carries a prominent emergency notice directing users to call 995 for emergencies.
>
> **Safeguards**
>
> - I will respect `robots.txt` and any technical rate limit you specify.
> - I will **stop immediately** on any written request from your office.
> - I will not access authenticated endpoints or bypass any technical measure.
> - A contact address (`hello@sg-health-wait.vercel.app`) is available for take-down or correction requests, with a one-working-day response commitment.
>
> If this is acceptable, a short written confirmation is sufficient for me to proceed. If NHG would prefer a different arrangement — slower polling, a specific attribution line, an API or licence — I am happy to work within whatever framework you suggest.
>
> Thank you for considering this request.
>
> Warm regards,
> **Keyan [Last name]**
> [Your email]
> [Your phone, optional]
> [https://sg-health-wait.vercel.app](https://sg-health-wait.vercel.app)
> [https://github.com/KeyanIsCool/sg-health-wait](https://github.com/KeyanIsCool/sg-health-wait)

---

## 4. Private hospitals (template — one send per hospital)

Private hospitals handle this through their own corporate communications or marketing teams rather than a group-level comms office. Addresses to try:

- **Mount Elizabeth / Gleneagles / Parkway East (IHH / Parkway Pantai):** `corpcomms@parkwaypantai.com`
- **Raffles Hospital (Raffles Medical Group):** `corporatecommunications@rafflesmedical.com`
- **Thomson Medical Centre:** `enquiry@thomsonmedical.com`
- **Farrer Park Hospital:** `enquiries@farrerpark.com`

**Subject:** Permission request — displaying [Hospital name] A&E wait times on a public-benefit website

> Dear [Hospital] Corporate Communications team,
>
> My name is Keyan and I run **SG Health Wait** ([https://sg-health-wait.vercel.app](https://sg-health-wait.vercel.app)) — a small public-benefit website that helps Singapore residents quickly compare estimated A&E wait times across local hospitals when deciding where to seek care. I am writing to request permission to display [Hospital name]'s live A&E wait time, with attribution and a link back to your own page as the authoritative source.
>
> **What I would like to do**
>
> - Read the wait-time figure from your public A&E page once every **15 minutes**, with an identified user agent.
> - Display it on my site **tagged as "Official — source: [Hospital name]"**, linked back to your page.
> - Show a timestamp, and automatically mark the figure as stale if your page cannot be reached.
> - Reproduce only the wait-time number — not any branding, imagery, or other content.
>
> **Intent and funding**
>
> This is a personal, public-benefit project, not a commercial service. The site may carry modest Google AdSense ads solely to cover domain, hosting, and database costs — there is no paid tier, no sponsored placement, and no clinical recommendation. Every page prominently directs users to call 995 in an emergency.
>
> **Safeguards**
>
> I will respect `robots.txt` and any technical rate limit you specify, stop immediately on written request, never bypass any technical measure, and provide a take-down contact (`hello@sg-health-wait.vercel.app`) with a one-working-day response commitment.
>
> If this is acceptable, a short written confirmation is sufficient. I am also happy to adapt to whatever arrangement — polling cadence, attribution line, formal licence — works for your team.
>
> Thank you for considering this request.
>
> Warm regards,
> **Keyan [Last name]**
> [Your email]
> [Your phone, optional]
> [https://sg-health-wait.vercel.app](https://sg-health-wait.vercel.app)

---

## Sending notes

1. **Send one email per cluster**, not per hospital, for public hospitals. Cluster comms teams route internally.
2. **Use your real name and a real reply address** — a generic Gmail is fine, but it should match what the hospital team can reach you at. Avoid sending from `hello@sg-health-wait.vercel.app` for the first mail — use a personal address so there's a real human on the other end.
3. **Reply window:** budget 2–4 weeks before following up once. Comms teams prioritise press and partnerships over cold requests, but this one is unusually easy to approve because it costs them nothing and attributes them.
4. **If they say no**, ask whether they would consider a *delayed* feed (hourly instead of 15-minute) or a *press* arrangement. Those often clear internal review when live scraping does not.
5. **Any "yes"** goes into `/data-sources` and into a short `/credits` page. Transparency is the one competitive advantage this site has.
6. **Keep the full reply chain archived** — if a later maintainer takes over the project, they need the proof that permission was granted.

## When a permission comes in

Each hospital that approves gets a working adapter in `lib/data-sources/official/<slug>.ts` that returns `NormalizedWaitRecord[]` with `sourceType: 'OFFICIAL'` and `sourceName: '<Hospital name>'`. A cron (Vercel Cron, every 15 min) calls the adapter and writes to `WaitTime`. The UI picks up `OFFICIAL` records automatically and the `/data-sources` counter ticks up. I will scaffold these adapters as soon as you want — each one is ~30 lines.
