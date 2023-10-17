<template>
  <div>
    <NuxtLink href="/api/logout" external> Logout </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth-logged-in'],
})
</script>
