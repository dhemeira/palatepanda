<template>
  <div class="text-4xl">Receptek</div>

  <NuxtLink to="/receptek/hU6RkXvWwI64LrT5Y2Pt">Recepthez</NuxtLink>
  <button @click="auth.logout">Logout</button>
</template>
<script setup lang="ts">
import { useAuth } from '@/composables/auth';
import settings from '@/appsettings.json';
const auth = useAuth();
definePageMeta({
  middleware: ['auth'],
});

const title = 'Receptek';
const description = 'Receptek megtekintése. Lakics Péter weboldala.';
useServerSeoMeta({
  title: `${title} | ${settings.APP_NAME}`,
  ogTitle: `${title} | ${settings.APP_NAME}`,
  description: description,
  ogDescription: description,
  ogImage: `${settings.APP_URL}/logo.png`,
  robots: 'index, nofollow',
  ogUrl: `${settings.APP_URL}/`,
});
</script>
