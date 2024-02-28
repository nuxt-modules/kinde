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
import type { AuthURLOptions } from '@kinde-oss/kinde-typescript-sdk'

const props = defineProps<AuthURLOptions>()
const href = computed(() => {
  return  `/api/register?${generateAuthUrlParams(props)}`
})
</script>
