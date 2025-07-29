import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load pages for code splitting
const UserListPage = lazy(() => import('./pages/users/UserListPage'));
const UserDetailPage = lazy(() => import('./pages/users/UserDetailPage'));

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

      <header
        role="banner"
        data-prevent-focus="true"
        className="focus:outline-none"
      >
        <nav
          className="bg-white shadow-sm border-b focus:outline-none"
          aria-label="Main navigation"
          data-prevent-focus="true"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 focus:outline-none">
            <div className="flex justify-between h-16 focus:outline-none">
              <div className="flex items-center focus:outline-none">
                <h1
                  className="text-xl font-semibold focus:outline-none"
                  id="site-title"
                >
                  Michel Moraes
                </h1>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main role="main" id="main-content" className="focus:outline-none">
        <Suspense
          fallback={
            <div
              className="flex items-center justify-center min-h-[200px] focus:outline-none"
              role="status"
              aria-live="polite"
            >
              <div
                className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary focus:outline-none"
                aria-hidden="true"
              ></div>
              <span className="sr-only">Loading page content...</span>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<UserListPage />} />
            <Route path="/user/:id" element={<UserDetailPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
