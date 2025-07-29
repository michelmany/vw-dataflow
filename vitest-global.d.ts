/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

declare global {
  namespace Vi {
    interface Assertion<T = any> extends jest.Matchers<void, T> {}
    interface AsymmetricMatchersContaining extends jest.AsymmetricMatchers {}
  }
}

export {};
