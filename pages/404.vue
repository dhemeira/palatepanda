<template>
  <ViewWrapper
    :class="['flex', 'items-center', 'flex-col', 'md:flex-row', 'justify-center', 'gap-8']">
    <div
      :class="[
        device.isMobileOrTablet ? 'w-full justify-center' : 'w-1/2 justify-end',
        'flex',
        'items-center',
      ]">
      <img
        class="rounded-bl-[80px] rounded-tr-[80px] rounded-tl-[40px] rounded-br-[40px] aspect-square max-h-[calc(100vh-400px-32px)] md:max-h-[calc(100vh-56px-32px)]"
        style="max-width: min(600px, 100vw - 16px)"
        src="/404_img.png" />
    </div>
    <div :class="[device.isMobileOrTablet ? 'w-full text-center' : 'w-1/2 text-left']">
      <div
        :class="['flex flex-col justify-center', device.isMobileOrTablet ? 'mx-auto' : 'h-[400px]']"
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
          to="/receptek"
          class="mb-4">
          Receptek Megtekintése
        </DefaultButton>
        <DefaultButton
          :outlined="true"
          to="/">
          Vissza a Kezdőlapra
        </DefaultButton>
      </div>
    </div>
  </ViewWrapper>
</template>
<script setup lang="ts">
import settings from '@/appsettings.json';
const device = useDevice();
const description = `Az oldal, amit keresel, sajnos nem található. Azonban ne csüggedj! Fedezd fel további ízletes receptjeinket és konyhai inspirációinkat a PalatePanda oldalán. Csatlakozz hozzánk, és merülj el az otthoni főzés izgalmas világában.`;
useSeoMeta({
  title: () => `404`,
  ogTitle: () => `404 | ${settings.APP_NAME}`,
  description: description,
  ogDescription: description,
  ogImage: `${settings.APP_URL}/logo.png`,
  robots: 'noindex, nofollow',
});
</script>
