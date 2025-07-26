# VW Dataflow - Michel Moraes

A modern React + TypeScript application built with a **micro framework architecture**, designed for maintainability, reusability, and scalability.

---

## Project Structure

This project follows a **monorepo-style micro frontend architecture**, separating concerns by domain:

```
project-root/
├── apps/
│   └── web/                → Main frontend application
│       ├── src/            → App-specific logic, pages, and composition
├── libs/
│   ├── ui/                 → Reusable, framework-agnostic UI components
│   ├── hooks/              → Shared logic (custom hooks)
│   ├── utils/              → Utility functions
│   └── services/           → API and data-related logic
├── mocks/                  → JSON Server mock API
└── package.json            → Root workspace manager
```
---

## Tech Stack

- **React 18+** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** for accessible and themeable components (wrapped inside `libs/ui`)
- **SCSS Modules** (optional for future custom styles)
- **JSON Server** for mocking RESTful API endpoints

---

## Architecture Principles

- Micro-framework layout: separate UI, logic, and services into reusable libraries
- Clean dependency boundaries between `apps` and `libs`
- UI components are wrapped and exported from `libs/ui`
- App-specific composition and page layouts live only inside `apps/web`

---

## Commit Convention

This repo follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. 
Example:

```
chore: scaffold project structure with micro framework architecture
```

Types used:
- `feat`: new features
- `fix`: bug fixes
- `chore`: tooling, configs, setup
- `refactor`, `test`, `docs`, etc.
---

## AI Tool Usage Documentation

This project uses AI-assisted tools as part of the development process.

### Tools Involved
- **GitHub Copilot**: Used for autocomplete suggestions and boilerplate generation.
- **ChatGPT**: Used for architecture validation, code scaffolding, and problem-solving discussions.

### Integration with Human Input
All suggestions were reviewed, refactored, or rewritten to match project goals and architectural decisions. More detailed documentation on AI usage — including examples, customizations, and trade-offs — will be added at the end of the project.

> 📝 Full AI usage documentation will be completed before the final delivery.


## License

This project is for evaluation purposes only.
