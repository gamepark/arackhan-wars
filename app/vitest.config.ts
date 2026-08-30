import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig({ mode: 'test', command: 'serve' } as never), defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    server: { deps: { inline: [/@gamepark/] } }
  }
}))
