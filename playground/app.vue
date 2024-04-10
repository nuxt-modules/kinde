<template>
  <header>
    <nav class="nav container">
      <h1 class="text-display-3">
        Kinde x Nuxt
      </h1>
      <div v-if="auth.loggedIn">
        <div class="profile-blob">
          <img
            v-if="auth.user.picture"
            class="avatar"
            :src="auth.user.picture"
            alt="user profile avatar"
            referrerPolicy="no-referrer"
          >
          <div
            v-else
            class="avatar"
          >
            {{ auth.user?.given_name?.[0] }} {{ auth.user?.family_name?.[0] }}
          </div>

          <div>
            <p class="text-heading-2">
              {{ auth.user?.given_name }} {{ auth.user?.family_name }}
            </p>

            <NuxtLink
              class="text-subtle"
              to="/api/logout"
              external
            >
              Log out
            </NuxtLink>
          </div>
        </div>
      </div>
      <div v-else>
        <LoginLink
          class="btn btn-ghost sign-in-btn"
        >
          Sign in
        </LoginLink>
        <RegisterLink
          class="btn btn-dark"
          is_create_org
        >
          Sign up
        </RegisterLink>
      </div>
    </nav>
  </header>
  <main><NuxtPage /></main>
  <footer class="footer">
    <div class="container">
      <strong class="text-heading-2">Kinde x Nuxt</strong>
      <p class="footer-tagline text-body-3">
        Visit our
        <NuxtLink
          class="link"
          to="https://kinde.com/docs"
          external
        >
          help center
        </NuxtLink>
      </p>

      <small class="text-subtle">© 2023 Kinde, Inc. All rights reserved</small>
    </div>
  </footer>
</template>

<script setup lang="ts">
import '~/assets/css/globals.css'

const auth = useAuth()
</script>
