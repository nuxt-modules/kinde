import { getRouteRules } from 'nitropack/runtime'
import {
  abortNavigation,
  createError,
  defineNuxtRouteMiddleware,
  navigateTo,
  useNuxtApp,
} from '#imports'

function rejectNavigation(statusCode: number, message: string) {
  if (import.meta.server) {
    return createError({
      statusCode,
      message,
    })
  }
  return abortNavigation()
}

export default defineNuxtRouteMiddleware(async () => {
  const nuxt = useNuxtApp()
  const kindeConfig = getRouteRules(nuxt.ssrContext!.event).kinde

  function denyAccess() {
    if (kindeConfig?.redirectUrl) {
      return navigateTo(kindeConfig.redirectUrl)
    }
    return rejectNavigation(401, 'You must be logged in to access this page')
  }

  if (!nuxt.$auth.loggedIn) {
    return denyAccess()
  }

  if (kindeConfig?.permissions) {
    const usersPermissions = await nuxt.ssrContext!.event.context.kinde.getPermissions()

    if (!kindeConfig.permissions.some(item => usersPermissions.permissions.includes(item))) {
      return denyAccess()
    }
  }
})
