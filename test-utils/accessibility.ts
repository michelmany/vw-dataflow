import { vi } from 'vitest'

// Mock implementation of axe-core for accessibility testing
export const axeMatchers = {
  toHaveNoViolations: vi.fn(),
}

// Helper function to check basic accessibility patterns
export const checkAccessibility = async (element: HTMLElement) => {
  const violations: string[] = []
  
  // Check for proper heading hierarchy
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6')
  let previousLevel = 0
  headings.forEach(heading => {
    const level = parseInt(heading.tagName.charAt(1))
    if (level > previousLevel + 1) {
      violations.push(`Heading level ${level} skips level ${previousLevel + 1}`)
    }
    previousLevel = level
  })
  
  // Check for form labels
  const inputs = element.querySelectorAll('input, select, textarea')
  inputs.forEach(input => {
    const id = input.getAttribute('id')
    const ariaLabel = input.getAttribute('aria-label')
    const ariaLabelledBy = input.getAttribute('aria-labelledby')
    
    if (id) {
      const label = element.querySelector(`label[for="${id}"]`)
      if (!label && !ariaLabel && !ariaLabelledBy) {
        violations.push(`Input with id "${id}" has no associated label`)
      }
    }
  })
  
  // Check for button accessibility
  const buttons = element.querySelectorAll('button')
  buttons.forEach(button => {
    const text = button.textContent?.trim()
    const ariaLabel = button.getAttribute('aria-label')
    const ariaLabelledBy = button.getAttribute('aria-labelledby')
    
    if (!text && !ariaLabel && !ariaLabelledBy) {
      violations.push('Button has no accessible text')
    }
  })
  
  // Check for proper dialog/modal attributes
  const dialogs = element.querySelectorAll('[role="dialog"]')
  dialogs.forEach(dialog => {
    const ariaModal = dialog.getAttribute('aria-modal')
    if (!ariaModal) {
      violations.push('Dialog missing aria-modal attribute')
    }
  })
  
  // Check for table accessibility
  const tables = element.querySelectorAll('table')
  tables.forEach(table => {
    const caption = table.querySelector('caption')
    const ariaLabel = table.getAttribute('aria-label')
    const ariaLabelledBy = table.getAttribute('aria-labelledby')
    
    if (!caption && !ariaLabel && !ariaLabelledBy) {
      violations.push('Table missing accessible description')
    }
  })
  
  return violations
}

// Helper to test keyboard navigation
export const checkKeyboardNavigation = async (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const violations: string[] = []
  
  focusableElements.forEach(el => {
    const tabIndex = el.getAttribute('tabindex')
    if (tabIndex && parseInt(tabIndex) > 0) {
      violations.push('Positive tabindex found - should use 0 or -1')
    }
  })
  
  return violations
}

// Helper to check color contrast (mock implementation)
export const checkColorContrast = async (element: HTMLElement) => {
  // This would normally use a real color contrast checker
  // For testing purposes, we'll do basic checks
  const violations: string[] = []
  
  const elementsWithText = element.querySelectorAll('*')
  elementsWithText.forEach(el => {
    const text = el.textContent?.trim()
    if (text && el.children.length === 0) {
      const styles = window.getComputedStyle(el)
      const color = styles.color
      const backgroundColor = styles.backgroundColor
      
      // Mock check - in real implementation would calculate contrast ratio
      if (color === 'rgb(255, 255, 255)' && backgroundColor === 'rgb(255, 255, 255)') {
        violations.push('Poor color contrast detected')
      }
    }
  })
  
  return violations
}

export const a11yTest = {
  checkAccessibility,
  checkKeyboardNavigation,
  checkColorContrast,
}
