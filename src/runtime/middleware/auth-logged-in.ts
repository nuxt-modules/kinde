import { getKindeClient } from '../server/utils/client'
import type { KindeRouteRules } from '../types'
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
  const kindeConfig: KindeRouteRules = nuxt.ssrContext?.event.context._nitro.routeRules.kinde

  if (!nuxt.$auth.loggedIn) {
    if (kindeConfig.redirectUrl) {
      return navigateTo(kindeConfig.redirectUrl)
    }
    return rejectNavigation(401, 'You must be logged in to access this page')
  }

  if (kindeConfig?.permissions) {
    const kinde = getKindeClient()

    const accessPermissions = kindeConfig.permissions
    const usersPermissions = await kinde.getPermissions(nuxt.ssrContext!.event.context.kinde.sessionManager!)
    const hasCommonValue = accessPermissions?.some(item => usersPermissions.permissions.includes(item)) || false

    if (!hasCommonValue) {
      if (kindeConfig.redirectUrl) {
        return navigateTo(kindeConfig.redirectUrl)
      }
      return rejectNavigation(401, 'You must be logged in to access this page')
    }
  }
})
