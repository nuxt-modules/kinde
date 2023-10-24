import {
  addServerHandler,
  defineNuxtModule,
  addPlugin,
  createResolver,
  addRouteMiddleware,
  addTemplate,
} from '@nuxt/kit'
import { defu } from 'defu'
import { version } from '../package.json'

// Module options TypeScript interface definition
export interface ModuleOptions {
  middleware?: boolean
  handlers?: {
    callback?: string
    login?: string
    logout?: string
    register?: string
  }
  authDomain?: string
  clientId?: string
  redirectURL?: string
  logoutRedirectURL?: string
  postLoginRedirectURL?: string
}

const resolver = createResolver(import.meta.url)
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/kinde',
    configKey: 'kinde',
    version
  },
  // Default configuration options of the Nuxt module
  defaults: {
    middleware: true,
    authDomain: '',
    clientId: '',
    redirectURL: '',
    logoutRedirectURL: '',
    postLoginRedirectURL: '',
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.kinde = defu(nuxt.options.runtimeConfig.kinde, {
      authDomain: options.authDomain,
      clientId: options.clientId,
      redirectURL: options.redirectURL,
      logoutRedirectURL: options.logoutRedirectURL,
      postLoginRedirectURL: options.postLoginRedirectURL,
      clientSecret: '',
    })

    nuxt.options.nitro.virtual ||= {}
    nuxt.options.nitro.virtual['kinde-version.mjs'] = () => `export const version = '${version}'`,

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    addServerHandler({
      middleware: true,
      handler: resolver.resolve('./runtime/server/middleware/kinde'),
    })

    addServerHandler({
      route: '/api/callback',
      handler:
        options.handlers?.callback ||
        resolver.resolve('./runtime/server/api/callback.get'),
    })
    addServerHandler({
      route: '/api/login',
      handler:
        options.handlers?.login ||
        resolver.resolve('./runtime/server/api/login.get'),
    })
    addServerHandler({
      route: '/api/register',
      handler:
        options.handlers?.register ||
        resolver.resolve('./runtime/server/api/register.get'),
    })
    addServerHandler({
      route: '/api/logout',
      handler:
        options.handlers?.logout ||
        resolver.resolve('./runtime/server/api/logout.get'),
    })

    if (options.middleware) {
      addRouteMiddleware({
        name: 'auth-logged-in',
        path: resolver.resolve('./runtime/middleware/auth-logged-in'),
      })
      addRouteMiddleware({
        name: 'auth-logged-out',
        path: resolver.resolve('./runtime/middleware/auth-logged-out'),
      })
    }
  },
})
