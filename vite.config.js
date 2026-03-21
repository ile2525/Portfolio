import { defineConfig } from 'vite';

export default defineConfig({
    base: '/Portfolio/', 
    build: {
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: 'index.html',
                //...autres pages
            },
        },
    },
})