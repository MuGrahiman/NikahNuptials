import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`         -> normal multi-file build in /dist
// `npm run build:single`  -> ONE self-contained html (images + music inlined) in /dist-single
export default defineConfig(({ mode }) => {
  const single = mode === 'single'
  return {
    // Project Pages URL: https://mugrahiman.github.io/NikahNuptials/
    // Keep relative base for the offline single-file build.
    base: single ? './' : '/NikahNuptials/',
    plugins: [react(), ...(single ? [viteSingleFile()] : [])],
    build: {
      outDir: single ? 'dist-single' : 'dist',
      assetsInlineLimit: single ? 100000000 : 4096,
    },
  }
})
