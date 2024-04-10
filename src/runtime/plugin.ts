// TODO: fix issue in `mkdist`
import type { Plugin } from 'nuxt/app'
import type { AuthState } from './types'
import { defineNuxtPlugin, shallowRef, useState, useRequestEvent } from '#imports'

export default defineNuxtPlugin(async () => {
  const state = useState<AuthState>('auth', shallowRef)
  if (import.meta.server) {
    const kinde = useRequestEvent()!.context.kinde
    const isLoggedIn = await kinde.isAuthenticated()
    state.value = isLoggedIn
      ? { loggedIn: true, user: await kinde.getUserProfile() }
      : { loggedIn: false, user: null }
  }

  return {
    provide: {
      auth: state.value,
    },
  }
}) as Plugin<{ auth: AuthState }>
