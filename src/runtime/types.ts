import type { UserType } from '@kinde-oss/kinde-typescript-sdk'

export type AuthState =
  { loggedIn: true, user: UserType } |
  { loggedIn: false, user: null }

export type AccessResponse = {
  access: boolean
  redirectUrl?: string
}
