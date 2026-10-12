<template>
  <header>
    <nav>
      <NuxtLink to="/">
        Kinde x Nuxt 5
      </NuxtLink>
      <template v-if="auth.loggedIn">
        <span>{{ auth.user?.given_name }} {{ auth.user?.family_name }}</span>
        <NuxtLink to="/dashboard">
          Dashboard
        </NuxtLink>
        <NuxtLink to="/public">
          Public
        </NuxtLink>
        <PortalLink>Account</PortalLink>
        <NuxtLink
          to="/api/logout"
          external
        >
          Log out
        </NuxtLink>
      </template>
      <template v-else>
        <LoginLink>Sign in</LoginLink>
        <RegisterLink is_create_org>
          Sign up
        </RegisterLink>
      </template>
      <NuxtLink
        to="/api/health"
        external
      >
        Health
      </NuxtLink>
    </nav>
  </header>
  <main>
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
const auth = useAuth()
</script>
