# Claude Code starter kit

From AI Engineer Insights: https://aiengineerinsights.com/blog/claude-code-best-practices/

A small, working Claude Code setup for a Python project that uses uv, pytest and ruff.
Copy the files into the root of your repo, then change the commands to match your stack.

| File | What it does | Kind |
| --- | --- | --- |
| `CLAUDE.md` | Test commands, conventions and gotchas Claude cannot read from the code | Advice: Claude decides |
| `.claude/rules/api.md` | Conventions that load only when Claude works under `app/api/` | Advice |
| `.claude/skills/release/SKILL.md` | A release procedure you start by typing `/release` | Advice, started only by you |
| `.claude/settings.json` | Permission rules and three hooks | Enforced by Claude Code |

## What the settings file enforces

- **Deny:** Claude cannot read `.env`, `.env.local` or anything under `secrets/`.
- **Ask:** `git push` always asks first.
- **Allow:** `uv run pytest` and `uv run ruff` run without a prompt.
- **PostToolUse hook:** formats every Python file Claude edits with `ruff format`.
- **PreToolUse hook:** blocks edits to any path containing `/migrations/`.
- **Stop hook:** runs `uv run pytest -q` when Claude tries to finish; a failure sends the output back to Claude.

The hooks need `jq` on your PATH.

## Before you rely on it

1. Replace every command with your own. If you do not use uv, pytest or ruff, these hooks will fail.
2. Delete what you do not need. A slow Stop hook makes every turn slow.
3. Test each hook: ask Claude to edit a file under `migrations/` and confirm it is blocked.
4. Run `/context all` in a session to confirm `CLAUDE.md` loaded, and `/hooks` to see the hooks.
5. Keep personal preferences in `CLAUDE.local.md` and `.claude/settings.local.json`, and add both to `.gitignore`.

Checked against Anthropic's Claude Code docs on November 18, 2026. Claude Code changes weekly;
see https://code.claude.com/docs/en/best-practices for the current reference.
