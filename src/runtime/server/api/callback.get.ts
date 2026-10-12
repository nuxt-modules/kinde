import { defineEventHandler, getRequestURL, sendRedirect, useRuntimeConfig } from 'nuxt/server'
import { getKindeClient } from '../utils/client'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const sessionManager = event.context.kinde.sessionManager

  await getKindeClient().handleRedirectToApp(
    sessionManager,
    getRequestURL(event),
  )

  const postLoginRedirectURL = await sessionManager.getSessionItem('post-login-redirect-url') as string

  if (postLoginRedirectURL) {
    await sessionManager.removeSessionItem('post-login-redirect-url')
    return sendRedirect(event, postLoginRedirectURL)
  }

  return sendRedirect(event, config.kinde.postLoginRedirectURL || '/')
})
