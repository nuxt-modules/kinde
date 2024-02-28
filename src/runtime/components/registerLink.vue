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
import type { AuthURLOptions } from '@kinde-oss/kinde-typescript-sdk'

const props = defineProps<AuthURLOptions>()
  const href = computed(() => {
    const params = generateAuthUrlParams(props)
    return  `/api/register?${params.toString()}`
  })
</script>
