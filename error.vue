<template>
  <NuxtLayout name="error">
    <div
      :class="[
        'flex',
        'items-center',
        'flex-col',
        'md:flex-row',
        'justify-center',
        'gap-8',
        'px-2 min-h-[calc(100vh-56px)]',
        'md:px-6 md:min-h-screen',
        'w-full py-4',
      ]">
      <div
        :class="['md:w-1/2', 'md:justify-end', 'w-full', 'justify-center', 'flex', 'items-center']">
        <img
          class="rounded-bl-[80px] rounded-tr-[80px] rounded-tl-[40px] rounded-br-[40px] aspect-square max-h-[max(250px,calc(100vh-400px-16px))] md:max-h-[max(400px,calc(100vh-56px-32px))] max-w-[min(600px,100vw-16px)] md:max-w-[min(600px,50vw-32px)]"
          src="/404_img.png" />
      </div>
      <div :class="['w-full', 'text-center', 'md:w-1/2', 'md:text-left']">
        <div
          :class="['flex flex-col justify-center', 'mx-auto', 'md:mx-0', 'md:h-[400px]']"
          style="max-width: 600px">
          <h1
            :class="['my-2', 'text-3xl', 'font-bold']"
            style="word-break: break-word">
            Az oldal nem található
          </h1>
          <p :class="['mt-2', 'mb-4']">
            Válogass receptjeink között vagy látogasd meg a kezdőlapot, hogy megtaláld amit keresel.
          </p>
          <DefaultButton
            href="/receptek"
            class="mb-4">
            Receptek Megtekintése
          </DefaultButton>
          <DefaultButton
            :outlined="true"
            href="/">
            Vissza a Kezdőlapra
          </DefaultButton>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import settings from '@/appsettings.json';

const description = `Az oldal, amit keresel, sajnos nem található. Azonban ne csüggedj! Fedezd fel további ízletes receptjeinket és konyhai inspirációinkat a PalatePanda oldalán. Csatlakozz hozzánk, és merülj el az otthoni főzés izgalmas világában.`;
useHead({
  htmlAttrs: { lang: 'hu' },
  link: [
    { rel: 'icon', href: `${settings.APP_URL}/favicon.ico` },
    { rel: 'mask-icon', href: `${settings.APP_URL}/mask-icon.svg`, color: '#FFFFFF' },
    { rel: 'apple-touch-icon', href: `${settings.APP_URL}/apple-touch-icon.png`, sizes: '180x180' },
  ],
});
const route = useRoute();
useSeoMeta({
  title: `404 | ${settings.APP_NAME}`,
  ogTitle: `404 | ${settings.APP_NAME}`,
  description: description,
  ogDescription: description,
  ogImage: `${settings.APP_URL}/logo.png`,
  robots: 'index, follow',
});
useServerSeoMeta({
  ogSiteName: settings.APP_NAME,
  ogType: 'website',
  ogLocale: 'hu_HU',
  applicationName: settings.APP_NAME,
  author: 'Lakics Péter',
  themeColor: '#121212',
  ogUrl: `${settings.APP_URL}${route.path}`,
});
</script>
<style>
html {
  color-scheme: dark;
}
</style>
