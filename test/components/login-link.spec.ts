import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, test, expect } from 'vitest'
import { LoginLink } from '#components'

describe('LoginLink', () => {
  test('is a Vue instance', async () => {
    const wrapper = await mountSuspended(LoginLink, {
      slots: {
        default: () => 'Hello',
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('org_code added to URL', async () => {
    const wrapper = await mountSuspended(LoginLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        org_code: '123',
      },
    })
    // @ts-expect-error href is not exposed in the types
    expect(wrapper.vm.href).toMatchInlineSnapshot(`"/api/login?org_code=123"`)
  })

  test('org_name added to URL', async () => {
    const wrapper = await mountSuspended(LoginLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        org_name: 'NAME123',
      },
    })
    // @ts-expect-error href is not exposed in the types
    expect(wrapper.vm.href).toMatchInlineSnapshot(`"/api/login?org_name=NAME123"`)
  })

  test('state added to URL', async () => {
    const wrapper = await mountSuspended(LoginLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        state: 'ASDBED',
      },
    })
    // @ts-expect-error href is not exposed in the types
    expect(wrapper.vm.href).toMatchInlineSnapshot(`"/api/login?state=ASDBED"`)
  })

  test('post_login_redirect_url added to URL', async () => {
    const wrapper = await mountSuspended(LoginLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        post_login_redirect_url: 'http://example.com/redirect',
      },
    })
    // @ts-expect-error href is not exposed in the types
    expect(wrapper.vm.href).toMatchInlineSnapshot(`"/api/login?post_login_redirect_url=http:%2F%2Fexample.com%2Fredirect"`)
  })

  test('authUrlParams added to URL', async () => {
    const wrapper = await mountSuspended(LoginLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        authUrlParams: {
          login_hint: 'test@testdomain.com',
        },
      },
    })
    // @ts-expect-error href is not exposed in the types
    expect(wrapper.vm.href).toMatchInlineSnapshot(`"/api/login?login_hint=test@testdomain.com"`)
  })

  test('authUrlParams added to URL', async () => {
    const wrapper = await mountSuspended(LoginLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        authUrlParams: {
          connection_id: 'conn_1234',
        },
      },
    })
    // @ts-expect-error href is not exposed in the types
    expect(wrapper.vm.href).toMatchInlineSnapshot(`"/api/login?connection_id=conn_1234"`)
  })

  test('do not authUrlParams added to URL', async () => {
    const wrapper = await mountSuspended(LoginLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        authUrlParams: {
          login_hint: 'test@testdomain.com',
        },
      },
    })
    // @ts-expect-error href is not exposed in the types
    expect(wrapper.vm.href.includes('authUrlParams')).toBeFalsy()
  })

  test('slot content rendered', async () => {
    const wrapper = await mountSuspended(LoginLink, {
      slots: {
        default: () => 'Hello',
      },
    })
    expect(wrapper.element.textContent).toEqual('Hello')
  })
})
