import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@libs/ui': path.resolve(__dirname, '../../libs/ui/src'),
            '@libs/hooks': path.resolve(__dirname, '../../libs/hooks/src'),
            '@libs/utils': path.resolve(__dirname, '../../libs/utils/src'),
            '@libs/services': path.resolve(__dirname, '../../libs/services/src'),
        },
    },
})
