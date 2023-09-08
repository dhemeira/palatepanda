<template>
  <NuxtLayout>
    <NuxtPage :class="isSmallScreen ? 'min-h-[calc(100vh-56px)]' : 'min-h-screen'" />
  </NuxtLayout>
</template>
<script setup lang="ts">
import settings from '@/appsettings.json';
import { debounce, cookieValue } from '@/helpers/index';

const router = useRouter();
const route = useRoute();
const user = useCurrentUser();

/** Theme of the site, either 'dark' or 'light' */
const theme = useState('theme', () => 'dark');
/** Is the screen small */
const isSmallScreen = useState('isSmallScreen', () => false);
/** Controls sidebar visibility on small screens  */
const showSidebar = useState('showSidebar', () => false);
const alert = useAlert();
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
  ogUrl: `${settings.APP_URL}${route.path}`,
});
// we don't need this watcher on server
onMounted(() => {
  const _themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const _theme = cookieValue('theme');
  if (_theme) theme.value = _theme;
  else theme.value = _themeQuery.matches ? 'dark' : 'light';
  document.documentElement.style.colorScheme = theme.value;

  /** If in development, prints debug information */
  if (process.dev) {
    import('@/helpers/debugUtils').then((e) => e.logActiveElement());
  }

  const _smallSize = 960;
  isSmallScreen.value = window.innerWidth < _smallSize;

  window.addEventListener(
    'resize',
    debounce(() => {
      isSmallScreen.value = window.innerWidth < _smallSize;
    }, 500)
  );

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

      alert.resetAlert();
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
