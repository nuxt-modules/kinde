import { defineEventHandler, sendRedirect } from 'h3'
import { getKindeClient } from '../utils/client'

export default defineEventHandler(async event => {
  const registerURL = await getKindeClient().register(
    event.context.kinde.sessionManager,
    {
      // TODO: support custom org type, etc.
    }
  )
  await sendRedirect(event, registerURL.href)
})
