import { useNuxtApp } from '#imports'
import type { AuthState } from './types'

export const useAuth = () => {
  return useNuxtApp().$auth as AuthState
}

