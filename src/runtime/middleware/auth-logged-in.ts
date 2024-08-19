import { abortNavigation, createError, defineNuxtRouteMiddleware, useNuxtApp } from '#imports'

export default defineNuxtRouteMiddleware(() => {
  // @ts-expect-error will be fixed in Nuxt v3.13
  if (!useNuxtApp().$auth.loggedIn) {
    if (import.meta.server) {
      return createError({
        statusCode: 401,
        message: 'You must be logged in to access this page',
      })
    }
    return abortNavigation()
  }
})
