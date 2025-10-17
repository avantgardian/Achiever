import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test file location
    include: ['tests/unit/**/*.test.js'],
    
    // Environment (jsdom for DOM testing, node for pure JS)
    environment: 'node',
    
    // Global test utilities (like describe, it, expect)
    globals: true,
    
    // Coverage configuration (optional, for later)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['docs/js/**/*.js'],
    },
  },
});

