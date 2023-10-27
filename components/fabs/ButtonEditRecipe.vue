<template>
  <NuxtLink
    :to="`/receptek/${route.params.author}/${route.params?.id}/szerkesztes`"
    tabindex="-1"
    :class="[
      'flex items-center shadow-xl justify-center absolute -top-14 w-14 translate-x-1/2 translate-y-1/2 transition-all duration-500 ease-out bg-secondary-container rounded-full aspect-square',
      right ? 'right' : '',
    ]"
    v-show="true">
    <svg-icon
      type="mdi"
      :path="mdiPencil"></svg-icon>
  </NuxtLink>
</template>
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPencil } from '@mdi/js';

defineProps<{
  right: boolean;
}>();

/** Route object */
const route = useRoute();
</script>
<style scoped>
.bg-secondary-container {
  right: 50%;
}
.bg-secondary-container.right {
  right: calc(var(--right-location) + 38px);
}
</style>
