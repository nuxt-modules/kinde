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
import { computed } from '#imports'

import { generateAuthUrlParams } from '../server/utils/generateAuthUrlParams'

const props = defineProps<AuthURLOptions>()
const href = computed(() => {
  return  `/api/register?${generateAuthUrlParams(props)}`
})
</script>
