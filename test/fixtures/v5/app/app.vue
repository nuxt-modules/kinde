<template>
  <div>
    <p>{{ auth.loggedIn ? 'logged in' : 'logged out' }}</p>
    <LoginLink>Sign in</LoginLink>
    <RegisterLink>Sign up</RegisterLink>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const auth = useAuth()
</script>
