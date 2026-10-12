import { defineEventHandler, sendRedirect, getQuery, useRuntimeConfig } from 'nuxt/server'
import { PortalPage } from '@kinde-oss/kinde-typescript-sdk'
import { getKindeClient } from '../utils/client'

export default defineEventHandler(async (event) => {
  const { kinde: kindeSettings } = useRuntimeConfig()
  const query = getQuery<Record<string, string>>(event)

  const sessionManager = event.context.kinde.sessionManager

  const loginURL = await getKindeClient().portal(sessionManager, {
    subNav: (query.subNav as PortalPage) || PortalPage.profile,
    domain: kindeSettings.authDomain,
    returnUrl: query.returnUrl || kindeSettings.redirectURL,
  })
  return sendRedirect(event, loginURL.url.toString())
})
