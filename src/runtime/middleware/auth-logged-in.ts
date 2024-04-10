import type { NitroRouteRules } from 'nitropack'
import { getRouteRules } from 'nitropack/runtime'
import { getKindeClient } from '../server/utils/client'
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
  const kindeConfig: NitroRouteRules['kinde'] = getRouteRules(nuxt.ssrContext!.event).kinde

  if (!nuxt.$auth.loggedIn) {
    if (kindeConfig?.redirectUrl) {
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
