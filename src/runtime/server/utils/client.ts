import {
  createKindeServerClient,
  GrantType,
} from '@kinde-oss/kinde-typescript-sdk'
import type { ACClient } from '@kinde-oss/kinde-typescript-sdk'
import { useRuntimeConfig } from '#imports'

let kindeClient: ACClient

export const getKindeClient = () => {
  if (kindeClient) return kindeClient

  const config = useRuntimeConfig()
  kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
    authDomain: config.kinde.authDomain,
    clientId: config.kinde.clientId,
    clientSecret: config.kinde.clientSecret,
    logoutRedirectURL: config.kinde.logoutRedirectURL,
    redirectURL: config.kinde.redirectURL,
    framework: 'Nuxt',
    frameworkVersion: '0.1.0',
  })

  return kindeClient
}
