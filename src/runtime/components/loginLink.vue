<template>
  <NuxtLink
    :href="href"
    external
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from '#imports'
import { generateAuthUrlParams } from '../server/utils/generateAuthUrlParams'
import type { LoginURLOptions } from '@kinde-oss/kinde-typescript-sdk'

const props = defineProps<LoginURLOptions>()
  const href = computed(() => {
    const params = generateAuthUrlParams(props)
    return  `/api/login?${params.toString()}`
  })
</script>
