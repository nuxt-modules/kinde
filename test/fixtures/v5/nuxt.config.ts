export default defineNuxtConfig({
  modules: ['@nuxtjs/kinde'],
  routeRules: {
    '/protected': {
      appMiddleware: { 'auth-logged-in': true },
      kinde: {
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
  kinde: {
    password: 'kinde-test-password-at-least-32-characters',
    authDomain: 'https://example.kinde.com',
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
    redirectURL: 'http://localhost:3000/api/callback',
    logoutRedirectURL: 'http://localhost:3000',
    postLoginRedirectURL: 'http://localhost:3000/',
    debug: true,
  },
})
