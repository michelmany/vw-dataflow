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

## Architecture Principles

- Micro-framework layout: separate UI, logic, and services into reusable libraries
- Clean dependency boundaries between `apps` and `libs`
- UI components are wrapped and exported from `libs/ui`
- App-specific composition and page layouts live only inside `apps/web`
- Custom hooks and utilities are colocated in `libs/hooks` and `libs/utils`
- Services for API calls and data management are in `libs/services`

## Performance Optimizations

This application has been optimized for performance with several key improvements:

### 1. Code Splitting & Lazy Loading

**Implementation:**

- Route-level code splitting using `React.lazy()` and `Suspense`
- Pages are loaded on-demand rather than bundled together
- Custom `LoadingSpinner` component provides visual feedback during async imports

**Benefits:**

- Reduced initial bundle size by splitting route components
- Faster initial page load times
- Better user experience with loading states during navigation

**Files affected:**

- `apps/web/src/App.tsx` - Implemented lazy loading with Suspense
- `apps/web/src/pages/users/UserListPage.tsx` - Converted to default export
- `apps/web/src/pages/users/UserDetailPage.tsx` - Converted to default export
- `libs/ui/src/components/loading/Loading.tsx` - Created optimized loading components

### 2. React Memoization

**Implementation:**

- `React.memo()` for expensive components (`UserDataTable`, `UserDrawer`)
- `useMemo()` for computed values and expensive calculations
- `useCallback()` for stable function references passed as props

**Benefits:**

- Prevents unnecessary re-renders when props haven't changed
- Improves rendering performance in data-heavy components
- Reduces wasted computation cycles

**Files affected:**

- `apps/web/src/features/users/components/UserDataTable.tsx` - Memoized with prop comparison
- `apps/web/src/features/users/components/UserDrawer.tsx` - Memoized for stable rendering

### 3. API Call Optimization

**Problem Solved:**

- Originally had 6 redundant API calls on page load due to multiple `useUsers()` hooks
- Each component was independently fetching the same user data

**Solution:**

- Centralized data fetching in `UserListPage`
- Removed duplicate `useUsers()` calls from child components
- Pass data and actions as props to maintain single source of truth

**Impact:**

- Reduced API calls from 6 to 2 (accounting for React.StrictMode double execution)
- Eliminated redundant network requests
- Improved data consistency across components

### 4. Component Architecture Refactoring

**Implementation:**

- Moved `UserDrawer` state management to parent `UserDataTable`
- Eliminated redundant `UserDrawer` instances in toolbar and table columns
- Created pure presentational components that receive all state via props

**Benefits:**

- Cleaner component hierarchy with single responsibility
- Reduced component coupling and improved reusability
- Better performance through predictable data flow

### 5. State Management Optimization

**Implementation:**

- Refactored `useUserActions` to accept operations as parameters
- Avoided duplicate atom subscriptions across components
- Centralized UI state management in `useUserManagement` hook

**Benefits:**

- Prevents unnecessary re-subscriptions to Jotai atoms
- Reduces memory overhead from duplicate state listeners
- Improves state update performance

### Performance Impact Summary

These optimizations resulted in:

- **67% reduction** in initial API calls (6 → 2)
- **Smaller initial bundle** through code splitting
- **Faster re-renders** via memoization
- **Cleaner architecture** following micro framework principles
- **Better user experience** with loading states and responsive interactions

The optimizations maintain the project's micro framework architecture while significantly improving performance and maintainability.

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
- **ChatGPT**: Used for architecture validation, code scaffolding, and problem-solving discussions.

### Integration with Human Input

All suggestions were reviewed, refactored, or rewritten to match project goals and architectural decisions. More detailed documentation on AI usage — including examples, customizations, and trade-offs — will be added at the end of the project.

> 📝 Full AI usage documentation will be completed before the final delivery.

## License

This project is for evaluation purposes only.
