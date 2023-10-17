import { defineEventHandler, sendRedirect } from 'h3'
import { kindeClient } from '../utils/client'

export default defineEventHandler(async event => {
  const registerURL = await kindeClient.register(
    event.context.kinde.sessionManager,
    {
      // TODO: support custom org type, etc.
    }
  )
  await sendRedirect(event, registerURL.href)
})
