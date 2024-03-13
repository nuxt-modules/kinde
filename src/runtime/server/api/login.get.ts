import { defineEventHandler, sendRedirect, getQuery } from 'h3'
import { getKindeClient } from '../utils/client'

export default defineEventHandler(async event => {
  const { kinde: kindeSettings } = useRuntimeConfig()
  const query: Record<string, string> = getQuery(event)
  const loginURL = await getKindeClient().login(event.context.kinde.sessionManager, {
    authUrlParams: {
      audience: kindeSettings.audience,
      ...query
    }
  })
  await sendRedirect(event, loginURL.href)
})
