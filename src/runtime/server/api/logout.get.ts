import { defineEventHandler, sendRedirect } from 'nuxt/server'
import { getKindeClient } from '../utils/client'

export default defineEventHandler(async (event) => {
  const logoutURL = await getKindeClient().logout(
    event.context.kinde!.sessionManager,
  )
  return sendRedirect(event, logoutURL.href)
})
