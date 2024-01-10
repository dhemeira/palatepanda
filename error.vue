<template>
  <NuxtLayout>
    <ViewWrapper
      :class="['flex', 'items-center', 'flex-col', 'md:flex-row', 'justify-center', 'gap-8']">
      <SvgsErrorSvg
        style="width: clamp(18.125rem, 14.671rem + 18.421vw, 31.25rem)"
        aria-label="404" />
      <div
        style="max-width: 100%; width: 24rem"
        class="text-center md:text-left">
        <h1
          :class="['my-2', 'text-3xl', 'font-bold']"
          style="word-break: break-word">
          {{
            (error?.statusMessage as string).replace('Page not found', 'Az oldal nem található') ??
            'Ez az oldal nem található'
          }}
        </h1>
        <p
          :class="['mt-2', 'mb-4']"
          style="max-width: 100%; width: 24rem">
          Elnézésedet kérjük! Látogasd meg a kezdőlapot, hogy megtaláld amit keresel.
        </p>
        <DefaultButton
          @click="handleError"
          class="w-full">
          Vissza a Kezdőlapra
        </DefaultButton>
      </div>
    </ViewWrapper>
  </NuxtLayout>
</template>

<script setup lang="ts">
import settings from '@/appsettings.json';
import { cookieValue } from '@/helpers/index';

defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: '/' });

/** Theme of the site, either 'dark' or 'light' */
const theme = useState('theme', () => 'dark');
// we don't need this watcher on server
onMounted(() => {
  const _themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const _theme = cookieValue('theme');
  if (_theme) theme.value = _theme;
  else theme.value = _themeQuery.matches ? 'dark' : 'light';
  document.documentElement.style.colorScheme = theme.value;
});

const description = `Ez az oldal nem található. Lakics Péter weboldala.`;
useSeoMeta({
  title: `404 | ${settings.APP_NAME}`,
  ogTitle: `404 | ${settings.APP_NAME}`,
  description: description,
  ogDescription: description,
  ogImage: `${settings.APP_URL}/logo.png`,
  robots: 'index, follow',
});
</script>
