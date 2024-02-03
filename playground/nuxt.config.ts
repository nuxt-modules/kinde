export default defineNuxtConfig({
  modules: ['@nuxtjs/kinde'],
  devtools: { enabled: true },
  routeRules: {
    "/protected": {
      kinde: {
        permissions: ['example_permission'],
        redirectUrl: '/',
      }
    },
    "/dashboard": {
      kinde: {
        redirectUrl: '/',
      }
    }
  },
  experimental: {
    inlineRouteRules: true
  }
})
