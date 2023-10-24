import { createKindeServerClient, GrantType } from '@kinde-oss/kinde-typescript-sdk'
import type { ACClient } from '@kinde-oss/kinde-typescript-sdk'
import { useRuntimeConfig } from '#imports'

// @ts-expect-error virtual file
import { version as frameworkVersion } from 'kinde-version.mjs'

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
    frameworkVersion,
  })

  return kindeClient
}
