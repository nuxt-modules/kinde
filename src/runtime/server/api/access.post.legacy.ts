import { defineEventHandler, readBody } from 'h3'
import { getRouteRulesForPath } from 'nitropack/runtime/internal/route-rules'

import type { NitroRouteRules } from 'nitropack'
import type { AccessResponse } from '../../types'

export default defineEventHandler(async (event): Promise<AccessResponse> => {
  const { path } = await readBody(event)
  const routeRules = await getRouteRulesForPath(path).kinde as NitroRouteRules['kinde']

  // No rules defined or route is public - allow access
  if (!routeRules || routeRules.public) {
    return {
      access: true,
    }
  }
  const isAuthenticated = await event.context.kinde.isAuthenticated()

  // Non public rules are defined, but not logged in, reject access
  if (!isAuthenticated) {
    return {
      access: false,
      redirectUrl: routeRules.redirectUrl,
      external: routeRules.external,
    }
  }

  const usersPermissions = await event.context.kinde.getPermissions()

  // Logged in user does not have any permissions and rules are defined on route
  if (routeRules.permissions && !usersPermissions.permissions) {
    return {
      access: false,
      redirectUrl: routeRules.redirectUrl,
      external: routeRules.external,
    }
  }

  // Logged in user does not have permission to access the route
  if (routeRules.permissions) {
    if (!Object.keys(routeRules.permissions)?.some((item: string) => usersPermissions.permissions.includes(item))) {
      return {
        access: false,
        redirectUrl: routeRules.redirectUrl,
        external: routeRules.external,
      }
    }
  }

  // allow acce
  return {
    access: true,
  }
})
