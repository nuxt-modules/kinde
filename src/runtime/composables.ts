import type { KindeContext } from './server/middleware/kinde'
import type { AuthState } from './types'
import { useNuxtApp, useRequestEvent } from '#imports'

export const useAuth = () => {
  return useNuxtApp().$auth as AuthState
}

export const useKindeClient = (): KindeContext | null => {
  return useRequestEvent()?.context.kinde || null
}
