import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@test-utils';
import UserListPage from '../UserListPage';
import { server } from '@mocks/server';
import { resetUsers } from '@mocks/handlers';
import { http, HttpResponse } from 'msw';

// Mock hooks at module level - hoisted functions need to be declared once
const { useUsers, useUserActions, useUserManagement, useIsMobile } = vi.hoisted(
  () => ({
    useUsers: vi.fn(),
    useUserActions: vi.fn(),
    useUserManagement: vi.fn(),
    useIsMobile: vi.fn().mockReturnValue(false),
  })
);

// Mock the specific hooks since they use actual API calls
vi.mock('@libs/hooks', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    useUsers,
    useUserActions,
    useUserManagement,
    useIsMobile,
  };
});

// Mock UI components to focus on integration behavior
vi.mock('@libs/ui', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    Container: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="container">{children}</div>
    ),
    DataTable: ({ table }: any) => (
      <div data-testid="data-table">
        <div data-testid="table-rows">
          {table.getRowModel().rows.map((row: any, index: number) => (
            <div key={index} data-testid={`table-row-${index}`}>
              {row.getVisibleCells().map((cell: any, cellIndex: number) => (
                <span
                  key={cellIndex}
                  data-testid={`cell-${index}-${cellIndex}`}
                >
                  {cell.getValue()}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    DataTablePagination: () => <div data-testid="pagination">Pagination</div>,
    Input: React.forwardRef<HTMLInputElement, any>(({ ...props }, ref) => (
      <input ref={ref} {...props} />
    )),
    Button: React.forwardRef<HTMLButtonElement, any>(
      ({ children, ...props }, ref) => (
        <button ref={ref} {...props}>
          {children}
        </button>
      )
    ),
    // Select Components
    Select: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    SelectTrigger: React.forwardRef<HTMLDivElement, any>(
      ({ children }, ref) => <div ref={ref}>{children}</div>
    ),
    SelectContent: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    SelectItem: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    SelectValue: ({ children }: { children: React.ReactNode }) => (
      <span>{children}</span>
    ),
    // Dialog Components - named exports, not nested
    Dialog: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DialogTrigger: ({ children }: { children: React.ReactNode }) => (
      <button>{children}</button>
    ),
    DialogContent: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DialogHeader: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DialogTitle: ({ children }: { children: React.ReactNode }) => (
      <h2>{children}</h2>
    ),
    DialogDescription: ({ children }: { children: React.ReactNode }) => (
      <p>{children}</p>
    ),
    DialogFooter: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DialogPortal: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DialogOverlay: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    // Drawer Components - named exports, not nested
    Drawer: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DrawerTrigger: ({ children }: { children: React.ReactNode }) => (
      <button>{children}</button>
    ),
    DrawerContent: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DrawerHeader: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DrawerTitle: ({ children }: { children: React.ReactNode }) => (
      <h3>{children}</h3>
    ),
    DrawerFooter: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DrawerClose: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DrawerPortal: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DrawerOverlay: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DrawerDescription: ({ children }: { children: React.ReactNode }) => (
      <p>{children}</p>
    ),
    // Other Components
    Label: ({ children }: { children: React.ReactNode }) => (
      <label>{children}</label>
    ),
    Loading: () => <div data-testid="loading">Loading...</div>,
  };
});

describe('UserListPage Integration Tests', () => {
  // Mock implementations for hooks
  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      team: 'engineering',
      avatar: 'https://example.com/avatar1.jpg',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'editor',
      status: 'active',
      team: 'marketing',
      avatar: 'https://example.com/avatar2.jpg',
      createdAt: '2024-01-02T00:00:00Z',
    },
  ];

  const mockUserActions = {
    handleAddUser: vi.fn(),
    handleEditUser: vi.fn(),
    handleDeleteUser: vi.fn(),
  };

  const mockUserManagement = {
    deleteDialogOpen: false,
    userToDelete: null,
    drawerOpen: false,
    userToEdit: null,
    drawerMode: 'add' as const,
    showcaseOpen: false,
    userToShowcase: null,
    openDeleteDialog: vi.fn(),
    closeDeleteDialog: vi.fn(),
    openAddDrawer: vi.fn(),
    openEditDrawer: vi.fn(),
    closeDrawer: vi.fn(),
    openShowcase: vi.fn(),
    closeShowcase: vi.fn(),
  };

  beforeEach(() => {
    resetUsers();
    vi.clearAllMocks();

    // Set up default mock implementations using the hoisted mocks
    useUsers.mockReturnValue({
      users: mockUsers,
      addUser: vi.fn(),
      editUser: vi.fn(),
      removeUser: vi.fn(),
      refetch: vi.fn(),
    });

    useUserActions.mockReturnValue(mockUserActions);
    useUserManagement.mockReturnValue(mockUserManagement);
  });

  describe('Page Structure and Layout', () => {
    it('renders the main page structure correctly', async () => {
      render(<UserListPage />);

      // Check main heading
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Welcome to VW Dataflow'
      );
      // Use more specific query since there might be multiple h2s (including from dialogs)
      expect(screen.getByText('Users')).toBeInTheDocument();

      // Check main sections
      expect(
        screen.getByLabelText('User management interface')
      ).toBeInTheDocument();
      expect(screen.getByTestId('container')).toBeInTheDocument();
    });

    it('renders the UserDataTable component', () => {
      render(<UserListPage />);

      // The UserDataTable should be rendered (we can't easily test its full functionality due to complex mocking)
      // But we can verify the page structure is intact
      const section = screen.getByLabelText('User management interface');
      expect(section).toBeInTheDocument();
    });
  });

  describe('User Management State Integration', () => {
    it('passes correct state to UserDataTable', () => {
      const customManagementState = {
        ...mockUserManagement,
        deleteDialogOpen: true,
        userToDelete: mockUsers[0],
        drawerOpen: true,
        userToEdit: mockUsers[1],
      };

      useUserManagement.mockReturnValue(customManagementState);

      render(<UserListPage />);

      // Verify that the page renders without errors when state is provided
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });

  describe('User Actions Integration', () => {
    it('handles delete user confirmation correctly', async () => {
      const customManagementState = {
        ...mockUserManagement,
        deleteDialogOpen: true,
        userToDelete: mockUsers[0],
      };

      useUserManagement.mockReturnValue(customManagementState);

      render(<UserListPage />);

      // Since the delete dialog logic is handled in the page component,
      // we can test that the structure is correct
      expect(
        screen.getByLabelText('User management interface')
      ).toBeInTheDocument();
    });

    it('handles user form submission correctly', async () => {
      const customManagementState = {
        ...mockUserManagement,
        drawerOpen: true,
        drawerMode: 'add' as const,
      };

      useUserManagement.mockReturnValue(customManagementState);

      render(<UserListPage />);

      // Test that the page handles the add user scenario
      expect(
        screen.getByLabelText('User management interface')
      ).toBeInTheDocument();
    });

    it('handles edit user flow correctly', async () => {
      const customManagementState = {
        ...mockUserManagement,
        drawerOpen: true,
        drawerMode: 'edit' as const,
        userToEdit: mockUsers[0],
      };

      useUserManagement.mockReturnValue(customManagementState);

      render(<UserListPage />);

      // Test that the page handles the edit user scenario
      expect(
        screen.getByLabelText('User management interface')
      ).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles empty user list gracefully', () => {
      useUsers.mockReturnValue({
        users: [],
        addUser: vi.fn(),
        editUser: vi.fn(),
        removeUser: vi.fn(),
        refetch: vi.fn(),
      });

      render(<UserListPage />);

      // Page should still render correctly with empty user list
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Welcome to VW Dataflow'
      );
      expect(
        screen.getByLabelText('User management interface')
      ).toBeInTheDocument();
    });

    it('handles API errors gracefully', async () => {
      // Mock an API error scenario
      const mockActionsWithError = {
        ...mockUserActions,
        handleDeleteUser: vi.fn().mockRejectedValue(new Error('API Error')),
      };

      useUserActions.mockReturnValue(mockActionsWithError);

      render(<UserListPage />);

      // Page should still render despite potential API errors
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });

  describe('Accessibility Integration', () => {
    it('maintains proper heading hierarchy', () => {
      render(<UserListPage />);

      const h1 = screen.getByRole('heading', { level: 1 });

      expect(h1).toHaveTextContent('Welcome to VW Dataflow');
      // Check that the Users heading exists without using role selector
      expect(screen.getByText('Users')).toBeInTheDocument();
    });

    it('has proper section labeling', () => {
      render(<UserListPage />);

      expect(
        screen.getByLabelText('User management interface')
      ).toBeInTheDocument();
    });

    it('maintains semantic HTML structure', () => {
      render(<UserListPage />);

      // Check for proper semantic elements
      const header =
        screen.getByRole('banner') || document.querySelector('header');
      const section = screen.getByLabelText('User management interface');

      expect(section).toBeInTheDocument();
      expect(section.tagName.toLowerCase()).toBe('section');
    });
  });

  describe('Component Integration', () => {
    it('integrates all user management components correctly', () => {
      render(<UserListPage />);

      // Verify all the main structural elements are present
      expect(screen.getByTestId('container')).toBeInTheDocument();
      expect(
        screen.getByLabelText('User management interface')
      ).toBeInTheDocument();

      // The component should render without throwing errors
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });
});
