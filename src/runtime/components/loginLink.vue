<template>
  <NuxtLink
    :href="href"
    external
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { generateAuthUrlParams } from '../server/utils/generateAuthUrlParams'
import type { LoginURLOptions } from '@kinde-oss/kinde-typescript-sdk'

const props = defineProps<LoginURLOptions>()
const href = computed(() => {
  return `/api/login?${generateAuthUrlParams(props)}`
})
</script>
