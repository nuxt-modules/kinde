import { abortNavigation, createError, defineNuxtRouteMiddleware, useNuxtApp } from '#imports'

export default defineNuxtRouteMiddleware(() => {
  if (useNuxtApp().$auth.loggedIn) {
    if (import.meta.server) {
      return createError({
        statusCode: 401,
        message: 'You must be logged out to access this page',
      })
    }
    return abortNavigation()
  }
})
