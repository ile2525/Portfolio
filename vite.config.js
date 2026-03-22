import { defineConfig } from 'vite';

export default defineConfig({
    base: '/Portfolio/', 
    build: {
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: 'index.html',
                projets: 'projets.html',
                apropos: 'apropos.html',
                immigration: 'immigration.html',
                affiche: 'affiche.html',
                
                //...autres pages
            },
        },
    },
})