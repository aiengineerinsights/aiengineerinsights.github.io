# The AI Engineer's Brief — issue for Wednesday 25 November 2026

**Send:** Wednesday 25 Nov, 7:00 PM IST (8:30 AM US Eastern). One day early because Thursday is US Thanksgiving.
**Covers:** posts published 18 to 25 November.
**Status:** draft. Add any post published on 23 to 25 Nov before sending (see "Before you send" at the end).

## Subject line (pick one)
1. Claude Code: when to use /goal, /loop or a Ralph loop
2. The Claude Code cheat sheet, plus a 45-minute plan for agent design interviews
3. Stop adding lines to CLAUDE.md. Fix it in the code first.

**Preview text:** Four new guides this week, and two downloads that are yours because you subscribed.

---

## Email body

Hi,

Four new guides went up this week, three of them on Claude Code. Here is what each one is for, so you can open only the one you need.

### Build: keep Claude Code working until the job is done

Claude Code now has several ways to keep a session going after a turn ends, and they are easy to confuse. The short version:

- **/goal** takes a condition. After each turn a small model checks whether the condition is met. That checker reads only the conversation and does not run commands, so write a condition Claude can prove in its own output, such as "the test suite passes and the output is shown".
- **/loop** repeats a prompt on an interval.
- **The Ralph loop plugin** and a **Stop hook** are the other two options, and the guide covers when each fits and how to cap the cost.

Read: [Claude Code /goal vs /loop vs Ralph Loop](https://aiengineerinsights.com/blog/claude-code-goal-loop/?utm_source=newsletter&utm_medium=email&utm_campaign=brief-2026-11-25)

### Read: two Claude Code references

**[Claude Code Cheat Sheet](https://aiengineerinsights.com/blog/claude-code-cheat-sheet/?utm_source=newsletter&utm_medium=email&utm_campaign=brief-2026-11-25).** The slash commands grouped by task, the keyboard shortcuts, and the CLI flags, checked against Anthropic's docs on 18 November. The last table lists commands that have been removed or renamed, because many cheat sheets online still show them.

**[Claude Code Best Practices](https://aiengineerinsights.com/blog/claude-code-best-practices/?utm_source=newsletter&utm_medium=email&utm_campaign=brief-2026-11-25).** What belongs in CLAUDE.md, what belongs in hooks and permission rules, and how to roll one setup out to a team.

**Your downloads.** Both are free for subscribers, so here are the direct links:

- [Claude Code cheat sheet, one-page PDF](https://aiengineerinsights.com/downloads/claude-code-cheat-sheet.pdf)
- [Claude Code starter kit, zip](https://aiengineerinsights.com/downloads/claude-code-starter-kit.zip)

### Career: a 45-minute plan for the agent design interview

"Design an AI agent that handles refund requests" is the kind of prompt now showing up in system design rounds. The new guide works through that example, and it ends with a time split for a 45-minute round:

- 0 to 5 minutes: clarify who uses it, what it may change, and the worst outcome.
- 5 to 10 minutes: state latency, cost and accuracy targets.
- 10 to 25 minutes: draw the request path and list the tools.
- 25 to 35 minutes: walk through three failure modes.
- 35 to 45 minutes: evals and rollout.

One habit that marks a strong answer: split read tools from write tools before anyone asks.

Read: [Agentic AI System Design](https://aiengineerinsights.com/blog/agentic-ai-system-design/?utm_source=newsletter&utm_medium=email&utm_campaign=brief-2026-11-25)

If you have an interview coming up and want to practise one of these out loud, you can [book a 1:1 session with me](https://topmate.io/poorna_prudhvi_gurram?utm_source=newsletter&utm_medium=email&utm_campaign=brief-2026-11-25).

### The Take: fix it in the code before you fix it in the prompt

When Claude repeats a mistake, the usual reaction is to add another line to CLAUDE.md. That is the weakest fix available, because the model reads the instruction and only usually follows it.

A better order: first change the code so the mistake cannot happen, or add a lint or type rule whose error message states the fix. Use a hook next. Add a CLAUDE.md line last. Then clean up the old occurrences, because Claude copies the patterns it finds in the repo.

The best practices guide above has the full argument.

That is all for this week. Reply to this email if there is a topic you want covered; I read every reply.

Poorna Prudhvi
[aiengineerinsights.com](https://aiengineerinsights.com/?utm_source=newsletter&utm_medium=email&utm_campaign=brief-2026-11-25)

---

## Before you send
- [ ] Add any post published 23 to 25 Nov. Expected from the queue: the CLAUDE.md template page (23 Nov) and the AI engineer resume template page (25 Nov). Check they are live first.
- [ ] Click every link once in the beehiiv preview.
- [ ] Confirm the booking link opens the right Topmate page.
- [ ] Schedule for Wednesday 25 Nov, 7:00 PM IST.
- [ ] From the next issue on: Thursdays, 7:00 PM IST.

## Notes on this draft
- Every claim comes from the posts themselves as published on 22 Nov. Nothing was added from outside sources.
- The cheat sheet PDF and starter kit links are direct on purpose: readers of this email have already subscribed.
- No external "Read" pick this week; both are our own posts.
