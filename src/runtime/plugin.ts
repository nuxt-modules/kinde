import {
  defineNuxtPlugin,
  shallowRef,
  useState,
  useRequestEvent,
} from '#imports'

export default defineNuxtPlugin(async () => {
  const state = useState<{ loggedIn: boolean }>(shallowRef)
  if (import.meta.server) {
    const isLoggedIn = await useRequestEvent().context.kinde.isAuthenticated()

    state.value = {
      loggedIn: isLoggedIn,
      user: isLoggedIn
        ? await useRequestEvent().context.kinde.getUserProfile()
        : null,
    }
  }

  return {
    provide: {
      auth: state.value,
    },
  }
})
