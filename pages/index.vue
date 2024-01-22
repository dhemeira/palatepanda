<template>
  <ViewWrapper
    :class="['flex', 'items-center', 'flex-col', 'md:flex-row', 'justify-center', 'gap-8']">
    <div :class="['w-1/2', 'hidden', 'md:flex', 'justify-end', 'items-center']">
      <SvgsHomeSvg
        style="height: 600px; max-height: calc(100vh - 56px - 32px); min-height: 450px" />
    </div>
    <div :class="[device.isMobileOrTablet ? 'w-full' : 'w-1/2']">
      <LazyHomepageLoginForm v-if="!user" />
      <LazyHomepageLoginWelcome v-if="user" />
    </div>
  </ViewWrapper>
</template>
<script setup lang="ts">
import settings from '@/appsettings.json';
const user = useCurrentUser();

const device = useDevice();

const title = 'Kezdőlap';
const description = 'Lakics Péter weboldala.';

useSeoMeta({
  title: () => `${title}`,
  ogTitle: () => `${title} | ${settings.APP_NAME}`,
  description: description,
  ogDescription: description,
  ogImage: `${settings.APP_URL}/logo.png`,
  robots: 'index, follow',
});
</script>
