import { defineEventHandler, sendRedirect } from 'h3'
import { kindeClient } from '../utils/client'

export default defineEventHandler(async event => {
  const logoutURL = await kindeClient.logout(
    event.context.kinde!.sessionManager
  )
  await sendRedirect(event, logoutURL.href)
})
