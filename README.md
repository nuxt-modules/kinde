# Nuxt Kinde

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

[Kinde](https://kinde.com/) integration for [Nuxt](https://nuxt.com).

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/nuxt-modules/kinde?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Quick Setup

1. Add `@nuxtjs/kinde` dependency to your project

```bash
# Using pnpm
pnpm add -D @nuxtjs/kinde

# Using yarn
yarn add --dev @nuxtjs/kinde

# Using npm
npm install --save-dev @nuxtjs/kinde
```

2. Add `@nuxtjs/kinde` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ['@nuxtjs/kinde'],
})
```

Add the following configuration to your `.env` file replacing the values in `< >` with your Kinde credentials.

```bash
NUXT_KINDE_AUTH_DOMAIN="https://<your_kinde_subdomain>.kinde.com"
NUXT_KINDE_CLIENT_ID="<your_kinde_client_id>"
NUXT_KINDE_CLIENT_SECRET="<your_kinde_client_secret>"
NUXT_KINDE_REDIRECT_URL="http://localhost:3000/api/callback"
NUXT_KINDE_LOGOUT_REDIRECT_URL="http://localhost:3000"
NUXT_KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/dashboard"
```

That's it! You can now use Nuxt Kinde in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/kinde/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@nuxtjs/kinde
[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/kinde.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/kinde
[license-src]: https://img.shields.io/npm/l/@nuxtjs/kinde.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@nuxtjs/kinde
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
