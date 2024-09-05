// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools         : {enabled: true},
    extends          : ['@nuxt/ui-pro'],
    modules          : ['@nuxt/ui'],

    runtimeConfig: {
        public: {
            apiUrl  : process.env.NUXT_API_URL,
            assetUrl: process.env.NUXT_ASSET_URL
        }
    },

    app: {
        head: {
            link: [{rel: 'icon', href: '/img/icon.png'}]
        }
    }
})