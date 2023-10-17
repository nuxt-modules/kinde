import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'
import { kindeClient } from '../utils/client'

export default defineEventHandler(async event => {
  await kindeClient.handleRedirectToApp(
    event.context.kinde!.sessionManager,
    getRequestURL(event)
  )
  await sendRedirect(event, '/')
})
