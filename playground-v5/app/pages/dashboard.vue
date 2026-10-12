<template>
  <div>
    <p>Logged in user permissions: {{ permissions }}</p>
  </div>
</template>

<script setup lang="ts">
const client = useKindeClient()

const { data: permissions } = await useAsyncData(async () => {
  const { permissions } = await client?.getPermissions() ?? {}
  return permissions
})
</script>
