import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, test, expect } from 'vitest'
import loginLink from '../../src/runtime/components/loginLink.vue'

describe('loginLink', () => {
  test('is a Vue instance', async () => {
    const wrapper = await mountSuspended(loginLink, {
      slots: {
        default: () => 'Hello'
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('org_code added to URL', async () => {
    const wrapper = await mountSuspended(loginLink, {
      slots: {
        default: () => 'Hello'
      },
      props: {
        org_code: '123'
      }
    })
    expect(wrapper.vm.href).toMatch('org_code=123')
  })

  test('org_name added to URL', async () => {
    const wrapper = await mountSuspended(loginLink, {
      slots: {
        default: () => 'Hello'
      },
      props: {
        org_name: 'NAME123'
      }
    })
    expect(wrapper.vm.href).toMatch('org_name=NAME123')
  })

  test('state added to URL', async () => {
    const wrapper = await mountSuspended(loginLink, {
      slots: {
        default: () => 'Hello'
      },
      props: {
        state: 'ASDBED'
      }
    })
    expect(wrapper.vm.href).toMatch('state=ASDBED')
  })

  test('post_login_redirect_url added to URL', async () => {
    const wrapper = await mountSuspended(loginLink, {
      slots: {
        default: () => 'Hello'
      },
      props: {
        post_login_redirect_url: 'http://example.com/redirect'
      }
    })
    expect(wrapper.vm.href).toMatch('post_login_redirect_url=http%3A%2F%2Fexample.com%2Fredirect')
  })

  test('authUrlParams added to URL', async () => {
    const wrapper = await mountSuspended(loginLink, {
      slots: {
        default: () => 'Hello'
      },
      props: {
        authUrlParams: {
          login_hint: 'test@testdomain.com'
        }
      }
    })
    expect(wrapper.vm.href).toMatch('login_hint=test%40testdomain.com')
  })

  test('do not authUrlParams added to URL', async () => {
    const wrapper = await mountSuspended(loginLink, {
      slots: {
        default: () => 'Hello'
      },
      props: {
        authUrlParams: {
          login_hint: 'test@testdomain.com'
        }
      }
    })
    expect(wrapper.vm.href.includes('authUrlParams')).toBeFalsy()
  })

  test('slot content rendered', async () => {
    const wrapper = await mountSuspended(loginLink, {
      slots: {
        default: () => 'Hello'
      }
    })
    expect(wrapper.element.textContent).toEqual('Hello')
  })
})
