import {
  addServerHandler,
  defineNuxtModule,
  addPlugin,
  createResolver,
  addRouteMiddleware,
  addImports,
  addComponent,
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
    health?: string
  }
  authDomain?: string
  clientId?: string
  clientSecret?: string
  redirectURL?: string
  logoutRedirectURL?: string
  postLoginRedirectURL?: string
  debug?: boolean
}

const resolver = createResolver(import.meta.url)
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/kinde',
    configKey: 'kinde',
    version
  },
  // Default configuration options of the Nuxt module
  defaults: nuxt => ({
    middleware: true,
    authDomain: '',
    clientId: '',
    clientSecret: '',
    redirectURL: '',
    logoutRedirectURL: '',
    postLoginRedirectURL: '',
    debug: nuxt.options.dev || nuxt.options.debug,
  }),
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.kinde = defu(nuxt.options.runtimeConfig.kinde, {
      authDomain: options.authDomain,
      clientId: options.clientId,
      redirectURL: options.redirectURL,
      logoutRedirectURL: options.logoutRedirectURL,
      postLoginRedirectURL: options.postLoginRedirectURL,
      clientSecret: options.clientSecret,
    })

    nuxt.options.nitro.virtual ||= {}
    nuxt.options.nitro.virtual['kinde-version.mjs'] = () => `export const version = '${version}'`,

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    // Server endpoints
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

    if (options.debug) {
      addServerHandler({
        route: '/api/health',
        handler:
          options.handlers?.health ||
          resolver.resolve('./runtime/server/api/health.get'),
      })
    }

    addServerHandler({
      route: '/api/logout',
      handler:
        options.handlers?.logout ||
        resolver.resolve('./runtime/server/api/logout.get'),
    })

    // Composables
    addImports({ name: 'useAuth', as: 'useAuth', from: resolver.resolve('./runtime/composables') })
    addImports({ name: 'useKindeClient', as: 'useKindeClient', from: resolver.resolve('./runtime/composables') })

    // Middleware
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

    addComponent({
      name: 'LoginLink',
      filePath: resolver.resolve('./runtime/components/LoginLink'),
    })

    addComponent({
      name: 'RegisterLink',
      filePath: resolver.resolve('./runtime/components/RegisterLink'),
    })
  },
})

