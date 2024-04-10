import { randomUUID } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'

import { addServerHandler, defineNuxtModule, addPlugin, createResolver, addRouteMiddleware, addImports, addComponent, addTypeTemplate } from '@nuxt/kit'
import { defu } from 'defu'
import type { CookieSerializeOptions } from 'cookie-es'
import { join } from 'pathe'

import { version } from '../package.json'

// Module options TypeScript interface definition
export interface ModuleOptions {
  password: string
  cookie: Partial<CookieSerializeOptions>
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
  audience?: string
  debug?: boolean
}

const resolver = createResolver(import.meta.url)
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/kinde',
    configKey: 'kinde',
    version,
  },
  // Default configuration options of the Nuxt module
  defaults: nuxt => ({
    password: process.env.NUXT_KINDE_PASSWORD || '',
    cookie: {
      sameSite: 'lax',
      secure: !nuxt.options.dev,
      httpOnly: true,
    },
    middleware: true,
    authDomain: '',
    clientId: '',
    clientSecret: '',
    redirectURL: '',
    logoutRedirectURL: '',
    postLoginRedirectURL: '',
    audience: '',
    debug: nuxt.options.dev || nuxt.options.debug,
  }),
  async setup(options, nuxt) {
    nuxt.options.runtimeConfig.kinde = defu(nuxt.options.runtimeConfig.kinde, {
      password: options.password,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cookie: options.cookie as any,
      authDomain: options.authDomain,
      clientId: options.clientId,
      redirectURL: options.redirectURL,
      logoutRedirectURL: options.logoutRedirectURL,
      postLoginRedirectURL: options.postLoginRedirectURL,
      clientSecret: options.clientSecret,
      audience: options.audience,
    })

    // https://github.com/Atinux/nuxt-auth-utils/blob/main/src/module.ts#L71-L80
    if (nuxt.options.dev && !nuxt.options.runtimeConfig.kinde.password) {
      nuxt.options.runtimeConfig.kinde.password = randomUUID().replace(/-/g, '')
      // Add it to .env
      const envPath = join(nuxt.options.rootDir, '.env')
      const envContent = await readFile(envPath, 'utf-8').catch(() => '')
      if (!envContent.includes('NUXT_KINDE_PASSWORD')) {
        await writeFile(envPath, `${envContent ? envContent + '\n' : envContent}NUXT_KINDE_PASSWORD=${nuxt.options.runtimeConfig.kinde.password}`, 'utf-8')
      }
    }

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
        options.handlers?.callback
        || resolver.resolve('./runtime/server/api/callback.get'),
    })
    addServerHandler({
      route: '/api/login',
      handler:
        options.handlers?.login
        || resolver.resolve('./runtime/server/api/login.get'),
    })
    addServerHandler({
      route: '/api/register',
      handler:
        options.handlers?.register
        || resolver.resolve('./runtime/server/api/register.get'),
    })

    if (options.debug) {
      addServerHandler({
        route: '/api/health',
        handler:
          options.handlers?.health
          || resolver.resolve('./runtime/server/api/health.get'),
      })
    }

    addServerHandler({
      route: '/api/logout',
      handler:
        options.handlers?.logout
        || resolver.resolve('./runtime/server/api/logout.get'),
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

    addTypeTemplate({
      filename: `module/nuxt-kinde.d.ts`,
      getContents: () => {
        return `
      declare module 'nitropack' {
        interface NitroRouteRules {
          kinde?: import('module/nuxt-kinde.d.ts').KindeRouteRules
        }
        interface NitroRouteConfig {
          kinde?: import('module/nuxt-kinde.d.ts').KindeRouteRules
        }
      }
      `
      },
    })
  },
})
