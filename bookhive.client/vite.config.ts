import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { env } from 'node:process';

// https://vite.dev/config/

export default defineConfig(({ mode }) => {

    const target = "https://backend-142395531834.southamerica-east1.run.app";

    return {
        base: "/",
        plugins: [react()],
        preview: {
            port: 8080,
            strictPort: true,
        },
        server: {
            proxy: {
              '/api': {
                target,
                secure: false,
                changeOrigin: true
              }
            },
            port: 8080,
            strictPort: true,
            host: true,
            origin: "http://0.0.0.0:8080",
        },
    }
})