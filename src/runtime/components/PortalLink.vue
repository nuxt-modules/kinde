<template>
  <NuxtLink
    :href="href"
    external
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { GeneratePortalUrlParams } from '@kinde-oss/kinde-typescript-sdk'
import { computed } from 'vue'
import { withQuery } from 'ufo'
import endpoints from '#build/kinde-routes.config.mjs'
import { useRequestURL } from '#imports'

const request = useRequestURL()
const props = defineProps<Partial<Omit<GeneratePortalUrlParams, 'domain'>>>()

const returnUrl = props.returnUrl || request.href
const href = computed(() => {
  return withQuery(endpoints.portal, { ...props, returnUrl })
})
</script>
