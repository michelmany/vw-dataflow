import { render, type RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { Provider } from 'jotai'

// Create a custom render function that includes providers
function customRender(ui: ReactElement, options?: RenderOptions) {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider>
        {children}
      </Provider>
    )
  }

  return render(ui, { wrapper: AllTheProviders, ...options })
}

// re-export everything
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

// override render method
export { customRender as render }
