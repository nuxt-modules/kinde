export default defineNuxtConfig({
  modules: ['@nuxtjs/kinde'],
  devtools: { enabled: true },
  compatibilityDate: '2024-08-19',
  routeRules: {
    '/protected': {
      appMiddleware: ['auth-logged-in'],
      kinde: {
        permissions: ['example_permission'],
        redirectUrl: '/',
      },
    },
    '/dashboard': {
      appMiddleware: ['auth-logged-in'],
      kinde: {
        redirectUrl: '/',
      },
    },
  },
  experimental: {
    inlineRouteRules: true,
  },
})
