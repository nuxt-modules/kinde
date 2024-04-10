import { defineEventHandler } from 'h3'
import { validateClientSecret } from '@kinde-oss/kinde-typescript-sdk'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(() => {
  const { kinde } = useRuntimeConfig()
  return {
    apiPath: kinde.authDomain,
    redirectURL: kinde.redirectURL,
    postLoginRedirectURL: kinde.postLoginRedirectURL,
    logoutRedirectURL: kinde.logoutRedirectURL,
    clientID: kinde.clientId,
    clientSecret: validateClientSecret(kinde.clientSecret) ? 'Set correctly' : 'Not set correctly',
  }
})
