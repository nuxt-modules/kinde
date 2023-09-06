import { Session } from "inspector"
import { H3Event } from 'h3'

export default defineEventHandler(async event => {
  event.context.kinde = {
    sessionManager: await createSessionManager(event)
  }
})

interface SessionManager {
  getSessionItem: (itemKey: string) => unknown | null;
  setSessionItem: (itemKey: string, itemValue: unknown) => void;
  removeSessionItem: (itemKey: string) => void;
  destroySession: () => void;
}

async function createSessionManager(event: H3Event): Promise<SessionManager> {
  const config = { name: 'kinde', password: 'slkdaslkdjfskldafjaslkdjfasldkfjsdf' }
  const session = await getSession(event, config)
  console.log(session.data)
  return {
    getSessionItem: (itemKey) => {
      return session.data[itemKey]
    },
    setSessionItem: (itemKey, itemValue) => {
      return updateSession(event, config, {
        [itemKey]: itemValue
      })
    },
    removeSessionItem: (itemKey) => {
      return updateSession(event, config, {
        [itemKey]: undefined
      })
    },
    destroySession: () => {
      return clearSession(event, config)
    },
  }
}
