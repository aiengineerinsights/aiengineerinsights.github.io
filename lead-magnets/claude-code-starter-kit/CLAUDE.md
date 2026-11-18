# Commands
- Install: uv sync
- Run one test file: uv run pytest tests/test_retrieval.py -q
- Lint and types: uv run ruff check . && uv run pyright

# Conventions
- Call models through app/llm/client.py, never import a vendor SDK directly
- Prompts live in app/prompts/*.md, not inline in Python
- app/legacy/ is still in production: fix bugs there, do not copy its patterns

# Gotchas
- Eval tests need EVAL_DATASET_PATH set, see .env.example
- Changing a prompt means re-running: uv run python -m evals.run --suite smoke
