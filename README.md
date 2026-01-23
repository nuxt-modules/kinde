![nuxt-kinde-social-card](https://github.com/nuxt-modules/kinde/assets/904724/b738708c-3d5c-4d72-b233-22488678cb6e)

# Nuxt Kinde

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]
[![nuxt.care health](https://img.shields.io/endpoint?url=https://nuxt.care/api/badge/kinde)](https://nuxt.care/?search=kinde)

[Kinde](https://kinde.com/) integration for [Nuxt](https://nuxt.com).

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/nuxt-modules/kinde?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Quick Setup

1. Add `@nuxtjs/kinde` dependency to your project

```bash
npx nuxi@latest module add kinde
```

2. Add `@nuxtjs/kinde` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ['@nuxtjs/kinde'],
  kinde: {
    // This is true by default and adds 'auth-logged-in' and 'auth-logged-out'
    // middleware to your Nuxt application.
    // 
    // middleware: false,
    //
    // enable the debug `/api/health` endpoint
    // debug: true,
    // 
    // Set custom endpoints in case you use any of the default routes for other purposes
    // endpoints: {
    //   callback: '/api/callback',
    //   login: '/api/login',
    //   register: '/api/register',
    //   health: '/api/health',
    //   logout: '/api/logout'
    //   access: '/api/access'
    //   portal: '/api/portal'
    // }
  }
})
```

Add the following configuration to your `.env` file replacing the values in `< >` with your Kinde credentials.

> **NOTE:** The Nuxt Kinde module requires the back-end web API keys

```bash
NUXT_KINDE_AUDIENCE="https://<your_kinde_subdomain>.kinde.com/api" # if you want to use the Management API
NUXT_KINDE_AUTH_DOMAIN="https://<your_kinde_subdomain>.kinde.com"
NUXT_KINDE_CLIENT_ID="<your_kinde_client_id>"
NUXT_KINDE_CLIENT_SECRET="<your_kinde_client_secret>"
NUXT_KINDE_LOGOUT_REDIRECT_URL="http://localhost:3000"
NUXT_KINDE_REDIRECT_URL="http://localhost:3000/api/callback"
NUXT_KINDE_PASSWORD=<a random password which will be used to encrypt the session cookie>
NUXT_KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/dashboard"
```

You can alternatively set any of these values in your `nuxt.config` file:

```ts
export default defineNuxtConfig({
  kinde: {
    authDomain: 'https://<your_kinde_subdomain>.kinde.com',
    clientId: '<your_kinde_client_id>',
    // You probably don't want to set any of the following directly in your config
    // as they either shouldn't be committed to version control, or are dependent
    // on your environment.
    // 
    // clientSecret: '<your_kinde_client_secret>',
    // redirectURL: 'http://localhost:3000/api/callback',
    // logoutRedirectURL: 'http://localhost:3000',
    // postLoginRedirectURL: 'http://localhost:3000/dashboard',
  }
})
```

That's it! You can now use Nuxt Kinde in your Nuxt app ✨

## Composables

### useAuth

This returns the current auth state, with the following properties.

#### loggedIn

A boolean that indicates if the user is logged in or not.

#### user

The current logged in user state, or null if the user is not logged in.

### useKindeClient

**Server only**. This returns a Kinde client; see [Kinde SDK Documentation](https://kinde.com/docs/developer-tools/typescript-sdk/) for more details.

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm dev:prepare

# Develop with the playground
pnpm dev

# Build the playground
pnpm dev:build

# Run ESLint
pnpm lint

# Run Vitest
pnpm test

# Release new version
pnpm release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/kinde/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@nuxtjs/kinde
[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/kinde.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npm.chart.dev/@nuxtjs/kinde
[license-src]: https://img.shields.io/npm/l/@nuxtjs/kinde.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@nuxtjs/kinde
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
