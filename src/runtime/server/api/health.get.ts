import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(() => {
  const { kinde } = useRuntimeConfig()
  return {
    apiPath: kinde.authDomain,
    redirectURL: kinde.redirectURL,
    postLoginRedirectURL: kinde.postLoginRedirectURL,
    logoutRedirectURL: kinde.logoutRedirectURL,
    clientID: kinde.clientId,
    clientSecret: kinde.clientSecret.match('[a-z0-9]{50}') ? 'Set correctly' : 'Not set correctly',
  };
})
