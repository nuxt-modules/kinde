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
import endpoints from '#build/kinde-routes.config.mjs'
import { NuxtLink } from '#components'

const props = defineProps<AuthURLOptions>()
const href = computed(() => {
  const { authUrlParams, ..._authUrlParams } = props
  return withQuery(endpoints.register, {
    ...authUrlParams,
    ..._authUrlParams,
  })
})
</script>
