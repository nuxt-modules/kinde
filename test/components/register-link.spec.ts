import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, test, expect } from 'vitest'
import { RegisterLink } from '#components'

describe('RegisterLink', () => {
  test('is a Vue instance', async () => {
    const wrapper = await mountSuspended(RegisterLink, {
      slots: {
        default: () => 'Hello',
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('org_code added to URL', async () => {
    const wrapper = await mountSuspended(RegisterLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        org_code: '123',
      },
    })
    expect(wrapper.vm.href).toMatchInlineSnapshot(`"/api/register?org_code=123&is_create_org=false"`)
  })

  test('org_name added to URL', async () => {
    const wrapper = await mountSuspended(RegisterLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        org_name: 'NAME123',
      },
    })
    expect(wrapper.vm.href).toMatchInlineSnapshot(`"/api/register?org_name=NAME123&is_create_org=false"`)
  })

  test('state added to URL', async () => {
    const wrapper = await mountSuspended(RegisterLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        state: 'ASDBED',
      },
    })
    expect(wrapper.vm.href).toMatchInlineSnapshot(`"/api/register?state=ASDBED&is_create_org=false"`)
  })

  test('post_login_redirect_url added to URL', async () => {
    const wrapper = await mountSuspended(RegisterLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        post_login_redirect_url: 'http://example.com/redirect',
      },
    })
    expect(wrapper.vm.href).toMatchInlineSnapshot(`"/api/register?post_login_redirect_url=http:%2F%2Fexample.com%2Fredirect&is_create_org=false"`)
  })

  test('authUrlParams added to URL', async () => {
    const wrapper = await mountSuspended(RegisterLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        authUrlParams: {
          login_hint: 'test@testdomain.com',
        },
      },
    })
    expect(wrapper.vm.href).toMatchInlineSnapshot(`"/api/register?login_hint=test@testdomain.com&is_create_org=false"`)
  })

  test('is_create_org added to URL', async () => {
    const wrapper = await mountSuspended(RegisterLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        is_create_org: true,
      },
    })
    expect(wrapper.vm.href).toMatchInlineSnapshot(`"/api/register?is_create_org=true"`)
  })

  test('start_page added to URL', async () => {
    const wrapper = await mountSuspended(RegisterLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        start_page: 'register',
      },
    })
    expect(wrapper.vm.href).toMatchInlineSnapshot(`"/api/register?start_page=register&is_create_org=false"`)
  })

  test('do not authUrlParams added to URL', async () => {
    const wrapper = await mountSuspended(RegisterLink, {
      slots: {
        default: () => 'Hello',
      },
      props: {
        authUrlParams: {
          login_hint: 'test@testdomain.com',
        },
      },
    })
    expect(wrapper.vm.href.includes('authUrlParams')).toBeFalsy()
  })

  test('slot content rendered', async () => {
    const wrapper = await mountSuspended(RegisterLink, {
      slots: {
        default: () => 'Hello',
      },
    })
    expect(wrapper.element.textContent).toEqual('Hello')
  })
})
