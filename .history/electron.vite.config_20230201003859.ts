import { resolve, normalize, dirname } from 'path'
import { defineConfig } from 'electron-vite'

import injectProcessEnvPlugin from 'rollup-plugin-inject-process-env'
import tsconfigPathsPlugin from 'vite-tsconfig-paths'
import reactPlugin from '@vitejs/plugin-react'

import { main, resources } from './package.json'

const [nodeModules, devFolder] = normalize(dirname(main)).split(/\/|\\/g)
const devPath = [nodeModules, devFolder].join('/')

const tsconfigPaths = tsconfigPathsPlugin({
  projects: [resolve('tsconfig.json')],
})

export default defineConfig({
  main: {
    plugins: [tsconfigPaths],

    build: {
      rollupOptions: {
        input: {
          index: resolve('src/main/index.ts'),
        },

        output: {
          dir: resolve(devPath, 'main'),
        },
      },
    },
  },

  preload: {
    plugins: [tsconfigPaths],

    build: {
      outDir: resolve(devPath, 'preload'),
    },
  },

  renderer: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.platform': JSON.stringify(process.platform),
    },

    server: {
      port: 4927,
    },

    plugins: [tsconfigPaths, reactPlugin()],
    publicDir: resolve(resources, 'public'),

    optimizeDeps: {
      esbuildOptions: {
          // Node.js global to browser globalThis
          define: {
              global: 'globalThis'
          },
          // Enable esbuild polyfill plugins
          plugins: [
              NodeGlobalsPolyfillPlugin({
                  process: true,
                  buffer: true
              }),
              NodeModulesPolyfillPlugin()
          ]
      }
  },

    build: {
      outDir: resolve(devPath, 'renderer'),

      rollupOptions: {
        plugins: [
          injectProcessEnvPlugin({
            NODE_ENV: 'production',
            platform: process.platform,
          }),
        ],

        input: {
          index: resolve('src/renderer/index.html'),
        },

        output: {
          dir: resolve(devPath, 'renderer'),
        },
      },
    },
  },
})
