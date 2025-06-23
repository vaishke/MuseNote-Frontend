import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    define: {
        global: 'window', // ✅ fix for global is not defined
    },
    resolve: {
        alias: {
            util: 'rollup-plugin-node-polyfills/polyfills/util',
            buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
            process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
        },
    },
});