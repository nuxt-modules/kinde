import { defineEventHandler, sendRedirect } from 'h3'
import { getKindeClient } from '../utils/client'

export default defineEventHandler(async event => {
  const {org_code, authUrlParams, postLoginRedirectURL} = getQuery(event)

  const registerURL = await getKindeClient().register(
    event.context.kinde.sessionManager,
    {
      org_code: org_code?.toString(),
      authUrlParams: authUrlParams ? JSON.parse(authUrlParams.toString()) : null,
      post_login_redirect_url: postLoginRedirectURL?.toString()
    }
  )
  await sendRedirect(event, registerURL.href)
})
