export default defineNuxtConfig({
  modules: ['@nuxtjs/kinde'],
  routeRules: {
    '/**': {
      appMiddleware: { 'auth-logged-in': true },
      kinde: {
        redirectUrl: '/api/login',
        external: true,
      },
    },
    '/dashboard': {
      appMiddleware: { 'auth-logged-in': true },
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
      appMiddleware: { 'auth-logged-in': true },
      kinde: {
        public: true,
      },
    },
  },
  compatibilityDate: 'latest',
})
