---
name: release
description: Ship a new version of this package. Updates the version number and changelog, then tags the commit for CI to publish.
disable-model-invocation: true
---
1. Confirm you are on main with a clean working tree. If not, stop and ask.
2. Bump the version in pyproject.toml and commit the change.
3. Add a CHANGELOG.md entry: one line per merged pull request since the last tag, user-facing changes only.
4. Tag v<new version> and push the tag. CI publishes from the tag; never publish from a laptop.
