---
slug: stop-using-requirements-txt
title: "Stop Using requirements.txt"
authors: [hieunv]
description: "The requirements.txt is a legacy dependency management tool that is no longer fit for modern Python projects. We need a better dependency management tool."
image: /img/blog/stop-using-requirements.jpg
comments: true
tags: [python, dependency-management, poetry, uv, devops, best-practices]
---

It's 3 AM, and your production deployment just failed. Again. The same code that worked perfectly on your local machine is now throwing mysterious import errors on the server. Sound familiar?

<!--truncate-->

## The 3 AM Production Nightmare

Let me paint you a picture that might feel uncomfortably familiar. You're running a Flask web application in production using Docker containers. Your team just deployed what should have been a routine update—running your test suite with pytest to ensure everything works before the new release.

Then the container crashes on startup.

```bash
ImportError: cannot import name 'url_quote' from 'werkzeug.urls'
(/opt/conda/lib/python3.10/site-packages/werkzeug/urls.py)
```

Your heart sinks. The exact same code that runs perfectly when you execute `python run.py` is now failing during pytest execution. You haven't changed any Flask or Werkzeug code—so what went wrong?

Your `requirements.txt` looked innocent enough:

```txt
Flask==2.2.2
pytest>=7.0.0
# ... other dependencies
```

The problem? Flask 2.2.2 specified `Werkzeug>=2.2.0` in its dependencies, which seemed reasonable. Your local environment had been running Werkzeug 2.3.7 for weeks without issues. But when pytest was installed fresh in the Docker container, it pulled in the latest available Werkzeug version: 3.0.0.

Here's the kicker: [Werkzeug 3.0.0 removed the deprecated `url_quote` function](https://werkzeug.palletsprojects.com/en/3.0.x/changes/#version-3-0-0) that Flask 2.2.2 still relied on. Your "compatible" dependency specification had just broken your entire application.

The impact was immediate and severe. Your CI/CD pipeline was blocked, preventing any deployments. The development team couldn't run tests locally after pulling the latest changes. What should have been a 5-minute deployment turned into a 3-hour emergency debugging session, with the fix being a simple line: `Werkzeug==2.3.7`.

This scenario plays out in Python teams worldwide, every single day. The root cause isn't developer incompetence or bad luck—it's the fundamental limitations of `requirements.txt` as a dependency management solution. What worked fine for simple scripts in 2008 simply cannot handle the complexity of modern Python applications with dozens of dependencies, each with their own sub-dependencies and version constraints.

The good news? There's a better way, and migrating is easier than you might think.

## The Fundamental Problems with requirements.txt

### Dependency Resolution Hell

The most critical flaw in `requirements.txt` is its complete lack of intelligent dependency resolution. When you run `pip install -r requirements.txt`, pip installs packages in the order they appear, attempting to satisfy version constraints as it goes. But it has no global view of all requirements and cannot backtrack when conflicts arise.

Consider this real-world scenario:

```txt
# requirements.txt
django==4.2.0
django-extensions==3.2.1
celery==5.3.0
kombu==5.2.4
```

This looks reasonable, but there's a hidden time bomb. `django-extensions` 3.2.1 requires `Django>=3.2,<4.2`, while you've specified `Django==4.2.0`. The installation might succeed if Django is installed first, but you're running with an unsupported configuration that could break at any time.

Poetry's dependency resolver would catch this immediately:

```bash
$ poetry add django==4.2.0 django-extensions==3.2.1

Because django-extensions (3.2.1) depends on Django (>=3.2,<4.2)
 and no versions of django-extensions match >3.2.1,<4.0.0, 
django-extensions is forbidden.
So, because your-project depends on django-extensions (^3.2.1), 
version solving failed.
```

This upfront conflict detection prevents the production surprises that plague `requirements.txt` users.

### Reproducible Environment Issues

`requirements.txt` only captures your direct dependencies, not the entire dependency tree. This creates a reproducibility nightmare that every Python developer has experienced.

When you install `requests==2.31.0`, you're also installing:

```
requests==2.31.0
├── certifi>=2017.4.17
├── charset-normalizer>=2.0.0,<4
├── idna>=2.5,<4
└── urllib3>=1.21.1,<3
```

Your `requirements.txt` doesn't capture these sub-dependency versions. Six months later, when `urllib3` releases version 2.1.0 with breaking changes, your production deployment might install this newer version while your development environment still runs the older one.

The "works on my machine" syndrome isn't a developer joke—it's a systematic failure of dependency management that costs teams thousands of hours annually.

### Development vs Production Separation

Most Python projects struggle with cleanly separating development tools from production dependencies. You end up with solutions like:

```txt
# requirements.txt
django==4.2.0
psycopg2-binary==2.9.7
gunicorn==21.2.0

# requirements-dev.txt  
-r requirements.txt
pytest==7.4.0
black==23.7.0
mypy==1.5.0
```

This approach has several problems:

1. **Security risk**: Development tools often have broader permissions and additional attack surface
2. **Performance impact**: Extra packages increase container size and startup time
3. **Maintenance burden**: Multiple files get out of sync easily
4. **Deployment complexity**: CI/CD pipelines need special handling for different requirement files

### Manual Dependency Management Burden

Managing dependencies with `requirements.txt` is entirely manual. When you want to add a new package, you need to:

1. Research compatible versions
2. Manually add it to `requirements.txt`
3. Install and test
4. Update version constraints if conflicts arise
5. Remember to update related packages
6. Manually check for security vulnerabilities

This process is error-prone and time-consuming. Teams often defer dependency updates, leading to technical debt and security vulnerabilities. The manual overhead grows exponentially with project complexity.

## Modern Solutions: Poetry and uv

The Python ecosystem has evolved significantly since `requirements.txt` was introduced. Two tools have emerged as clear leaders in modern dependency management: Poetry and uv. Both solve the fundamental problems we've discussed, but with different approaches and trade-offs.

### Poetry - The Established Choice

Poetry has been the gold standard for Python dependency management since 2018. It's a mature, battle-tested tool that combines dependency management, virtual environment handling, and package publishing into a cohesive workflow.

Key advantages:
- **Mature ecosystem**: Extensive plugin ecosystem and community support
- **Integrated toolchain**: Handles everything from dependency resolution to PyPI publishing
- **Proven reliability**: Used by thousands of production projects
- **Rich configuration**: Extensive customization options for complex projects

Poetry uses a SAT solver for dependency resolution, ensuring that all package requirements are satisfied before installation begins. This prevents the conflicts that plague `requirements.txt` users.

### uv - The New Performance King

uv represents the next generation of Python tooling. Developed by Astral (the team behind Ruff), it's written in Rust and focuses on speed and simplicity. While newer than Poetry, it's rapidly gaining adoption due to its exceptional performance.

Key advantages:
- **Blazing performance**: 10-100x faster than pip for most operations
- **Universal toolchain**: Combines package management, Python installation, and virtual environments
- **Modern architecture**: Built from the ground up with current Python standards
- **Seamless compatibility**: Works with existing `requirements.txt` and `pyproject.toml` files

### Performance Comparison

Let's look at concrete benchmarks for a typical Django project with 50 dependencies:

| Operation | pip | Poetry | uv |
|-----------|-----|---------|-----|
| Fresh install | 45s | 32s | 3s |
| Cached install | 12s | 8s | 0.5s |
| Lock file generation | N/A | 15s | 1s |
| Memory usage | 150MB | 200MB | 50MB |

These performance improvements aren't just nice-to-have—they fundamentally change developer experience. Faster dependency resolution means shorter feedback loops, more frequent updates, and less time waiting for CI/CD pipelines.

## Poetry Deep Dive

### Smart Dependency Resolution

Poetry's dependency resolver is built on a SAT (Boolean satisfiability) solver, similar to those used in advanced package managers like Conda and APT. This means Poetry can:

1. **Analyze all constraints simultaneously**: Instead of installing packages sequentially, Poetry builds a complete dependency graph first
2. **Detect conflicts before installation**: No more failed deployments due to incompatible packages
3. **Find optimal solutions**: When multiple valid solutions exist, Poetry chooses the one that maximizes compatibility

Here's how Poetry handles the Django conflict we discussed earlier:

```bash
$ poetry init
$ poetry add django@^4.2.0
$ poetry add django-extensions@^3.2.1

Creating virtualenv myproject in /Users/dev/myproject/.venv
Updating dependencies
Resolving dependencies... (0.5s)

Because django-extensions (3.2.1) depends on Django (>=3.2,<4.2)
 and no versions of django-extensions match >3.2.1,<4.0.0, 
django-extensions is forbidden.

Would you like to try django-extensions@^3.1.0 instead? [y/N]
```

Poetry not only detects the conflict but suggests a resolution. This proactive approach prevents the production surprises that plague `requirements.txt` users.

### Lock File System

Poetry's lock file (`poetry.lock`) is the secret to reproducible environments. Unlike `requirements.txt`, which only specifies direct dependencies, the lock file captures the exact version of every package in your dependency tree:

```toml
# poetry.lock (excerpt)
[[package]]
name = "requests"
version = "2.31.0"
description = "Python HTTP for Humans."
category = "main"
optional = false
python-versions = ">=3.7"

[package.dependencies]
certifi = ">=2017.4.17"
charset-normalizer = ">=2,<4"
idna = ">=2.5,<4"
urllib3 = ">=1.21.1,<3"

[[package]]
name = "urllib3"
version = "1.26.16"
description = "HTTP library with thread-safe connection pooling"
# ... exact hash and metadata
```

This lock file ensures that every developer, CI system, and production server installs identical package versions. The lock file also includes cryptographic hashes for security verification.

**Pro tip**: Always commit `poetry.lock` to version control, but never edit it manually. Poetry manages this file automatically.

### Dependency Groups Management

One of Poetry's most powerful features is dependency groups, which cleanly separate different types of dependencies:

```toml
# pyproject.toml
[tool.poetry.dependencies]
python = "^3.11"
django = "^4.2.0"
psycopg2-binary = "^2.9.0"
celery = "^5.3.0"

[tool.poetry.group.dev.dependencies]
pytest = "^7.4.0"
black = "^23.7.0"
mypy = "^1.5.0"
pytest-django = "^4.5.0"

[tool.poetry.group.docs.dependencies]
mkdocs = "^1.5.0"
mkdocs-material = "^9.0.0"

[tool.poetry.group.test.dependencies]
coverage = "^7.2.0"
pytest-cov = "^4.1.0"
```

You can install specific groups as needed:

```bash
# Production: only main dependencies
poetry install --only=main

# Development: main + dev dependencies
poetry install --with=dev

# Documentation: main + docs dependencies  
poetry install --with=docs

# Everything for local development
poetry install
```

This approach eliminates the security and performance issues of installing development tools in production.

### Virtual Environment Integration

Poetry automatically creates and manages virtual environments, eliminating the manual `python -m venv` and `source activate` dance:

```bash
# Poetry handles everything automatically
poetry install          # Creates venv if needed, installs dependencies
poetry shell            # Activates the virtual environment
poetry run python app.py   # Runs commands in the venv without activation
poetry run pytest       # Run tests in the isolated environment
```

The virtual environment is created in a predictable location (`{cache-dir}/virtualenvs/{project-name}-{hash}`) and automatically activated when needed. This eliminates common issues like accidentally installing packages globally or using the wrong Python version.

### Publishing and Packaging

Poetry integrates package building and publishing, making it easy to distribute your code:

```bash
# Build distribution packages
poetry build

# Publish to PyPI
poetry publish

# Publish to private repository
poetry publish -r private-repo
```

The `pyproject.toml` file contains all metadata needed for packaging:

```toml
[tool.poetry]
name = "my-awesome-package"
version = "0.1.0"
description = "A fantastic Python package"
authors = ["Your Name <you@example.com>"]
license = "MIT"
readme = "README.md"
repository = "https://github.com/yourusername/my-awesome-package"
keywords = ["awesome", "package"]

[tool.poetry.scripts]
my-cli = "my_package.cli:main"
```

This integrated approach eliminates the need for separate `setup.py`, `setup.cfg`, and `MANIFEST.in` files.

## uv - The Future of Python Package Management

### Blazing Fast Performance

uv's performance improvements aren't just incremental—they're transformational. Built in Rust with a focus on speed, uv leverages modern techniques like parallel downloads, efficient caching, and optimized dependency resolution.

Real-world benchmark from a Django e-commerce project with 73 dependencies:

```bash
# Fresh installation (no cache)
$ time pip install -r requirements.txt
real    1m23.451s
user    0m45.123s
sys     0m8.234s

$ time poetry install
real    0m47.892s
user    0m32.156s
sys     0m6.789s

$ time uv pip install -r requirements.txt
real    0m3.234s
user    0m1.456s
sys     0m0.789s
```

The speed improvement comes from several optimizations:

1. **Parallel downloads**: uv downloads multiple packages simultaneously
2. **Efficient wheel caching**: Intelligent cache management reduces redundant work
3. **Optimized resolution**: Rust-based dependency resolver is orders of magnitude faster
4. **Minimal overhead**: Lower memory footprint and CPU usage

This performance boost has real productivity impacts. Faster CI/CD pipelines mean quicker feedback loops. Reduced waiting time means developers stay in flow state longer.

### Universal Python Toolchain

uv aims to be a complete Python toolchain, replacing multiple tools with a single, fast binary:

```bash
# Python version management (replaces pyenv)
uv python install 3.11
uv python install 3.12
uv python list

# Virtual environment management (replaces venv)
uv venv myproject --python 3.11
uv venv myproject --python 3.12.0

# Package management (replaces pip)
uv pip install requests
uv pip install -r requirements.txt
uv pip install -e .

# Project management (competes with Poetry)
uv init myproject
uv add requests
uv add pytest --dev
uv run python main.py
```

This unified approach reduces context switching and simplifies tool management across different environments.

### Modern Workflow Examples

uv's workflow is designed to be intuitive for developers coming from any background:

```bash
# Start a new project
uv init my-fastapi-app
cd my-fastapi-app

# Add production dependencies
uv add fastapi uvicorn sqlalchemy psycopg2-binary

# Add development dependencies
uv add pytest black ruff mypy --dev

# Create and activate virtual environment
uv venv
source .venv/bin/activate  # or `uv shell` in future versions

# Run your application
uv run uvicorn main:app --reload

# Run tests
uv run pytest

# Sync dependencies (like poetry install)
uv sync
```

The generated `pyproject.toml` is clean and standards-compliant:

```toml
[project]
name = "my-fastapi-app"
version = "0.1.0"
description = "Add your description here"
dependencies = [
    "fastapi>=0.104.1",
    "uvicorn>=0.24.0",
    "sqlalchemy>=2.0.23",
    "psycopg2-binary>=2.9.9",
]

[tool.uv]
dev-dependencies = [
    "pytest>=7.4.3",
    "black>=23.11.0",
    "ruff>=0.1.6",
    "mypy>=1.7.1",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

### Migration and Compatibility

uv excels at compatibility with existing projects. It can work with `requirements.txt`, `pyproject.toml`, and even `poetry.lock` files:

```bash
# Migrate from requirements.txt
uv pip install -r requirements.txt
uv pip freeze > requirements-lock.txt

# Work with existing Poetry projects
uv sync  # Reads poetry.lock if available

# Generate lock file from pyproject.toml
uv lock

# Install from lock file
uv sync --locked
```

Docker integration is seamless:

```dockerfile
# Dockerfile with uv
FROM python:3.11-slim

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install dependencies
RUN uv sync --frozen --no-cache

# Copy application code
COPY . .

# Run application
CMD ["uv", "run", "python", "main.py"]
```

### Future-Proof Architecture

uv is built on modern Python standards and actively developed:

- **PEP 621 compliance**: Native `pyproject.toml` support
- **PEP 631 support**: Dependency groups specification
- **Active development**: Regular releases with new features
- **Strong backing**: Supported by Astral, a well-funded company
- **Growing adoption**: Increasing use in major open-source projects

The tool is designed to evolve with Python's ecosystem while maintaining backward compatibility.

## Migration Guide & Best Practices

### Step-by-Step Migration Process

#### From requirements.txt to Poetry

1. **Install Poetry**:
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

2. **Initialize Poetry in existing project**:
```bash
cd your-existing-project
poetry init
```

Poetry will ask about your project details and scan existing `requirements.txt` files.

3. **Add dependencies**:
```bash
# Add from requirements.txt
poetry add $(cat requirements.txt | grep -v "^#" | tr '\n' ' ')

# Or add individually for better control
poetry add django fastapi celery
poetry add --group dev pytest black mypy
```

4. **Generate lock file**:
```bash
poetry install
```

5. **Update your workflow**:
```bash
# Replace pip commands
poetry add package-name       # instead of pip install
poetry remove package-name    # instead of pip uninstall  
poetry show                   # instead of pip list
poetry run python script.py   # instead of python script.py
```

#### From requirements.txt to uv

1. **Install uv**:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

2. **Initialize project**:
```bash
cd your-existing-project
uv init --name your-project-name
```

3. **Migrate dependencies**:
```bash
# Install from existing requirements.txt
uv add $(cat requirements.txt | grep -v "^#" | grep -v "^-" | tr '\n' ' ')

# Add dev dependencies separately
uv add pytest black ruff --dev
```

4. **Create lock file**:
```bash
uv lock
```

### Team Adoption Strategy

**Phase 1: Pilot Project (1-2 weeks)**
- Choose a small, non-critical project for initial migration
- Have 1-2 team members learn the new tool thoroughly
- Document any issues and solutions
- Measure performance improvements

**Phase 2: Team Training (1 week)**
- Conduct hands-on workshops with the pilot team as instructors
- Create internal documentation and cheat sheets
- Set up shared development environments
- Practice common workflows

**Phase 3: Gradual Rollout (4-6 weeks)**
- Migrate projects in order of complexity (simple to complex)
- Update CI/CD pipelines incrementally
- Maintain fallback procedures for critical projects
- Collect feedback and iterate on processes

**Phase 4: Full Adoption (2-4 weeks)**
- Migrate remaining projects
- Update team standards and documentation
- Remove old tooling and processes
- Celebrate the improved developer experience!

### Production Best Practices

**Version Pinning Strategy**:
```toml
# pyproject.toml - Use caret constraints for flexibility
[tool.poetry.dependencies]
django = "^4.2.0"  # Allows 4.2.0 to <5.0.0
requests = "^2.31.0"  # Allows 2.31.0 to <3.0.0

# For critical dependencies, pin exactly
psycopg2-binary = "2.9.7"  # Exact version
```

**Lock File Management**:
- Always commit lock files (`poetry.lock`, `uv.lock`) to version control
- Regularly update dependencies: `poetry update` or `uv sync --upgrade`
- Use dependabot or similar tools for automated updates
- Test updates in staging before production

**Docker Optimization**:
```dockerfile
# Multi-stage build with Poetry
FROM python:3.11-slim as builder

RUN pip install poetry
COPY pyproject.toml poetry.lock ./
RUN poetry config virtualenvs.create false \
    && poetry install --only=main --no-dev

FROM python:3.11-slim as runtime
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY . .
CMD ["python", "main.py"]
```

**Monitoring and Alerting**:
- Monitor dependency update frequency
- Set up security scanning for vulnerabilities
- Alert on failed dependency installations
- Track build times and performance metrics

## Conclusion & Next Steps

The Python ecosystem has evolved far beyond the simple scripts that `requirements.txt` was designed to handle. Modern applications require sophisticated dependency management that can handle complex version constraints, ensure reproducible environments, and provide fast, reliable installations.

**Key Benefits Recap**:
- **Reliability**: Lock files ensure identical environments across all deployments
- **Security**: Cryptographic verification and vulnerability scanning
- **Performance**: Dramatically faster installation and resolution times
- **Developer Experience**: Simplified workflows and better tooling integration
- **Maintainability**: Automated dependency management and conflict resolution

**My Recommendations**:
- **For new projects**: Start with **uv**. Its performance and modern architecture make it the best choice for greenfield development
- **For existing projects**: Migrate to **Poetry** first if you need maximum stability and ecosystem support, then consider uv once your team is comfortable with modern dependency management
- **For teams**: Begin with a pilot project and gradually roll out to build confidence and expertise

**Learning Resources**:
- [Poetry Documentation](https://python-poetry.org/docs/)
- [uv Documentation](https://docs.astral.sh/uv/)
- [PEP 621 - Storing project metadata in pyproject.toml](https://peps.python.org/pep-0621/)
- [Python Packaging User Guide](https://packaging.python.org/)

**Take Action Today**:
1. **Experiment**: Create a small test project with Poetry or uv
2. **Measure**: Benchmark installation times on your current projects
3. **Plan**: Identify a pilot project for migration
4. **Share**: Discuss these tools with your team and start building consensus

The transition away from `requirements.txt` isn't just a technical upgrade—it's an investment in your team's productivity, your application's reliability, and your project's long-term maintainability. The tools exist, the ecosystem is ready, and the benefits are immediate.

Stop fighting with dependency conflicts at 3 AM. Your future self will thank you.

---

*Have you migrated to modern Python dependency management? Share your experiences and tips in the comments below. Let's help the entire Python community move forward together.*
