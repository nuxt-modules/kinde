import type { H3Event } from 'h3'
import type { ACClient, SessionManager } from '@kinde-oss/kinde-typescript-sdk'
import { defineEventHandler } from 'h3'
import { getKindeClient } from '../utils/client'
import { getSession, updateSession, clearSession } from '#imports'

export default defineEventHandler(async event => {
  const sessionManager = await createSessionManager(event)
  event.context.kinde = { sessionManager }
  const kindeClient = getKindeClient()
  for (const key in kindeClient) {
    event.context.kinde[key] = kindeClient[key].bind(
      kindeClient,
      sessionManager
    )
  }
})

async function createSessionManager(event: H3Event): Promise<SessionManager> {
  // TODO: improve memory session in future
  const keysInCookie = ['refresh_token', 'access_token', 'ac-state-key']
  const memorySession: Record<(typeof keysInCookie)[number], unknown> = {}
  const config = {
    name: 'kinde',
    password: 'slkdaslkdjfskldafjaslkdjfasldkfjsdf',
  }
  return {
    async getSessionItem(itemKey) {
      const session = await getSession(event, config)
      return session.data[itemKey] || memorySession[itemKey]
    },
    async setSessionItem(itemKey, itemValue) {
      if (keysInCookie.includes(itemKey)) {
        await updateSession(event, config, {
          [itemKey]: itemValue,
        })
      } else {
        memorySession[itemKey] = itemValue
      }
    },
    async removeSessionItem(itemKey) {
      if (keysInCookie.includes(itemKey)) {
        await updateSession(event, config, {
          [itemKey]: undefined,
        })
      } else {
        delete memorySession[itemKey]
      }
    },
    async destroySession() {
      for (const key in memorySession) {
        delete memorySession[key]
      }
      await clearSession(event, config)
    },
  }
}

type Slice<T extends Array<any>> = T extends [infer _A, ...infer B] ? B : never

declare module 'h3' {
  interface H3EventContext {
    kinde: {
      [key in keyof ACClient]: (
        ...args: Slice<Parameters<ACClient[key]>>
      ) => ReturnType<ACClient[key]>
    } & { sessionManager: SessionManager }
  }
}
