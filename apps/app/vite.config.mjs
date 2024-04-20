import process from 'node:process'
import path from 'node:path'

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    root: './src',
    envDir: '../',
    manifest: true,
    build: {
      outDir: '../build',
    },
    publicDir: '../public',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
    server: {
      https: false,
      port: env.PORT ?? 9000,
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  }
})
