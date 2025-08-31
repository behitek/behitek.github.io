---
title: Git Working Rules
tags: [git]
description: My personal Git cheat sheet
image: https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1024px-Git-logo.svg.png
---

### 👥 Roles

* **Repository Owner**

  * Manage repo access
  * Prevent direct commits to `develop`, `test`, `uat`, `prod`
  * Review merge important branches: `test`, `uat`, `prod`

* **Maintainers (Lead Devs)**

  * Manage `release` & `hotfix` branches
  * Review & merge pull requests (PRs)
  * Help define working process

* **Developers**

  * Create `feature/*`, `bugfix/*`, or `hotfix/*` branches from `develop`
  * Submit PRs to `develop` when done.
  * Include detailed description in PRs.
  * Review and improve PRs.

* **DevOps**

  * Manage deployments and system config
  * Deploy code from `develop`, `test`, `uat`, `prod`

---

### 🔁 Git Flow

> Dev is the default branch. All development starts from here.

1. **`develop`** – Active development (default branch)

   * All new work branches are created from here
   * Only `develop` can merge into `test`

2. **`test`** – Internal QA/testing

   * Only receives merges from `develop`
   * Can merge into `uat`

3. **`uat`** – Pre-release, client/user testing

   * Only receives merges from `test`
   * Can merge into `prod`

4. **`prod`** – Final, stable version

   * Only receives merges from `uat`

---

### 🪴 Branching Rules

* You **must use one of the following prefixes** for branches:

  * `feature/*` – For new features or enhancements
  * `bugfix/*` – For fixing bugs found during development
  * `hotfix/*` – For urgent, production-critical fixes
* All branches must be created from `develop`
* Example: `feature/user-login`, `bugfix/payment-crash`, `hotfix/api-down`

---

### ✍️ Committing

* Write **clear, meaningful** commit messages
* Avoid **unrelated changes** in a single commit

---

### 🔀 Merging

* All changes go through **Merge Requests (MRs)**
* MRs must be **code reviewed**
* **Use rebase on feature branches** to keep history clean
* **Use merge into `develop` and above** to retain full collaboration history
* Merge paths must follow environment flow:

  * `develop` → `test` → `uat` → `prod`
* Auto-merge only if tests pass (future feature)
* Delete merged branches (except protected ones)

---

### 🏷️ Versioning & Clean Code

* Use **tags** for releases
* Use `.gitignore` for non-tracked files (e.g. `.env`)
* Never commit **sensitive info** (keys, tokens)
* Document environment variables in `README`
* No **absolute paths** in code (e.g. `/home/user/...`)

---

### 💡 Best Practices

* **CI/CD**: Auto-test & build on commit
* **Conflict resolution**: Resolve before merge
* **Repo size**: Keep small (limit: 5–20MB)
* **Code conventions**: Follow team style guides
* **Code reviews**: Review before merging
* **Documentation**: Keep everything documented
* **Backup**: Regularly back up repo
* **Hooks**: Use Git hooks to validate code before commit
* **Cleanup**: Remove unused branches regularly

---

### 📘 References

* [Atlassian Git Flow Guide](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
* [Git Cheat Sheet (GitHub)](https://education.github.com/git-cheat-sheet-education.pdf)
* [Learn Git Branching (interactive)](https://learngitbranching.js.org/)
* [Pro Git Book](https://git-scm.com/book/en/v2)
