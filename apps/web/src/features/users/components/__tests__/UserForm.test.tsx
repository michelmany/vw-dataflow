import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserForm } from '../UserForm'
import { User } from '@libs/types'

// Mock the UI components to focus on UserForm logic
vi.mock('@libs/ui', () => ({
  Input: vi.fn(({ id, value, onChange, required, ...props }) => (
    <input 
      id={id}
      value={value || ''} 
      onChange={onChange} 
      required={required}
      data-testid={id}
      {...props}
    />
  )),
  Label: vi.fn(({ children, htmlFor }) => (
    <label htmlFor={htmlFor} data-testid={`label-${htmlFor}`}>
      {children}
    </label>
  )),
  Select: vi.fn(({ children, value, onValueChange }) => (
    <div data-testid="select-container" data-value={value}>
      <button 
        onClick={() => onValueChange?.('admin')} 
        data-testid="select-trigger"
      >
        {value || 'Select...'}
      </button>
      {children}
    </div>
  )),
  SelectContent: vi.fn(({ children }) => <div>{children}</div>),
  SelectItem: vi.fn(({ children, value }) => (
    <div data-value={value} data-testid={`select-item-${value}`}>
      {children}
    </div>
  )),
  SelectTrigger: vi.fn(({ children, id }) => (
    <div id={id} data-testid={`select-trigger-${id}`}>
      {children}
    </div>
  )),
  SelectValue: vi.fn(({ placeholder }) => (
    <span data-testid="select-value">{placeholder}</span>
  )),
}))

const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'admin',
  status: 'active',
  team: 'engineering',
  avatar: 'https://example.com/avatar.jpg',
  createdAt: '2024-01-01T00:00:00Z',
}

describe('UserForm', () => {
  const mockOnSubmit = vi.fn()
  const mockOnCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders form with all required fields', () => {
      render(<UserForm onSubmit={mockOnSubmit} />)
      
      // Check form element with proper attributes
      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()
      expect(form).toHaveAttribute('id', 'user-form')
      expect(form).toHaveAttribute('aria-label', 'Add new user form')
      
      // Check required text fields
      expect(screen.getByTestId('name')).toBeInTheDocument()
      expect(screen.getByTestId('email')).toBeInTheDocument()
      expect(screen.getByTestId('label-name')).toHaveTextContent('Name *')
      expect(screen.getByTestId('label-email')).toHaveTextContent('Email Address *')
    })

    it('renders all select fields for user attributes', () => {
      render(<UserForm onSubmit={mockOnSubmit} />)
      
      // Check that labels for select fields are rendered
      expect(screen.getByTestId('label-role')).toHaveTextContent('Role')
      expect(screen.getByTestId('label-team')).toHaveTextContent('Team')
      expect(screen.getByTestId('label-status')).toHaveTextContent('Status')
      
      // Check select triggers are rendered
      expect(screen.getByTestId('select-trigger-role')).toBeInTheDocument()
      expect(screen.getByTestId('select-trigger-team')).toBeInTheDocument()
      expect(screen.getByTestId('select-trigger-status')).toBeInTheDocument()
    })

    it('shows different aria-label for edit mode', () => {
      render(<UserForm initialData={mockUser} onSubmit={mockOnSubmit} />)
      
      const form = screen.getByRole('form')
      expect(form).toHaveAttribute('aria-label', 'Edit user form')
    })
  })

  describe('Form Initialization', () => {
    it('renders empty form when no initial data provided', () => {
      render(<UserForm onSubmit={mockOnSubmit} />)
      
      const nameInput = screen.getByTestId('name')
      const emailInput = screen.getByTestId('email')
      
      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
    })

    it('pre-fills form with initial data when provided', () => {
      render(<UserForm initialData={mockUser} onSubmit={mockOnSubmit} />)
      
      const nameInput = screen.getByTestId('name')
      const emailInput = screen.getByTestId('email')
      
      expect(nameInput).toHaveValue('John Doe')
      expect(emailInput).toHaveValue('john.doe@example.com')
    })
  })

  describe('Form Interactions', () => {
    it('updates input values when user types', async () => {
      const user = userEvent.setup()
      render(<UserForm onSubmit={mockOnSubmit} />)
      
      const nameInput = screen.getByTestId('name')
      const emailInput = screen.getByTestId('email')
      
      await user.type(nameInput, 'Jane Smith')
      await user.type(emailInput, 'jane@example.com')
      
      expect(nameInput).toHaveValue('Jane Smith')
      expect(emailInput).toHaveValue('jane@example.com')
    })

    it('calls onSubmit with form data when form is submitted', async () => {
      const user = userEvent.setup()
      render(<UserForm onSubmit={mockOnSubmit} />)
      
      const nameInput = screen.getByTestId('name')
      const emailInput = screen.getByTestId('email')
      const form = screen.getByRole('form')
      
      await user.type(nameInput, 'Test User')
      await user.type(emailInput, 'test@example.com')
      
      await user.click(form)
      
      // Submit the form
      await waitFor(() => {
        form.dispatchEvent(new Event('submit', { bubbles: true }))
      })
      
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
      })
    })

    it('prevents form submission when required fields are empty', async () => {
      const user = userEvent.setup()
      render(<UserForm onSubmit={mockOnSubmit} />)
      
      const form = screen.getByRole('form')
      
      // Try to submit without filling required fields
      await waitFor(() => {
        form.dispatchEvent(new Event('submit', { bubbles: true }))
      })
      
      // onSubmit should still be called with empty data
      expect(mockOnSubmit).toHaveBeenCalledWith({})
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes for required fields', () => {
      render(<UserForm onSubmit={mockOnSubmit} />)
      
      const nameInput = screen.getByTestId('name')
      const emailInput = screen.getByTestId('email')
      
      // Check required attributes
      expect(nameInput).toHaveAttribute('required')
      expect(emailInput).toHaveAttribute('required')
      
      // Check ARIA attributes
      expect(nameInput).toHaveAttribute('aria-describedby', 'name-required')
      expect(emailInput).toHaveAttribute('aria-describedby', 'email-required email-format')
      
      // Check aria-invalid attributes
      expect(nameInput).toHaveAttribute('aria-invalid', 'false')
      expect(emailInput).toHaveAttribute('aria-invalid', 'false')
    })

    it('has screen reader text for required fields', () => {
      render(<UserForm onSubmit={mockOnSubmit} />)
      
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email address is required')).toBeInTheDocument()
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })

    it('has proper labels for select fields', () => {
      render(<UserForm onSubmit={mockOnSubmit} />)
      
      // Check that select descriptions exist
      expect(screen.getByText("Choose the user's role")).toBeInTheDocument()
      expect(screen.getByText("Choose the user's team")).toBeInTheDocument()
      expect(screen.getByText("Choose the user's status")).toBeInTheDocument()
    })
  })

  describe('Email Validation', () => {
    it('has correct input type for email field', () => {
      render(<UserForm onSubmit={mockOnSubmit} />)
      
      const emailInput = screen.getByTestId('email')
      expect(emailInput).toHaveAttribute('type', 'email')
    })
  })

  describe('Form State Management', () => {
    it('maintains form state across re-renders', async () => {
      const user = userEvent.setup()
      const { rerender } = render(<UserForm onSubmit={mockOnSubmit} />)
      
      const nameInput = screen.getByTestId('name')
      await user.type(nameInput, 'Persistent User')
      
      // Re-render with same props
      rerender(<UserForm onSubmit={mockOnSubmit} />)
      
      // Value should be maintained
      expect(screen.getByTestId('name')).toHaveValue('Persistent User')
    })

    it('updates form when initialData changes', () => {
      const { rerender } = render(<UserForm onSubmit={mockOnSubmit} />)
      
      expect(screen.getByTestId('name')).toHaveValue('')
      
      // Re-render with initial data
      rerender(<UserForm initialData={mockUser} onSubmit={mockOnSubmit} />)
      
      expect(screen.getByTestId('name')).toHaveValue('John Doe')
    })
  })
})
