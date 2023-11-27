import { useNuxtApp, useRequestEvent } from '#imports'
import type { AuthState } from './types'

export const useAuth = () => {
  return useNuxtApp().$auth as AuthState
}

export const useKindeClient = () => {
  return useRequestEvent()?.context.kinde || null
}
