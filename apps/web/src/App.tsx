import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load pages for code splitting
const UserListPage = lazy(() => import('./pages/users/UserListPage'));
const UserDetailPage = lazy(() => import('./pages/users/UserDetailPage'));

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Michel Moraes</h1>
            </div>
          </div>
        </div>
      </nav>

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/user/:id" element={<UserDetailPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
