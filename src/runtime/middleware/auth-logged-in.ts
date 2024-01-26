import {
  abortNavigation,
  createError,
  defineNuxtRouteMiddleware,
  navigateTo,
  useNuxtApp,
} from '#imports'
import { minimatch } from 'minimatch'
import { getKindeClient } from '../server/utils/client';
import type { RouteAccessPermissions } from '~/src/module';

function rejectNavigation(status: number, message: string) {
  if (import.meta.server) {
    return createError({
      statusCode: 401,
      message: 'You must be logged in to access this page',
    })
  }
  return abortNavigation()
}

export default defineNuxtRouteMiddleware(async(to) => {
  const nuxt = useNuxtApp();
  const kindeConfig = nuxt.$config.kinde;

  if (!nuxt.$auth.loggedIn) {
    return rejectNavigation(401, 'You must be logged in to access this page')
  }

  if (kindeConfig && kindeConfig.protectedServerRoutes) {
    const kinde = getKindeClient()

    for (const routePattern of kindeConfig.protectedServerRoutes as RouteAccessPermissions[]) {
      const pattern = Object.keys(routePattern)[0];
      if (!minimatch(to.fullPath, pattern)) {
        return
      }

      const accessPermissions = routePattern[pattern].permissions
      const usersPermissions = await kinde.getPermissions(nuxt.ssrContext?.event.context.kinde.sessionManager!);
      const hasCommonValue = accessPermissions.some(item => usersPermissions.permissions.includes(item));

      if (!hasCommonValue) {
        if (routePattern[pattern].redirectUrl) {
          return navigateTo(routePattern[pattern].redirectUrl)
        }
        return rejectNavigation(401, 'You must be logged in to access this page')
      }
    }
  }
})
