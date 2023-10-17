import {
  createKindeServerClient,
  GrantType,
} from '@kinde-oss/kinde-typescript-sdk'
import type { ACClientOptions } from '@kinde-oss/kinde-typescript-sdk'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

const clientOptions: ACClientOptions = {
  authDomain: config.kinde.authDomain,
  clientId: config.kinde.clientId,
  clientSecret: config.kinde.clientSecret,
  logoutRedirectURL: config.kinde.logoutRedirectURL,
  redirectURL: config.kinde.redirectURL,
}

export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  clientOptions
)
