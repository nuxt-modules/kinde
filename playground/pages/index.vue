<template>
  <div>
    <NuxtLink href="/login"> To login page </NuxtLink>
    <NuxtLink href="/logout"> To logout page </NuxtLink>
    <pre>
      {{ $auth.loggedIn }}
    </pre>
  </div>
</template>
