import {
  defineNuxtPlugin,
  shallowRef,
  useState,
  useRequestEvent,
} from '#imports'
import type { UserType } from '@kinde-oss/kinde-typescript-sdk'

export default defineNuxtPlugin(async () => {
  const state = useState<{ loggedIn: true, user: UserType } | { loggedIn: false, user: null }>('auth', shallowRef)
  if (import.meta.server) {
    const event = useRequestEvent()
    const isLoggedIn = await event.context.kinde.isAuthenticated()

    state.value = {
      loggedIn: isLoggedIn,
      user: isLoggedIn
        ? await event.context.kinde.getUserProfile()
        : null,
    } as { loggedIn: true, user: UserType } | { loggedIn: false, user: null }
  }

  return {
    provide: {
      auth: state.value,
    },
  }
})

