---
paths:
  - "app/api/**/*.py"
---
- Validate request bodies with the pydantic models in app/api/schemas/
- Every new endpoint needs an entry in openapi.yaml; CI fails without it
