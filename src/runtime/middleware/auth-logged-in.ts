import type { NitroRouteRules } from 'nitropack'
import type { AccessResponse } from '../types'
import { abortNavigation, createError, defineNuxtRouteMiddleware, navigateTo, useNuxtApp, getRouteRules } from '#imports'

function rejectNavigation(statusCode: number, message: string) {
  if (import.meta.server) {
    return createError({
      statusCode,
      message,
    })
  }
  return abortNavigation()
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === from.path && import.meta.client) {
    return
  }
  const nuxt = useNuxtApp()

  function denyAccess(redirectURL?: string, external = false) {
    if (redirectURL) {
      return navigateTo(redirectURL, { external })
    }
    return rejectNavigation(401, 'You must be logged in to access this page')
  }

  if (import.meta.client) {
    // on client don't have access to route rules, check server
    const fetchResult = await $fetch<AccessResponse>('/api/access', {
      method: 'POST',
      body: {
        path: to.path,
      },
    })
    if (!fetchResult.access && fetchResult.redirectUrl) {
      return denyAccess(fetchResult.redirectUrl, fetchResult.external)
    }
    return
  }

  const { kinde: kindeConfig } = await getRouteRules({ path: to.path }) as NitroRouteRules

  // if no config or public route, allow access
  if (!kindeConfig || kindeConfig.public) {
    return
  }

  // not logged in, deny access
  if (!nuxt.$auth.loggedIn) {
    return denyAccess(kindeConfig?.redirectUrl, kindeConfig?.external)
  }

  // user is logged in, check permissions
  if (kindeConfig?.permissions) {
    const usersPermissions = await nuxt.ssrContext!.event.context.kinde.getPermissions()

    if (!Object.keys(kindeConfig.permissions).some(item => usersPermissions.permissions?.includes(item))) {
      return denyAccess(kindeConfig?.redirectUrl, kindeConfig?.external)
    }
  }
})
