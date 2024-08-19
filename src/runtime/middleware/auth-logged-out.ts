import type { AuthState } from '../types'
import {
  abortNavigation,
  createError,
  defineNuxtRouteMiddleware,
  useNuxtApp,
} from '#imports'

export default defineNuxtRouteMiddleware(() => {
  if ((useNuxtApp().$auth as AuthState).loggedIn) {
    if (import.meta.server) {
      return createError({
        statusCode: 401,
        message: 'You must be logged out to access this page',
      })
    }
    return abortNavigation()
  }
})
