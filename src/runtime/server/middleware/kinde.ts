import type { H3Event, SessionConfig } from 'h3'
import type { ACClient, SessionManager } from '@kinde-oss/kinde-typescript-sdk'
import type { CookieSerializeOptions } from 'cookie-es'
import { defineEventHandler } from 'h3'

import { getKindeClient } from '../utils/client'
import { getSession, updateSession, clearSession, useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const sessionManager = await createSessionManager(event)
  const kindeContext = { sessionManager } as Record<string, unknown>
  const kindeClient = getKindeClient()
  for (const _key in kindeClient) {
    const key = _key as keyof typeof kindeClient
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kindeContext[key] = (kindeClient[key] as any).bind(kindeClient, sessionManager)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event.context.kinde = kindeContext as any
})

async function createSessionManager(event: H3Event): Promise<SessionManager> {
  // TODO: improve memory session in future
  const keysInCookie = ['refresh_token', 'access_token', 'id_token', 'ac-state-key', 'post-login-redirect-url']
  const memorySession: Record<(typeof keysInCookie)[number], unknown> = {}

  const config = useRuntimeConfig(event)
  const sessionConfig = {
    name: 'kinde',
    cookie: config.kinde.cookie as CookieSerializeOptions,
    password: config.kinde.password,
  } satisfies SessionConfig

  return {
    async getSessionItem(itemKey) {
      const session = await getSession(event, sessionConfig)
      return session.data[itemKey] || memorySession[itemKey]
    },
    async setSessionItem(itemKey, itemValue) {
      if (keysInCookie.includes(itemKey)) {
        await updateSession(event, sessionConfig, {
          [itemKey]: itemValue,
        })
      }
      else {
        memorySession[itemKey] = itemValue
      }
    },
    async removeSessionItem(itemKey) {
      if (keysInCookie.includes(itemKey)) {
        await updateSession(event, sessionConfig, {
          [itemKey]: undefined,
        })
      }
      else {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete memorySession[itemKey]
      }
    },
    async destroySession() {
      for (const key in memorySession) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete memorySession[key]
      }
      await clearSession(event, sessionConfig)
    },
  }
}

type Slice<T extends Array<unknown>> = T extends [infer _A, ...infer B] ? B : never

declare module 'h3' {
  interface H3EventContext {
    kinde: {
      [key in keyof ACClient]: (
        ...args: Slice<Parameters<ACClient[key]>>
      ) => ReturnType<ACClient[key]>
    } & { sessionManager: SessionManager }
  }
}
