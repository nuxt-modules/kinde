// @vitest-environment node
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, fetch } from '@nuxt/test-utils/e2e'

describe('nuxt 5', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../fixtures/v5', import.meta.url)),
  })

  it('renders the logged out state', async () => {
    const html = await $fetch<string>('/')
    expect(html).toContain('logged out')
    expect(html).toContain('href="/api/login"')
    expect(html).toContain('href="/api/register?is_create_org=false"')
  })

  it('exposes the kinde context to server routes', async () => {
    expect(await $fetch('/api/me')).toEqual({ authenticated: false })
  })

  it('responds to the health endpoint', async () => {
    expect(await $fetch('/api/health')).toMatchObject({
      apiPath: 'https://example.kinde.com',
      clientID: 'test-client-id',
      redirectURL: 'http://localhost:3000/api/callback',
    })
  })

  it('redirects to kinde to log in', async () => {
    const res = await fetch('/api/login?org_code=123', { redirect: 'manual' })
    expect(res.status).toBe(302)
    const location = new URL(res.headers.get('location')!)
    expect(location.origin + location.pathname).toBe('https://example.kinde.com/oauth2/auth')
    expect(location.searchParams.get('client_id')).toBe('test-client-id')
    expect(location.searchParams.get('org_code')).toBe('123')
    expect(res.headers.getSetCookie().some(cookie => cookie.startsWith('ac-state-key='))).toBe(true)
  })

  it('redirects to kinde to register', async () => {
    const res = await fetch('/api/register', { redirect: 'manual' })
    expect(res.status).toBe(302)
    const location = new URL(res.headers.get('location')!)
    expect(location.origin + location.pathname).toBe('https://example.kinde.com/oauth2/auth')
    expect(location.searchParams.get('start_page')).toBe('registration')
  })

  it('redirects to kinde to log out and clears the session', async () => {
    const res = await fetch('/api/logout', { redirect: 'manual' })
    expect(res.status).toBe(302)
    expect(res.headers.get('location')).toBe('https://example.kinde.com/logout?redirect=http://localhost:3000')
    expect(res.headers.getSetCookie()).toContainEqual(expect.stringMatching(/^access_token=;/))
  })

  it('rejects the callback without a pending login', async () => {
    const res = await fetch('/api/callback', { redirect: 'manual' })
    expect(res.status).toBe(500)
  })

  it('rejects the portal without an active session', async () => {
    const res = await fetch('/api/portal', { redirect: 'manual' })
    expect(res.status).toBe(500)
  })

  it('checks access against route rules', async () => {
    expect(await $fetch('/api/access', { method: 'POST', body: { path: '/public' } })).toEqual({ access: true })
    expect(await $fetch('/api/access', { method: 'POST', body: { path: '/protected' } })).toEqual({
      access: false,
      redirectUrl: '/api/login',
      external: true,
    })
  })

  it('redirects protected pages to log in', async () => {
    const res = await fetch('/protected', { redirect: 'manual' })
    expect(res.status).toBe(302)
    expect(res.headers.get('location')).toBe('/api/login')
  })
})
