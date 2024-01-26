export default defineNuxtConfig({
  modules: ['@nuxtjs/kinde'],
  devtools: { enabled: true },
  kinde: {
    protectedServerRoutes: [
      {
        "/protected": {
          permissions: ['example_permission'],
          redirectUrl: "/"
        }
      }
    ]
  }
})
