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
import { computed } from '#imports'

import { generateAuthUrlParams } from '../server/utils/generateAuthUrlParams'

const props = defineProps<LoginURLOptions>()
const href = computed(() => {
  return `/api/login?${generateAuthUrlParams(props)}`
})
</script>
