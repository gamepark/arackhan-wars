import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig({ mode: 'test', command: 'serve' } as never), defineConfig({
  // No .env in test mode: an undefined define would reach process.env as the string "undefined", an invalid URL
  define: { 'process.env.PLATFORM_URI': JSON.stringify('https://game-park.com') },
  test: {
    setupFiles: ['./vitest.setup.ts'],
    server: { deps: { inline: [/@gamepark/] } }
  }
}))
