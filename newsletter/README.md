# Newsletter: The AI Engineer's Brief

Everything needed to write, design and send the weekly email. beehiiv holds the live publication; this folder is the record of how it is set up and what each issue said.

| File | What it is |
|---|---|
| `config.yaml` | Schedule, author names, link and UTM rules, design values, list of issues. Start here. |
| `TEMPLATE.md` | Section order, the rule for each section, subject-line rule, before-send checklist, issue log. |
| `issues/YYYY-MM-DD.md` | One file per issue, named by send date: subject, preview text, body, checklist. |
| `assets/` | Header banner and avatar images as uploaded to beehiiv. |
| `assets/src/` | HTML sources for those images and `render.sh` to rebuild them with headless Chrome. |
| `../.claude/skills/newsletter-writer/SKILL.md` | Instructions for the Claude skill that drafts an issue. |

## Weekly routine
1. **Wednesday:** draft the issue with the `newsletter-writer` skill. It reads the posts published since the last issue and writes `issues/YYYY-MM-DD.md`.
2. Check the claim-to-source list it returns, fill or delete any `[POORNA: ...]` line.
3. Put the draft into beehiiv from the saved template, send yourself a test email, click every link.
4. **Thursday, 7:00 PM IST:** schedule the send in beehiiv. Sending is always done by hand.
5. Update `issues:` in `config.yaml` and the issue log in `TEMPLATE.md`.

## Rules that do not bend
- Facts come only from published posts. Nothing invented.
- Site links carry UTM tags; `/downloads/` links do not.
- No secrets, email addresses or postal addresses in this folder. The repository is public.

## Rebuilding the images
```bash
newsletter/assets/src/render.sh
```
Edit `assets/src/banner.html` or `assets/src/avatar.html` first, then upload the new PNG in beehiiv.
