# The AI Engineer's Brief: weekly template

Purpose: every issue has the same shape, so a reader knows what they get, can skim it in five minutes, and has a reason to forward it. Match the public promise on /newsletter: Build, Read, Career, The Take.

Send slot: Thursday 7:00 PM IST (8:30 AM US Eastern). Body length: 450 to 650 words, counting prose and code.

## Global rules
- Every factual claim comes from a post on the site or a source linked in that post. If a number is someone else's, name them and say it is their figure.
- No invented statistics, quotes, testimonials, subscriber counts, rewards or giveaways. Personal lines about Poorna are marked `[POORNA: ...]` until he supplies them.
- Plain, direct writing. Short sentences. No hype words, no opener about the pace of AI, no emoji, few em dashes.
- Do not link the text "CLAUDE.md".
- Every link to the site carries `?utm_source=newsletter&utm_medium=email&utm_campaign=brief-YYYY-MM-DD`. The two /downloads/ links never carry UTM. Booking link is the Topmate page, with UTM.
- Reader value test: could someone get something useful from this email without clicking any link? If not, rewrite.

## Fixed order

### 0. Cold open (60 to 90 words)
- One fact, tension or mistake the reader probably did not know. First sentence stands alone and is specific.
- Then one or two sentences on why it matters.
- Optional `[POORNA: ...]` personal line, only if true.
- Issue 1 only: one line saying the shape is the same every week. After that, drop it.
- Do not open with housekeeping ("this week we published...").

### 1. Build: The Rewrite (signature element, 120 to 170 words)
Rules:
- Format is always: **Before** (one line people really write), **After** (one line, copy-paste ready), **Why it works** (one sentence naming the parts).
- Before and After sit in code blocks. After must work with only a find-and-replace of the reader's own names.
- The Rewrite must come from a published post. Do not invent a "common mistake".
- Optional one-line gotcha with a number or a default (e.g. "defaults to unlimited").
- End with the forward ask (see below), then one link to the full post.
- Reader replies may become future Rewrites. Credit only with permission.

### 2. Read (60 to 100 words)
- ONE pick, ours or external. Say why in one sentence, then an honest verdict in one sentence. If it is our own page, say so.
- Lead with the single most useful detail from it, not a description of the page.
- Downloads (cheat sheet PDF, starter kit) go here while they are live, as plain direct links.

### 3. Career (80 to 120 words)
- One note on getting or growing the job: an interview habit, a role, a data point.
- Must contain one specific thing the reader can rehearse or check.
- The Topmate line sits here: one sentence, only when the note is about interviews or career prep. Skip it on weeks where it does not fit.

### 4. The Take (100 to 140 words)
- An opinion with a stated order, rule or test, not a summary. State the position in the heading.
- Give the reason, say whose it is, and add one honest caveat if a number is used.
- A short code or config snippet is welcome if it is usable as is.
- One link to the full argument.

### 5. Next issue (30 to 50 words)
- Always starts with the next send date.
- One line on what is planned. Use the word "planned" for anything not published. Never promise a date for a page.
- One reply prompt tied to the next Rewrite (e.g. "Hit reply with the mistake your agent keeps repeating"). Keep "I read every reply" only if it is true.
- Sign-off: `Poorna Prudhvi`, then the site link with UTM.

## Recurring signature elements (do not drop these)
1. **The Rewrite.** Before / After / Why. Same name, same format, every issue. It is the part people screenshot and forward.
2. **Cold open fact.** First line is a specific, checkable fact.
3. **The forward ask.** One plain sentence placed directly after The Rewrite, naming a specific kind of engineer ("Know an engineer who lets Claude Code run unattended? Forward them this section."). Change the persona each week. One ask per issue, no rewards.
4. **Next issue line.** Date, planned content, reply prompt. This is what creates the anticipation.
5. **Fixed section labels.** Build, Read, Career, The Take, Next issue. Do not rename them.

## Subject line
Rule of thumb: the subject names the cold-open fact or the Rewrite, in plain words, so a reader who opens it gets exactly what the subject promised in the first paragraph.
- Write 8 to 10 candidates across different angles (surprising fact, consequence, how-to, contrarian take), then pick one. Do not settle on the first.
- Under 55 characters, and put the key words in the first 35, because mobile cuts off after that. Count characters; do not guess.
- Include one thing the reader can recognise (a command, a tool, a phrase they have typed). A subject with no recognisable noun is vague.
- Match the subject to the first line of the email. If the cold open is about /goal, the subject is about /goal, not the Take.
- Keep the claim exactly as strong as the post. If the post says "could", the subject says "could". No "never", "always" or "will" unless the post says so, and note that behaviour may depend on the Claude Code version.
- Avoid: hype words, ALL CAPS, emoji, fake urgency, "this week in AI", "issue N" as the whole subject, and a leading quotation mark unless the quoted phrase is the hook (quotes give no inbox penalty that we have evidence for, but they cost a character pair and nested quotes get messy).
- Preview text must add information the subject lacks (what you get to paste, what else is inside). Never repeat the subject. Front-load the first 90 characters.
- Log the chosen subject in the issue log. After a few issues, compare open rates in beehiiv by angle and update this rule from the data, not from taste.

## Before-send checklist (every issue)
- [ ] Every claim traceable to a post or a linked source; list them in the working notes.
- [ ] No `[POORNA: ...]` placeholder left.
- [ ] Word count 450 to 650.
- [ ] Links clicked in preview; UTM campaign matches the send date; /downloads/ links have no UTM.
- [ ] "CLAUDE.md" not linked.
- [ ] Any page named as "planned" is still unpublished at send time; if live, link it with UTM.
- [ ] Next issue date correct.
- [ ] Scheduled for Thursday 7:00 PM IST.

## Issue log (add one line per issue)
| Issue | Send date | Rewrite topic | Read pick | Forward persona |
|---|---|---|---|---|
| 1 | 2026-11-25 (Wed) | "all tests pass" /goal condition | Claude Code cheat sheet (removed commands table) | engineers running Claude Code unattended |

## Design (applied in beehiiv 2026-11-22)
Saved in beehiiv as the post template "Weekly Brief (banner + Rewrite card + footer)". Start each new issue from it, then replace the body.
- Header banner: `assets/brief-header-banner.png` (2400x600, also in the beehiiv media library), first block in the body.
- Canvas `#EEF1F8`, post `#FFFFFF`, post border 1px `#D5DBEB`, corner radius 10.
- Links: `#2563EB`, underlined, not italic.
- The Rewrite: a section block, background `#F3F5FD`, 4px left border `#3B82F6`, padding 20, radius 10. It wraps the intro line, Before, After and "Why it works".
- Footer: a section block, background `#F3F5FD`, padding 18, with the "written by Poorna Prudhvi" line, the forward ask and the booking link (utm_campaign=brief-footer).
- Profile picture: `assets/avatar-neural-orb.png`.
- After pasting text, remove any auto-link beehiiv adds to the text "CLAUDE.md".
