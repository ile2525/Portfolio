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
                contact: 'contact.html',
                FeT: 'FeT.html',
                immigration: 'immigration.html',
                affiche: 'affiche.html',
                emotions: 'emotions.html',
                frigo: 'frigo.html',
                //...autres pages
            },
        },
    },
})