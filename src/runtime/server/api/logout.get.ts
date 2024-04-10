import { defineEventHandler, sendRedirect } from 'h3'
import { getKindeClient } from '../utils/client'

export default defineEventHandler(async (event) => {
  const logoutURL = await getKindeClient().logout(
    event.context.kinde!.sessionManager,
  )
  await sendRedirect(event, logoutURL.href)
})
