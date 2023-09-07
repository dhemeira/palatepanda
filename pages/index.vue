<template>
  <div>Kezdőlap</div>
  {{ user?.email }}
  {{ user?.displayName }}
  <button @click="auth.login(config.public.email, config.public.password)">Login</button>

  <NuxtLink to="/receptek">Receptek</NuxtLink>
  <NuxtLink to="/receptek/hU6RkXvWwI64LrT5Y2Pt">Recepthez</NuxtLink>
</template>
<script setup lang="ts">
import settings from '@/appsettings.json';
const user = useCurrentUser();
const auth = useAuth();

const title = 'Kezdőlap';
const description = 'Lakics Péter weboldala.';
const config = useRuntimeConfig();

useServerSeoMeta({
  title: `${title} | ${settings.APP_NAME}`,
  ogTitle: `${title} | ${settings.APP_NAME}`,
  description: description,
  ogDescription: description,
  ogImage: `${settings.APP_URL}/logo.png`,
  robots: 'index, follow',
  ogUrl: `${settings.APP_URL}/`,
});
</script>
