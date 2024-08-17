<template>
  <NuxtLink
    :href="href"
    external
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { AuthURLOptions } from '@kinde-oss/kinde-typescript-sdk'
import { computed } from 'vue'
import { withQuery } from 'ufo'
import { useRuntimeConfig } from '#app'

const props = defineProps<AuthURLOptions>()
const href = computed(() => {
  const { authUrlParams, ..._authUrlParams } = props
  return withQuery(useRuntimeConfig().kinde.apiRoutes.register || '/api/register', {
    ...authUrlParams,
    ..._authUrlParams,
  })
})
</script>
