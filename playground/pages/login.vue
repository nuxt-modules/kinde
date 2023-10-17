<template>
  <div>
    <NuxtLink href="/api/login" external> Login </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth-logged-out'],
})
</script>
