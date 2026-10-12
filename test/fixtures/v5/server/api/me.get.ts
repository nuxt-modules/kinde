import { defineEventHandler } from 'nuxt/server'

export default defineEventHandler(async event => ({
  authenticated: await event.context.kinde.isAuthenticated(),
}))
