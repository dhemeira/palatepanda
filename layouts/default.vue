<template>
  <div
    tabindex="-1"
    :class="['wrapper', 'bg-primary-container', 'outline-none', theme === 'dark' ? 'dark' : '']">
    <NavigationSkipToMain />
    <NavigationSideBar
      :class="!device.isMobileOrTablet || showSidebar ? 'opacity-100' : 'opacity-0'" />
    <main
      tabindex="-1"
      id="main"
      :class="[
        'min-h-screen outline-none',
        'bg-background',
        device.isMobileOrTablet ? '' : 'ml-14',
      ]">
      <slot />
      <LazyNavigationFooterDefault />
    </main>
    <component
      :is="device.isMobileOrTablet ? NavigationBottomAppBar : NavigationFabLayout"
      :right="device.isMobileOrTablet ? false : true"
      :button="route.name"
      v-if="device.isMobileOrTablet || !showSidebar"
      :hide-fab="device.isMobileOrTablet ? showSidebar : false" />
  </div>
</template>
<script setup lang="ts">
import NavigationFabLayout from '@/components/navigation/FabLayout.vue';
import NavigationBottomAppBar from '@/components/navigation/BottomAppBar.vue';

const route = useRoute();
/** Theme of the site, either 'dark' or 'light' */
const theme = useState('theme');
const device = useDevice();
/** Controls sidebar visibility on small screens  */
const showSidebar = useState('showSidebar');
</script>
