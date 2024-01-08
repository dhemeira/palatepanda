<template>
  <div
    class="h-full bg-transparent w-screen fixed z-50 pointer-events-none transition-opacity duration-500">
    <div
      @click="showSidebar = !showSidebar"
      :class="[
        'absolute bg-black/20 top-0 left-0 right-0 bottom-0 -z-10',
        device.isMobileOrTablet ? '' : 'hidden',
        !showSidebar ? 'pointer-events-none' : 'pointer-events-auto',
      ]"></div>
    <nav
      tabindex="-1"
      :class="[
        'sidebar h-full overflow-y-auto bg-background relative overflow-x-hidden transition-all group px-2 overscroll-contain dark:!text-white !text-black',
        device.isMobileOrTablet ? 'w-64 h-full' : 'h-full w-14 hover:w-64',
        device.isMobileOrTablet && !showSidebar ? 'pointer-events-none' : 'pointer-events-auto',
      ]">
      <div class="bg-inverse-primary/10 fixed inset-0 pointer-events-none w-[inherit]"></div>
      <div
        v-if="user"
        class="flex flex-row gap-4 py-2 my-3 px-2 justify-start w-60 h-10 items-center rounded max-w-full">
        <img
          :class="[
            'min-w-[24px] min-h-[24px] max-w-[40px] max-h-[40px] aspect-square rounded-full transition-all',
            device.isMobileOrTablet ? 'w-10 h-10' : 'w-6 h-6 group-hover:w-10 group-hover:h-10',
          ]"
          :src="avatarURL"
          alt="" />
        {{ user?.displayName }}
      </div>
      <NuxtLink
        v-else
        to="/"
        :tabindex="!device.isMobileOrTablet || showSidebar ? 0 : -1"
        class="login flex flex-row gap-8 py-2 my-3 px-2 justify-start w-60 h-10 items-center hover:bg-inverse-primary/50 rounded max-w-full">
        <svg-icon
          class="w-6 h-6 min-w-[24px] min-h-[24px]"
          type="mdi"
          :path="mdiLogin"></svg-icon>
        <span :class="['inline-flex', 'text-sm', 'min-w-[160px]']">Belépés</span>
      </NuxtLink>

      <hr class="my-3" />
      <div
        v-for="link in sidebarLinks"
        :key="link.url">
        <NuxtLink
          :tabindex="!device.isMobileOrTablet || showSidebar ? 0 : -1"
          v-if="!link.auth || user"
          :to="link.url"
          class="flex flex-row gap-8 py-2 my-1 px-2 justify-start w-60 h-10 items-center hover:bg-inverse-primary/50 rounded max-w-full">
          <svg-icon
            class="w-6 h-6 min-w-[24px] min-h-[24px]"
            type="mdi"
            :path="link.icon"></svg-icon>
          <span class="inline-flex text-sm min-w-[160px]">{{ link.name }}</span>
        </NuxtLink>
      </div>

      <hr class="my-3" />

      <button
        :tabindex="!device.isMobileOrTablet || showSidebar ? 0 : -1"
        class="flex flex-row gap-8 py-2 my-1 px-2 justify-start w-60 h-10 items-center hover:bg-inverse-primary/50 rounded max-w-full"
        @click="themeChange">
        <svg-icon
          class="w-6 h-6 min-w-[24px] min-h-[24px]"
          type="mdi"
          :path="theme == 'dark' ? mdiMoonWaningCrescent : mdiWhiteBalanceSunny"></svg-icon>
        <span class="inline-flex text-sm min-w-[160px]">
          {{ theme == 'dark' ? 'Váltás világos módba' : 'Váltás sötét módba' }}
        </span>
      </button>
      <button
        :tabindex="!device.isMobileOrTablet || showSidebar ? 0 : -1"
        class="flex flex-row gap-8 py-2 my-1 px-2 justify-start w-60 h-10 items-center hover:bg-inverse-primary/50 rounded max-w-full"
        v-if="user"
        @click="auth.logout()">
        <svg-icon
          class="w-6 h-6 min-w-[24px] min-h-[24px]"
          type="mdi"
          :path="mdiLogout"></svg-icon>
        <span class="inline-flex text-sm min-w-[160px]">Kilépés</span>
      </button>
    </nav>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import {
  mdiHome,
  mdiNotebook,
  mdiAccountEdit,
  mdiWhiteBalanceSunny,
  mdiMoonWaningCrescent,
  mdiLogout,
  mdiLogin,
  mdiNotebookHeart,
} from '@mdi/js';

const user = useCurrentUser();
const auth = useAuth();
const device = useDevice();
const theme = useState('theme');

/** Controls sidebar visibility on small screens  */
const showSidebar = useState('showSidebar');

/** The data of the links in the sidebar */
const sidebarLinks = [
  { url: '/', icon: mdiHome, name: 'Kezdőlap', auth: false },
  { url: '/receptek', icon: mdiNotebook, name: 'Receptek', auth: false },
  { url: '/receptek/sajat', icon: mdiNotebookHeart, name: 'Saját Receptek', auth: true },
  { url: '/profil', icon: mdiAccountEdit, name: 'Profil', auth: true },
];

/** The URL of the image used as the avatar of the current user */
const avatarURL = computed(() => {
  let _formattedName = (user.value?.displayName ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(' ', '');
  return `https://source.boringavatars.com/marble/64/${_formattedName}`;
});

/**
 * Changes the theme to either light or dark depending on the current theme, saving it to a cookie and setting the color scheme
 */
function themeChange() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  document.cookie = `theme=${theme.value};sameSite=Lax`;
  document.documentElement.style.colorScheme = theme.value as string;
}
</script>
<style scoped>
.router-link-exact-active:not(.login) {
  @apply bg-inverse-primary;
}

.sidebar {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.sidebar::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
