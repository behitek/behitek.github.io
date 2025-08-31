---
title: Python Code Convention
tags: [python, coding-convention]
description: My personal Python code convention
image: /img/docs/python.jpeg
---

## 1. Target Audience

Developers building Python services, tools, or pipelines.

---

## 2. Coding Style

Follow [PEP 8](https://peps.python.org/pep-0008/) style. Key rules:

### Indentation and Line Length

* 4 spaces (no tabs)
* Max 79 characters per line

### Imports

* Group in order: standard lib → third-party → internal
* One import per line

### Whitespace

* Space around operators and after commas
* No space inside brackets

### Naming Conventions

* Variables/functions: `snake_case`
* Classes: `PascalCase`
* Constants: `ALL_CAPS`
* Protected/private: `_name`, `__name`

### Comments & Docstrings

* Use docstrings for all public code
* Use complete sentences
* Add `# TODO:` or `# NOTE:` where needed

---

## 3. Project Structure & Environment

Use modern Python project tools for clarity and maintainability:

| Tool     | Use Case                        |
| -------- | ------------------------------- |
| `poetry` | Dependency & virtualenv manager |
| `uv`     | Fast `pip` & `venv` alternative |
| `conda`  | (Optional) Data/ML workflows    |

### Recommended Layout

```bash
your_project/
├── pyproject.toml
├── src/
│   └── your_module/
└── tests/
```

> Using `src/` layout helps prevent import issues and improves test isolation.

---

## 4. Path Handling

Always avoid `abspath`. Use `pathlib` with relative paths.

### ❌ Not recommended:

```python
import os
path = os.path.abspath(os.path.join(os.path.dirname(__file__), "file.txt"))
```

### ✅ Recommended:

```python
from pathlib import Path

path = Path(__file__).parent / "file.txt"
```

---

## 5. Linting & Formatting

Use [`ruff`](https://docs.astral.sh/ruff/) with [`pre-commit`](https://pre-commit.com/).

### Setup Steps

1. Install:

   ```bash
   pip install pre-commit
   ```

2. Create `.pre-commit-config.yaml`:

   ```yaml
   repos:
     - repo: https://github.com/pre-commit/pre-commit-hooks
       rev: v5.0.0
       hooks:
         - id: trailing-whitespace
         - id: check-yaml
     - repo: https://github.com/astral-sh/ruff-pre-commit
       rev: v0.11.8
       hooks:
         - id: ruff
   ```

3. Install hooks:

   ```bash
   pre-commit install
   ```

### Ruff Config (`pyproject.toml`)

```toml
[tool.ruff]
select = ["E", "F"]
ignore = ["E501"]  # Ignore line length for now
```

### Usage

```bash
ruff check src/
ruff check src/ --fix
```

---

## 6. Editor Integration

### Visual Studio Code

* Enable **Format on Save**
* Install the **Ruff** extension

---

## 7. Python Version

All code should support **Python 3.11+**. Set it explicitly in `pyproject.toml`:

```toml
[tool.poetry.dependencies]
python = ">=3.11"
```

---

## 8. Testing Conventions

* Use `pytest`
* Place tests in the `tests/` directory
* Name tests `test_*.py`
* Test function names should describe expected behavior

Example:

```python
def test_parse_valid_config():
    ...
```

---

## 9. Logging and Config Management

Use the team's **standardized logging and config templates**:

* Import from our shared utility module
* Follow the documented interfaces in the shared repo

> 🧩 *\[PLACEHOLDER: Insert internal repo link or code snippet here]*
> Example usage:
>
> ```python
> from our_utils.logging import get_logger
> from our_utils.config import load_config
> ```

---

## 10. Git Ignore Rules

Common `.gitignore` entries:

```gitignore
.venv/
__pycache__/
*.py[cod]
.ruff_cache/
.mypy_cache/
```

---

## 11. References

* [PEP 8 – Style Guide for Python Code](https://peps.python.org/pep-0008/)
* [Ruff Docs](https://docs.astral.sh/ruff/)
* [Pre-commit Docs](https://pre-commit.com/)
* [Hypermodern Python Guide](https://cjolowicz.github.io/posts/hypermodern-python-01-setup/)
* [Pytest Docs](https://docs.pytest.org/en/stable/)
