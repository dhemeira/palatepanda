<template>
  <div>
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
    <div
      v-if="!isPwa"
      :class="[
        device.isMobileOrTablet ? 'px-2' : 'px-6',
        'w-full py-8 lg:py-16 flex md:items-end flex-col lg:flex-row bg-primary/5 gap-8',
      ]">
      <div class="w-full lg:w-1/2">
        <h2 class="text-2xl mb-4">Szeretnéd gyorsan megtalálni kedvenc receptjeidet?</h2>
        <p class="my-2">
          Töltsd le az alkalmazást és férj hozzá az összes funkcióhoz közvetlenül a telefonodról,
          számítógépedről vagy tabletedről!
        </p>
        <p class="my-2">Nincs más dolgod, mint a letöltés gombra kattintani.</p>
      </div>
      <DefaultButton
        class="w-full md:w-1/2"
        @click="installPwa">
        Letöltés
      </DefaultButton>
    </div>
    <div
      :class="[
        device.isMobileOrTablet ? 'px-2' : 'px-6',
        'w-full py-8 md:py-16',
        isPwa ? 'bg-primary/5' : 'bg-background',
      ]">
      <h2 class="text-2xl mb-4">Az oldalról</h2>
      <div class="flex gap-4 flex-col md:flex-row">
        <div class="w-full">
          <p class="my-2">
            Szeretnéd receptjeidet gyorsan, ingyen és reklámmentesen elérni bárhonnan?
          </p>
          <p class="my-2">Szeretnél kipróbálni egy más által írt új receptet?</p>
          <p class="my-2">Szeretnéd legjobb receptjeidet megosztani másokkal?</p>
          <p class="my-2">Akkor jó helyen jársz!</p>
        </div>
        <div class="w-full">
          <p class="my-2">Használd ki az oldal által nyújtott lehetőségeket:</p>

          <ul class="list-disc list-outside ml-4">
            <li class="list-item my-2">
              sütés-főzés a kijelző elsötétedése miatti aggodalom nélkül,
              <br />
              (akumulátor kímélő, csak akkor aktív, amikor egy receptet olvasol)
            </li>
            <li class="list-item my-2">receptek közötti válogatás akár bejelentkezés nélkül is,</li>
            <li class="list-item my-2">saját receptek gyors elérése,</li>
            <li class="list-item my-2">receptek feltöltése, szerkesztése</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import settings from '@/appsettings.json';
const user = useCurrentUser();

const device = useDevice();

const title = 'Kezdőlap';
const description = 'Lakics Péter weboldala.';

const deferredPrompt = useState('pwaPrompt', () => null as any);
const isPwa = useState('isPwa', () => false);

onMounted(() => {
  isPwa.value = window.matchMedia('(display-mode: standalone)').matches;

  // This variable will save the event for later use.
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevents the default mini-infobar or install dialog from appearing on mobile
    e.preventDefault();
    // Save the event because you'll need to trigger it later.
    deferredPrompt.value = e;
  });
});

function installPwa() {
  deferredPrompt.value?.prompt();
}

useSeoMeta({
  title: () => `${title}`,
  ogTitle: () => `${title} | ${settings.APP_NAME}`,
  description: description,
  ogDescription: description,
  ogImage: `${settings.APP_URL}/logo.png`,
  robots: 'index, follow',
});
</script>
