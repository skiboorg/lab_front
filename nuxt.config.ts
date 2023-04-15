// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
     '@splidejs/vue-splide/css',
        'primevue/resources/themes/tailwind-light/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',
        '@/assets/css/reset.sass',
        '@/assets/css/styles.sass',


    ],
    build: {
        transpile: ['primevue']
    },
    ssr: false,
    modules: ['@pinia/nuxt'],

    runtimeConfig: {
        public:{
            apiUrl: 'http://localhost:8000',
        }
    },
})
