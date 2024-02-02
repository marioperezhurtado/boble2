import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    sveltekit(),
    visualizer({
      emitFile: true,
      gzipSize: true,
      filename: "stats.html",
    }),
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
});
