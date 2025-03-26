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
import endpoints from '#build/kinde-routes.config.mjs'
import { NuxtLink } from '#components'

const props = defineProps<LoginURLOptions>()
const href = computed(() => {
  const { authUrlParams, ..._authUrlParams } = props
  return withQuery(endpoints.login, {
    ...authUrlParams,
    ..._authUrlParams,
  })
})
</script>
