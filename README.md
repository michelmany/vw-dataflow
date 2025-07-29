# VW Dataflow - Michel Moraes

A modern React + TypeScript application built with a **micro framework architecture**, designed for maintainability, reusability, and scalability.

## Project Structure

This project follows a **monorepo-style micro frontend architecture**, separating concerns by domain:

```
project-root/
├── apps/
│   └── web/               # Main frontend application
│       ├── src/
│       │   ├── pages/     # Route pages (e.g. /users, /users/:id)
│       │   ├── components/# Local layout or feature components
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── index.css
│       ├── index.html
│       ├── package.json
│       └── tsconfig.json
├── libs/
│   ├── ui/                # Reusable UI components (Button, DataTable, etc)
│   ├── hooks/             # Shared hooks and Jotai atoms
│   ├── utils/             # Shared utilities (e.g. cn, tailwind helpers)
│   ├── services/          # API communication (fetch, axios)
│   └── types/             # Shared TypeScript interfaces (e.g. User)
├── mocks/                 # JSON Server mock API setup
│   └── api/
│       ├── db.json
│       └── generate.js
└── package.json            → Root workspace manager
```

## Tech Stack

- **React 18+** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** for accessible and themeable components (wrapped inside `libs/ui`)
- **SCSS Modules** (optional for future custom styles)
- **JSON Server** for mocking RESTful API endpoints
- **Jotai** for global state management

## API Architecture

The project follows a **dual-environment API strategy** that works seamlessly in both development and production:

### Development Environment

- Uses **JSON Server** running on `http://localhost:3001`
- Mock data is defined in `mocks/api/db.json`
- Full CRUD operations with automatic ID generation
- Started automatically with `npm run dev`

### Production Environment (Vercel)

- Uses **Vercel Serverless Functions** in the `/api` directory
- API routes read from the same `mocks/api/db.json` file
- Maintains data consistency between environments
- Automatic deployment with CI/CD pipeline

### Environment Configuration

Environment variables control API URLs:

```bash
# .env.local (development)
VITE_API_URL=http://localhost:3001/api

# Production (automatically set by Vercel)
VITE_API_URL=/api
```

### API Endpoints

All environments support the same REST API:

```typescript
GET    /api/users       # Get all users
GET    /api/users/:id   # Get user by ID
POST   /api/users       # Create new user
PATCH  /api/users/:id   # Update user
DELETE /api/users/:id   # Delete user
```

### Micro Framework API Structure

The API follows the project's micro framework principles:

- **Service Layer** (`libs/services/users.ts`): Environment-aware API client
- **Mock Data** (`mocks/api/db.json`): Shared data source for all environments
- **Serverless Functions** (`api/users.ts`): Production API handlers
- **Local Server** (`mocks/api/server.js`): Development JSON Server

## Architecture Principles

- Micro-framework layout: separate UI, logic, and services into reusable libraries
- Clean dependency boundaries between `apps` and `libs`
- UI components are wrapped and exported from `libs/ui`
- App-specific composition and page layouts live only inside `apps/web`
- Custom hooks and utilities are colocated in `libs/hooks` and `libs/utils`
- Services for API calls and data management are in `libs/services`

## Running the Application

### Local Development

Start the development server with hot reload:

```bash
npm run dev
```

This launches the frontend app on `http://localhost:5173` and runs the mock backend (JSON Server).

### Build & Production

```bash
npm run build     # Creates a production build
npm run preview   # Previews the production build locally
```

### Code Quality

```bash
npm run lint       # Run ESLint checks
npm run lint:fix   # Auto-fix lint issues
```

### Testing

```bash
npm run test:run       # Run the full test suite once
npm run test           # Run tests in watch mode
npm run test:coverage  # Run tests with coverage report
```

### Workspaces

This project uses a monorepo setup with workspaces. To run commands in a specific workspace:

```bash
npm run dev --workspace=apps/web
npm run build --workspace=@libs/ui
```

## Performance Optimizations

This project implements key performance improvements for speed and scalability.

### Key Enhancements

- **Code Splitting & Lazy Loading**

  - Used `React.lazy()` and `Suspense` for route-level code splitting
  - Reduced initial bundle size and improved page load speed
  - Added `LoadingSpinner` for smooth async transitions

- **React Memoization**

  - `React.memo()`, `useMemo()`, and `useCallback()` prevent unnecessary re-renders
  - Optimized heavy components like `UserDataTable` and `UserDrawer`

- **API Call Optimization**

  - Centralized data fetching in `UserListPage`
  - Reduced API calls from 6 → 2 (StrictMode included)
  - Ensured single source of truth with Jotai atoms

- **Component Architecture Refactoring**

  - Moved `UserDrawer` state management to parent
  - Eliminated redundant instances in toolbar and table rows
  - Pure presentational components now receive state via props

- **State Management Optimization**
  - Avoided duplicate Jotai subscriptions
  - Centralized UI state with custom hooks
  - Reduced memory overhead and improved responsiveness

### Impact

- **67% fewer API calls**
- Smaller initial bundle size
- Faster re-renders and navigation
- Cleaner, testable architecture
- Better UX with loading feedback and responsive interactions

## State Management

This project uses **Jotai** for global state management.

Jotai provides an atomic, minimalistic approach to handling global state in React apps. It integrates well with the current Micro Framework Architecture by allowing the state logic to be colocated and composed in a modular way.

- `usersAtom` stores the list of users
- `useUsers()` hook wraps read/write logic and async effects
- All user-related state and operations are kept modular and colocated with domain services
- The root app is wrapped with Jotai's `<Provider>`

This setup ensures clean separation of state logic and component presentation while allowing local overrides or expansions if needed.

## Client-side vs Server-side Filtering & Pagination

For this challenge, I implemented **client-side filtering, sorting, and pagination**, since this matches the requirements and integrates smoothly with the mock API (JSON Server). All user data is fetched once, and sorting, filtering, and pagination are handled in-memory.

In addition, if time permits, I plan to extend **JSON Server** to handle **server-side style filtering, sorting, and pagination** using query parameters (`_page`, `_limit`, `_sort`, `_order`, etc). This simulates how a production backend would handle large datasets efficiently.

- **Client-side approach:**

  - ✅ Fast to implement
  - ✅ Simple state management in the frontend
  - ⚠️ Less scalable for very large datasets (all data lives in memory)

- **Server-side approach:**
  - ✅ More scalable (only requested slice is fetched)
  - ✅ Reduces frontend memory usage
  - ⚠️ Requires backend query handling and slightly more complex integration

This **dual approach** demonstrates awareness of scalability trade-offs and the ability to adapt the solution to different contexts.

## Accessibility

This project follows WCAG 2.1 AA best practices:

- **Semantic HTML**: Proper headings, landmarks (`<main>`, `<nav>`), and form labels.
- **ARIA support**: Dialogs with `role="dialog"`, descriptive labels, and focus management.
- **Keyboard navigation**: Full support with focus trapping and visible indicators.
- **Screen reader friendly**: Accessible names for buttons/inputs, hidden text for icons.
- **Forms**: Required fields, error states, and helper text linked with ARIA.

Tested with keyboard-only navigation, screen readers, and automated tools (axe/Lighthouse).

## Testing

This project uses **Vitest** and **React Testing Library** to ensure reliability and maintainability.

### Test Coverage

- **Unit Tests**

  - Components: `DataTable`, `UserForm`, and other UI primitives
  - Hooks: `useUsers` (mocking API services)
  - Utilities: helper functions like `capitalize`

- **Integration Tests**
  - `UserDataTable`: verify search, filters, sorting, and pagination
  - CRUD Workflow: Add, Edit, and Delete users with proper UI updates
  - Accessibility: focus management, ARIA attributes, and keyboard navigation

### Mocking API

- **Mock Service Worker (MSW)** is used to simulate API responses for CRUD operations.
- Ensures tests run consistently without depending on a live backend.

### Running Tests

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage
```

## CI/CD Pipeline

This project uses **GitHub Actions** for CI/CD with automatic deployment to **Vercel**.

### Continuous Integration

On every push and pull request:

- **Lint Checking** (ESLint with TypeScript & React)
- **Testing** (Vitest + React Testing Library)
- **Build Verification** (ensures production build succeeds)
- **Coverage Reports**

### Continuous Deployment

- **Production**: Auto-deploy to Vercel on push to `main`
- **Preview**: PRs create preview deployments with shareable URLs

### Setup

Add these GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Features

- Automated tests & linting on every commit
- Zero-downtime deployments
- Preview links for PRs
- Caching for faster builds

```bash
npm run lint         # Run lint checks
npm run test         # Run test suite
npm run test:coverage # Run tests with coverage
npm run build        # Build production app
```

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

## AI Tool Usage Documentation

This project uses AI-assisted tools as part of the development process.

### Tools Involved

- **GitHub Copilot**: Used for autocomplete suggestions and boilerplate generation.
- **ChatGPT**: Used for architecture validation, code scaffolding, performance optimization, and problem-solving discussions.
- **AI-Assisted Testing**: AI helped generate and refine **unit and integration tests** based on human-provided input and project requirements.

### Integration with Human Input

All AI-generated suggestions were **reviewed, validated, and customized** to align with the project's goals, coding standards, and micro framework architecture.
Tests were written with **AI assistance guided by human-defined scenarios and expected behaviors**, ensuring accuracy and relevance.

## License

This project is for evaluation purposes only.
