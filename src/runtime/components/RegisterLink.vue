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
import apiRoutes from '#build/kinde-routes.config.mjs'

const props = defineProps<AuthURLOptions>()
const href = computed(() => {
  const { authUrlParams, ..._authUrlParams } = props
  return withQuery(apiRoutes.register, {
    ...authUrlParams,
    ..._authUrlParams,
  })
})
</script>
