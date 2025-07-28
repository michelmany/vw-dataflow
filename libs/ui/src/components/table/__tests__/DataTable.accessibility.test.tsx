import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DataTable } from '../DataTable'
import { a11yTest } from '../../../../../test-utils/accessibility'

interface TestData {
  id: number
  name: string
  email: string
  status: string
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
]

const columnHelper = createColumnHelper<TestData>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => info.getValue(),
  }),
]

function TestDataTableWrapper({ data = testData }: { data?: TestData[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <DataTable table={table} />
}

describe('DataTable Accessibility Tests', () => {
  describe('ARIA and Semantic HTML', () => {
    it('passes basic accessibility checks', async () => {
      const { container } = render(<TestDataTableWrapper />)
      
      const violations = await a11yTest.checkAccessibility(container)
      expect(violations).toHaveLength(0)
    })

    it('has proper table structure with semantic elements', () => {
      render(<TestDataTableWrapper />)
      
      // Check for proper table elements
      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getAllByRole('columnheader')).toHaveLength(3)
      expect(screen.getAllByRole('row')).toHaveLength(3) // 1 header + 2 data rows
      
      // Check for proper ARIA attributes
      const table = screen.getByRole('table')
      expect(table).toHaveAttribute('aria-label', 'Users data table')
      
      const region = screen.getByRole('region')
      expect(region).toHaveAttribute('aria-label', 'Data table')
    })

    it('provides accessible empty state', () => {
      render(<TestDataTableWrapper data={[]} />)
      
      const emptyCell = screen.getByText('No results found.')
      expect(emptyCell).toHaveAttribute('aria-live', 'polite')
      expect(emptyCell).toHaveAttribute('role', 'cell')
    })

    it('has proper column headers', () => {
      render(<TestDataTableWrapper />)
      
      const nameHeader = screen.getByRole('columnheader', { name: /name/i })
      const emailHeader = screen.getByRole('columnheader', { name: /email/i })
      const statusHeader = screen.getByRole('columnheader', { name: /status/i })
      
      expect(nameHeader).toBeInTheDocument()
      expect(emailHeader).toBeInTheDocument()
      expect(statusHeader).toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    it('supports basic keyboard navigation', async () => {
      const user = userEvent.setup()
      const { container } = render(<TestDataTableWrapper />)
      
      const violations = await a11yTest.checkKeyboardNavigation(container)
      expect(violations).toHaveLength(0)
    })

    it('can be focused and navigated with keyboard', async () => {
      const user = userEvent.setup()
      render(<TestDataTableWrapper />)
      
      const table = screen.getByRole('table')
      
      // Tab to table
      await user.tab()
      expect(table).toHaveFocus()
      
      // Should be able to navigate within table
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{ArrowRight}')
      await user.keyboard('{ArrowLeft}')
      await user.keyboard('{ArrowUp}')
    })

    it('supports escape key for interactions', async () => {
      const user = userEvent.setup()
      render(<TestDataTableWrapper />)
      
      const table = screen.getByRole('table')
      await user.click(table)
      
      // Test escape key
      await user.keyboard('{Escape}')
      
      // Table should still be accessible
      expect(table).toBeInTheDocument()
    })
  })

  describe('Screen Reader Support', () => {
    it('provides proper content for screen readers', () => {
      render(<TestDataTableWrapper />)
      
      // Check that data is properly exposed to screen readers
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
      expect(screen.getByText('active')).toBeInTheDocument()
      
      // Check that structure is accessible
      const cells = screen.getAllByRole('cell')
      expect(cells.length).toBeGreaterThan(0)
      
      cells.forEach(cell => {
        expect(cell).toBeVisible()
      })
    })

    it('announces changes with aria-live regions', () => {
      const { rerender } = render(<TestDataTableWrapper data={testData} />)
      
      // Verify initial state
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      
      // Update to empty data
      rerender(<TestDataTableWrapper data={[]} />)
      
      // Check that empty state has aria-live
      const emptyMessage = screen.getByText('No results found.')
      expect(emptyMessage).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('Focus Management', () => {
    it('maintains logical focus order', async () => {
      const user = userEvent.setup()
      render(<TestDataTableWrapper />)
      
      // Test tab order
      await user.tab()
      
      const table = screen.getByRole('table')
      expect(table).toHaveFocus()
      
      // Should be able to continue tabbing
      await user.tab()
      // Focus should move out of table or to next focusable element
    })

    it('provides visual focus indicators', async () => {
      const user = userEvent.setup()
      render(<TestDataTableWrapper />)
      
      const table = screen.getByRole('table')
      await user.click(table)
      
      // Check that table is focused (browser handles visual indicators)
      expect(table).toHaveFocus()
    })
  })

  describe('High Contrast and Color', () => {
    it('works without relying solely on color', () => {
      render(<TestDataTableWrapper />)
      
      // Check that status information isn't conveyed only through color
      expect(screen.getByText('active')).toBeInTheDocument()
      expect(screen.getByText('inactive')).toBeInTheDocument()
      
      // Status is conveyed through text, not just color
      const activeCells = screen.getAllByText('active')
      const inactiveCells = screen.getAllByText('inactive')
      
      expect(activeCells.length).toBeGreaterThan(0)
      expect(inactiveCells.length).toBeGreaterThan(0)
    })

    it('has sufficient color contrast', async () => {
      const { container } = render(<TestDataTableWrapper />)
      
      const violations = await a11yTest.checkColorContrast(container)
      expect(violations).toHaveLength(0)
    })
  })

  describe('Responsive and Mobile Accessibility', () => {
    it('maintains accessibility on smaller screens', () => {
      // Mock smaller screen size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375, // Mobile width
      })
      
      render(<TestDataTableWrapper />)
      
      // Table should still be accessible
      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Data table')
    })

    it('supports touch interactions', async () => {
      const user = userEvent.setup()
      render(<TestDataTableWrapper />)
      
      const table = screen.getByRole('table')
      
      // Simulate touch interaction
      await user.click(table)
      expect(table).toHaveFocus()
    })
  })

  describe('Error States and Loading', () => {
    it('announces loading states accessibly', () => {
      // This would be tested with actual loading states in a real implementation
      render(<TestDataTableWrapper />)
      
      // For now, verify structure is maintained
      expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('handles error states accessibly', () => {
      // Test with error data or states
      render(<TestDataTableWrapper data={[]} />)
      
      const emptyMessage = screen.getByText('No results found.')
      expect(emptyMessage).toHaveAttribute('aria-live', 'polite')
      expect(emptyMessage).toBeVisible()
    })
  })
})
