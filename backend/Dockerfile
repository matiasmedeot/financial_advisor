FROM python:3.12-slim-bookworm AS base

FROM base AS builder

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy

WORKDIR /app

# Install dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project --no-editable

COPY . /app

RUN --mount=type=cache,target=/root/.cache/uv \
  uv sync --frozen --no-dev --all-groups

ENV PATH="/app/.venv/bin:$PATH"

# Run tests
ENV TEST_ENV=1
RUN pytest tests/ -v

FROM base

WORKDIR /app

ENV PATH="/app/.venv/bin:$PATH"

# Copy the environment, but not the source code
COPY --from=builder --chown=app:app /app /app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
