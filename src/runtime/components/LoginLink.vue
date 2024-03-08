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

const props = defineProps<LoginURLOptions>()
const href = computed(() => {
  const { authUrlParams } = props
  return withQuery('/api/login', authUrlParams || {})
})
</script>
