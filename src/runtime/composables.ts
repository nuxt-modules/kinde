import type { AuthState } from './types'
import { useNuxtApp, useRequestEvent } from '#imports'

export const useAuth = () => {
  return useNuxtApp().$auth as AuthState
}

export const useKindeClient = () => {
  return useRequestEvent()?.context.kinde || null
}
