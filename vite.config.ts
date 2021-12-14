import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { cp } from 'node:fs/promises'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  await cp(resolve(__dirname, 'src/globals.d.ts'), resolve(__dirname, 'dist/globals.d.ts'))

  return {
    build: {
      lib: {
        name: 'simpledomtracking',
        entry: resolve(__dirname, 'src/index.ts'),
        fileName: format => `index.${format}.js`,
      },
      emptyOutDir: false,
    },
  }
})
