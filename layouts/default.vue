<template>
  <div
    tabindex="-1"
    :class="['wrapper', 'bg-primary-container', 'outline-none', theme === 'dark' ? 'dark' : '']">
    <NavigationSkipToMain />
    <NavigationSideBar :class="!isSmallScreen || showSidebar ? 'opacity-100' : 'opacity-0'" />
    <main
      tabindex="-1"
      id="main"
      :class="['min-h-screen outline-none', 'bg-background', isSmallScreen ? '' : 'ml-14']">
      <slot />
      <LazyNavigationFooterDefault />
    </main>
    <component
      :is="isSmallScreen ? NavigationBottomAppBar : NavigationFabLayout"
      :right="isSmallScreen ? false : true"
      :button="route.name"
      v-if="isSmallScreen || !showSidebar"
      :hide-fab="isSmallScreen ? showSidebar : false" />
  </div>
</template>
<script setup lang="ts">
import NavigationFabLayout from '@/components/navigation/FabLayout.vue';
import NavigationBottomAppBar from '@/components/navigation/BottomAppBar.vue';

const route = useRoute();
/** Theme of the site, either 'dark' or 'light' */
const theme = useState('theme');
/** Is the screen small */
const isSmallScreen = useState('isSmallScreen');
/** Controls sidebar visibility on small screens  */
const showSidebar = useState('showSidebar');
</script>
