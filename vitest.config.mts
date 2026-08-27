import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/int/**/*.int.spec.ts'],
    // Payload's first getPayload() connects to Postgres and pushes the schema,
    // which comfortably exceeds vitest's 10s defaults on a cold CI database.
    hookTimeout: 120_000,
    testTimeout: 60_000,
  },
})
