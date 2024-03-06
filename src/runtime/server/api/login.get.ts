import { defineEventHandler, sendRedirect, getQuery } from 'h3'
import { getKindeClient } from '../utils/client'

export default defineEventHandler(async event => {
  const loginURL = await getKindeClient().login(event.context.kinde.sessionManager, getQuery(event))
  await sendRedirect(event, loginURL.href)
})
