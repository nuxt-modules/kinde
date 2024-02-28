import { defineEventHandler, sendRedirect } from 'h3'
import { getKindeClient } from '../utils/client'

export default defineEventHandler(async event => {
  const registerURL = await getKindeClient().register(
    event.context.kinde.sessionManager, getQuery(event)
  )
  await sendRedirect(event, registerURL.href)
})
