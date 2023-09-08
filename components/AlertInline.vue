<template>
  <div
    v-if="modelValue"
    :class="[type == 'success' ? 'bg-primary-container' : 'bg-error', 'p-4 rounded grid']">
    <div class="grid__prepend mr-4">
      <svg-icon
        class="w-7 h-7"
        type="mdi"
        :path="type == 'success' ? mdiCheckCircle : mdiCloseCircle"></svg-icon>
    </div>
    <div class="grid__content flex flex-col">
      <span class="flex items-center text-xl font-medium">
        {{ type == 'success' ? 'Siker' : 'Hiba' }}
      </span>
      <span style="word-break: break-all">
        <span v-html="msg"></span>
      </span>
    </div>
    <div class="grid__close">
      <button
        :class="[
          type == 'success' ? 'interactive-bg-primary-container' : 'interactive-bg-error',
          'rounded-full w-8 h-8 flex items-center justify-center',
        ]"
        @click="emit('update:modelValue', false)"
        aria-label="Értesítés bezárása">
        <svg-icon
          class="w-4 h-4"
          type="mdi"
          :path="mdiClose"></svg-icon>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose, mdiCloseCircle, mdiCheckCircle } from '@mdi/js';

defineProps<{
  modelValue: boolean;
  msg: string;
  type?: 'success' | 'error' | 'warning' | 'info' | undefined;
}>();
const emit = defineEmits(['update:modelValue']);
</script>
<style scoped>
.grid {
  grid-template-areas:
    'prepend content append close'
    '.     content .    .  ';
  grid-template-columns: max-content auto max-content max-content;
}

.grid .grid__prepend {
  grid-area: prepend;
}
.bg-error.grid .grid__content {
  grid-area: content;
}
.bg-error.grid .grid__pclose {
  grid-area: close;
}
</style>
