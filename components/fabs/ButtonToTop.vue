<template>
  <button
    @click="onClick"
    tabindex="-1"
    :class="[
      'flex items-center shadow-xl justify-center absolute -top-14 w-14 translate-x-1/2 translate-y-1/2 bg-secondary-container rounded-full aspect-square',
      right ? 'right' : '',
    ]"
    v-show="true">
    <svg-icon
      type="mdi"
      :path="mdiChevronUp"></svg-icon>
  </button>
</template>
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronUp } from '@mdi/js';

defineProps<{
  right: boolean;
}>();

/** Scroll to the top of the page */
function onClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
</script>
<style scoped>
.bg-secondary-container {
  right: 50%;
}
.bg-secondary-container.right {
  right: calc(var(--right-location) + 38px);
}
</style>
