<template>
  <VitePwaManifest />
  <NuxtLayout>
    <AlertInline
      :class="['fixed', 'z-40', 'left-4 md:left-20', 'top-4']"
      v-model="showAlert"
      :msg="alertMessage"
      :type="alertType" />
    <NuxtPage :class="device.isMobileOrTablet ? 'min-h-[calc(100vh-56px)]' : 'min-h-screen'" />
  </NuxtLayout>
</template>
<script setup lang="ts">
import settings from '@/appsettings.json';
import { cookieValue } from '@/helpers/index';
const device = useDevice();
const router = useRouter();
const route = useRoute();
const user = useCurrentUser();

/** Theme of the site, either 'dark' or 'light' */
const theme = useState('theme', () => 'dark');
/** Alert object */
const { showAlert, alertType, alertMessage, openAlert } = useAlert();
const { $pwa } = useNuxtApp();
/** Controls sidebar visibility on small screens  */
const showSidebar = useState('showSidebar', () => false);

useHead({
  titleTemplate: (title) => `${title} | ${settings.APP_NAME}`,
  htmlAttrs: { lang: 'hu' },
  link: [
    { rel: 'icon', href: `${settings.APP_URL}/favicon.ico` },
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
  ogUrl: `${settings.APP_URL}${route.path}`,
});

function showUpdatePromt() {
  setTimeout(() => {
    openAlert('Új verzió érhető el', 'refresh');
  }, 1000);
}

// we don't need this watcher on server
onMounted(() => {
  const _themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const _theme = cookieValue('theme');
  if (_theme) theme.value = _theme;
  else theme.value = _themeQuery.matches ? 'dark' : 'light';
  document.documentElement.style.colorScheme = theme.value;

  if ($pwa?.needRefresh) {
    showUpdatePromt();
  }

  /** If in development, prints debug information */
  if (process.dev) {
    import('@/helpers/debugUtils').then((e) => e.logActiveElement());
  }

  watch(user, (user, prevUser) => {
    if (prevUser && !user) {
      router.push('/');
    } else if (user && typeof route.query.redirect === 'string') {
      router.push(route.query.redirect);
    }
  });

  /** When the route is changed, hides the sidebar on small screens and resets the focus*/
  watch(
    () => route.path,
    (to) => {
      showSidebar.value = false;

      resetFocus(to);
    },
    { immediate: true }
  );

  /** Stops scrolling and hides the scrollbar when the Sidebar is visible on small screens */
  watch(
    showSidebar,
    (current) => {
      document.documentElement.style.overflowY = current ? 'hidden' : 'auto';
    },
    { immediate: true }
  );
});

/**
 * When redirected, sets the focus just before the \<nav\> element and the skip to main content button if the redirect is not to a hash (ex. /#main)
 * @param to The route the app is redirected to
 */
function resetFocus(to: any) {
  if (!to.hash) (document.querySelector('.wrapper') as HTMLDivElement)?.focus();
}
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
