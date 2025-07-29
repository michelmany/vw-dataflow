/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/__tests__/**',
        '**/*.test.*',
        '**/*.spec.*',
      ],
    },
  },
  resolve: {
    alias: {
      '@libs/ui': resolve(__dirname, './libs/ui/src'),
      '@libs/hooks': resolve(__dirname, './libs/hooks/src'),
      '@libs/types': resolve(__dirname, './libs/types/src'),
      '@libs/services': resolve(__dirname, './libs/services/src'),
      '@libs/utils': resolve(__dirname, './libs/utils/src'),
      '@test-utils': resolve(__dirname, './libs/test-utils/src'),
      '@mocks': resolve(__dirname, './libs/mocks/src'),
    },
  },
  define: {
    'import.meta.vitest': undefined,
  },
});
