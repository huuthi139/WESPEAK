# CLAUDE.md — WESPEAK

This file provides guidance for AI assistants (Claude, etc.) working in this repository.

## Project Overview

**WESPEAK** is a project owned by `huuthi139`. The repository is in its initial setup phase. This document should be updated as the project evolves.

## Repository Status

- **State**: Newly initialized
- **Default branch**: To be established (update this once the main branch is set)
- **CI/CD**: Not yet configured

## Directory Structure

```
WESPEAK/
├── CLAUDE.md          # AI assistant guidance (this file)
└── (project files TBD)
```

> Update this section as the project structure takes shape.

## Development Workflow

### Branch Naming

- Feature branches: `feature/<description>`
- Bug fixes: `fix/<description>`
- Claude-generated branches: `claude/<description>-<session-id>`

### Commit Messages

- Use clear, descriptive commit messages
- Start with a verb in imperative mood (e.g., "Add", "Fix", "Update", "Remove")
- Keep the first line under 72 characters

### Pull Requests

- Provide a summary of changes
- Include a test plan when applicable

## Build & Test Commands

> Fill in as the project tooling is established.

```bash
# Install dependencies
# TBD

# Run development server
# TBD

# Run tests
# TBD

# Build for production
# TBD

# Lint / format
# TBD
```

## Code Conventions

> Update this section once languages, frameworks, and style guides are chosen.

- Follow the established style guide for the chosen language(s)
- Keep functions small and focused
- Write descriptive variable and function names
- Add comments only where the intent is non-obvious

## Key Files to Know

| File | Purpose |
|------|---------|
| `CLAUDE.md` | AI assistant guidance |
| `README.md` | Project documentation (TBD) |
| `package.json` / `requirements.txt` / etc. | Dependencies (TBD) |

## AI Assistant Guidelines

1. **Read before writing** — Always read existing files before proposing changes.
2. **Minimal changes** — Only change what is necessary to accomplish the task.
3. **No over-engineering** — Keep solutions simple; don't add features beyond what's requested.
4. **Security first** — Never introduce known vulnerabilities (injection, XSS, etc.).
5. **Update this file** — When significant architectural decisions are made, update CLAUDE.md to reflect the current state.
6. **Test your changes** — Run the project's test suite after making changes (once established).
7. **Respect existing patterns** — Follow conventions already present in the codebase rather than introducing new ones.
