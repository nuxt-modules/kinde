export default defineNuxtConfig({
  modules: ['../src/module'],
  myModule: {},
  devtools: { enabled: true },
  runtimeConfig: {
    kinde: {
      authDomain: '',
      clientId: '',
      clientSecret: '',
      redirectURL: '',
      logoutRedirectURL: '',
    }
  }
})
