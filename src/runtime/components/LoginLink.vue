<template>
  <NuxtLink
    :href="href"
    external
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { LoginURLOptions } from '@kinde-oss/kinde-typescript-sdk'
import { computed } from 'vue'
import { withQuery } from 'ufo'
import { useRuntimeConfig } from '#app'

const props = defineProps<LoginURLOptions>()
const href = computed(() => {
  const { authUrlParams, ..._authUrlParams } = props
  return withQuery(useRuntimeConfig().kinde.apiRoutes.login || '/api/login', {
    ...authUrlParams,
    ..._authUrlParams,
  })
})
</script>
