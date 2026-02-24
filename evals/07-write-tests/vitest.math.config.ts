import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    include: ['math.test.ts'],
    globals: true,
  },
});
