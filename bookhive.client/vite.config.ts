import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import child_process from 'node:child_process';
import { env } from 'node:process';

export default defineConfig(({ mode }) => {
    const envVars = loadEnv(mode, process.cwd(), '');

    const baseFolder =
        env.APPDATA !== undefined && env.APPDATA !== ''
            ? `${env.APPDATA}/ASP.NET/https`
            : `${env.HOME}/.aspnet/https`;

    const certificateName = 'bookhive.client';
    const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
    const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

    if (!fs.existsSync(baseFolder)) {
        fs.mkdirSync(baseFolder, { recursive: true });
    }

    if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
        if (
            0 !==
            child_process.spawnSync(
                'dotnet',
                ['dev-certs', 'https', '--export-path', certFilePath, '--format', 'Pem', '--no-password'],
                { stdio: 'inherit' }
            ).status
        ) {
            throw new Error('Could not create certificate.');
        }
    }

    const target = env.VITE_BACKEND_URL || 'http://localhost:5135';

    return {
        plugins: [plugin()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            proxy: {
              '/api': {
                target,
                secure: false,
                changeOrigin: true
              }
            },
            port: parseInt(env.DEV_SERVER_PORT || '50253'),
            https: {
              key: fs.readFileSync(keyFilePath),
              cert: fs.readFileSync(certFilePath),
            }
        },          
    };
});
