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

const props = defineProps<AuthURLOptions>()
const href = computed(() => {
  const { authUrlParams, ...rest } = props
  return withQuery('/api/register', {...authUrlParams, ...rest} || {})
})
</script>
