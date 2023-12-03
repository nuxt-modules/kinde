import {
  defineNuxtPlugin,
  shallowRef,
  useState,
  useRequestEvent,
} from '#imports'
import type { AuthState } from './types'

export default defineNuxtPlugin(async () => {
  const state = useState<AuthState>('auth', shallowRef)
  if (import.meta.server) {
    const event = useRequestEvent()
    const isLoggedIn = await event.context.kinde.isAuthenticated()

    state.value = {
      loggedIn: isLoggedIn,
      user: isLoggedIn
        ? await event.context.kinde.getUserProfile()
        : null,
    }
  }

  return {
    provide: {
      auth: state.value,
    },
  }
})

