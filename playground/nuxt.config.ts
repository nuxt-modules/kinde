export default defineNuxtConfig({
  modules: ['@nuxtjs/kinde'],
  devtools: { enabled: true },
  routeRules: {
    '/**': {
      appMiddleware: ['auth-logged-in'],
      kinde: {
        redirectUrl: '/api/login',
        external: true,
      },
    },
    '/dashboard': {
      appMiddleware: ['auth-logged-in'],
      kinde: {
        // list of permissions that are required to access the route
        permissions: {
          admin: true,
        },
        redirectUrl: '/api/login',
        external: true,
      },
    },
    '/public': {
      appMiddleware: ['auth-logged-in'],
      kinde: {
        public: true,
      },
    },
  },
  compatibilityDate: 'latest',
})
