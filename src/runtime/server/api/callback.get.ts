import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'
import { getKindeClient } from '../utils/client'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const sessionManager = event.context.kinde.sessionManager

  await getKindeClient().handleRedirectToApp(
    sessionManager,
    getRequestURL(event),
  )

  const postLoginRedirectURL = await sessionManager.getSessionItem('post-login-redirect-url') as string

  if (postLoginRedirectURL) {
    await sessionManager.removeSessionItem('post-login-redirect-url')
    await sendRedirect(event, postLoginRedirectURL)
    return
  }

  await sendRedirect(event, config.kinde.postLoginRedirectURL || '/')
})
