<template>
  <NuxtPage />
</template>
<script setup lang="ts">
import settings from '@/appsettings.json';
const router = useRouter();
const route = useRoute();
const user = useCurrentUser();

useHead({
  htmlAttrs: { lang: 'hu' },
  script: [
    {
      src: 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver,ResizeObserver,WebAnimations,Object.fromEntries,Array.prototype.at',
    },
  ],
  link: [
    { rel: 'icon', href: `${settings.APP_URL}/favicon.ico` },
    { rel: 'mask-icon', href: `${settings.APP_URL}/mask-icon.svg`, color: '#FFFFFF' },
    { rel: 'apple-touch-icon', href: `${settings.APP_URL}/apple-touch-icon.png`, sizes: '180x180' },
  ],
});
useServerSeoMeta({
  ogSiteName: settings.APP_NAME,
  ogType: 'website',
  ogLocale: 'hu_HU',
  applicationName: settings.APP_NAME,
  author: 'Lakics Péter',
  themeColor: '#121212',
});
// we don't need this watcher on server
onMounted(() => {
  watch(user, (user, prevUser) => {
    if (prevUser && !user) {
      router.push('/');
    } else if (user && typeof route.query.redirect === 'string') {
      router.push(route.query.redirect);
    }
  });
});
</script>
<style scoped>
.wrapper {
  --padding: 16px;
}

@media only screen and (min-width: 960px) {
  .wrapper {
    --padding: 150px;
  }
}
</style>

