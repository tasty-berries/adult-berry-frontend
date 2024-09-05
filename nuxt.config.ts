// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools         : {enabled: true},
    extends          : ['@nuxt/ui-pro'],
    modules          : ['@nuxt/ui'],

    runtimeConfig: {
        public: {
            apiUrl  : 'http://adultberry.vrkitty.ru/api',
            assetUrl: 'http://adultberry.vrkitty.ru/storage'
        }
    },

    app: {
        head: {
            link: [{rel: 'icon', href: '/img/icon.png'}]
        }
    }
})