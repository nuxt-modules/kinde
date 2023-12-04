import type { UserType } from '@kinde-oss/kinde-typescript-sdk'

export type AuthState = {
  loggedIn: boolean;
  user: UserType | null
}

