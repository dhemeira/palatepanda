<template>
  <button
    @click="share"
    tabindex="-1"
    :class="[
      'flex items-center shadow-xl justify-center absolute -top-14 w-14 translate-x-1/2 translate-y-1/2 transition-all duration-500 ease-out bg-secondary-container rounded-full aspect-square',
      right ? 'right' : '',
    ]"
    v-show="true">
    <svg-icon
      type="mdi"
      :path="mdiShareVariant"></svg-icon>
  </button>
</template>
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiShareVariant } from '@mdi/js';

defineProps<{
  right: boolean;
}>();
const title = useState('recipeTitle');
function share() {
  if (navigator.share) {
    navigator
      .share({
        url: route.fullPath,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }
}

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
