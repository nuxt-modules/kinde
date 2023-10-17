import { defineEventHandler, sendRedirect } from 'h3'
import { kindeClient } from '../utils/client'

export default defineEventHandler(async event => {
  const loginURL = await kindeClient.login(event.context.kinde.sessionManager, {
    // TODO: support custom options
  })
  await sendRedirect(event, loginURL.href)
})
