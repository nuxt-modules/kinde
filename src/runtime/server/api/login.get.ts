import { defineEventHandler, sendRedirect, getQuery, useRuntimeConfig } from 'nuxt/server'
import { getKindeClient } from '../utils/client'

export default defineEventHandler(async (event) => {
  const { kinde: kindeSettings } = useRuntimeConfig()
  const query = getQuery<Record<string, string>>(event)

  const sessionManager = event.context.kinde.sessionManager

  if (query.postLoginRedirectURL) {
    sessionManager.setSessionItem('post-login-redirect-url', query.postLoginRedirectURL)
  }

  const loginURL = await getKindeClient().login(sessionManager, {
    authUrlParams: {
      audience: kindeSettings.audience,
      ...query,
    },
  })
  return sendRedirect(event, loginURL.href)
})
