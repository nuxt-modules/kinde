<template>
  <div>
    <p>Logged in: {{ auth.loggedIn }}</p>
    <p>Server context: {{ me }}</p>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth()
const { data: me } = await useFetch('/api/me')
</script>
