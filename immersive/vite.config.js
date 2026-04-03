import restart from 'vite-plugin-restart'
import wasm from 'vite-plugin-wasm'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default {
    root: '.',
    envDir: '../',
    publicDir: '../public',
    base: './',
    server: {
        host: true,
        port: 5174,
        open: false
    },
    build: {
        outDir: '../dist-immersive',
        emptyOutDir: true,
        sourcemap: false,
        target: 'esnext'
    },
    plugins: [
        wasm(),
        restart({ restart: [ '../public/**', ] }),
        nodePolyfills()
    ]
}