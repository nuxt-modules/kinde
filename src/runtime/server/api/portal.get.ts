import { defineEventHandler, sendRedirect, getQuery } from 'h3'
import { PortalPage } from '@kinde-oss/kinde-typescript-sdk'
import { getKindeClient } from '../utils/client'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const { kinde: kindeSettings } = useRuntimeConfig()
  const query: Record<string, string> = getQuery(event)

  const sessionManager = event.context.kinde.sessionManager

  const loginURL = await getKindeClient().portal(sessionManager, {
    subNav: (query.subNav as PortalPage) || PortalPage.profile,
    domain: kindeSettings.authDomain,
    returnUrl: query.returnUrl || kindeSettings.redirectURL,
  })
  await sendRedirect(event, loginURL.url.toString())
})
