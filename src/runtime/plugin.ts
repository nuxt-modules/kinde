import {
  defineNuxtPlugin,
  shallowRef,
  useState,
  useRequestEvent,
} from '#imports'

export default defineNuxtPlugin(async () => {
  const state = useState<{ loggedIn: boolean }>(shallowRef)
  if (import.meta.server) {
    state.value = {
      loggedIn: await useRequestEvent().context.kinde.isAuthenticated(),
    }
  }

  return {
    provide: {
      auth: state.value,
    },
  }
})
