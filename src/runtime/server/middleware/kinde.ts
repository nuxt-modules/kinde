import type { H3Event } from 'h3'
import type { ACClient, SessionManager } from '@kinde-oss/kinde-typescript-sdk'
import { defineEventHandler } from 'h3'
import { getKindeClient } from '../utils/client'

const SESSIONCOOKIE = 'sessionManager'
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

  const cookiePayload = getCookie(event, SESSIONCOOKIE)
  const session: any = cookiePayload ? JSON.parse(cookiePayload) : {}

  return {
    async getSessionItem(itemKey) {
      return session[itemKey] || memorySession[itemKey]
    },
    async setSessionItem(itemKey, itemValue) {
      if (keysInCookie.includes(itemKey)) {
        session[itemKey] = itemValue
        setCookie(event, SESSIONCOOKIE, JSON.stringify(session))
      } else {
        memorySession[itemKey] = itemValue
      }
    },
    async removeSessionItem(itemKey) {
      if (keysInCookie.includes(itemKey)) {
        delete session[itemKey]
        setCookie(event, SESSIONCOOKIE, JSON.stringify(session))
      } else {
        delete memorySession[itemKey]
      }
    },
    async destroySession() {
      deleteCookie(event, SESSIONCOOKIE)
      for (const key in memorySession) {
        delete memorySession[key]
      }
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
