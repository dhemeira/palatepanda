<template>
  <div
    v-if="modelValue"
    :class="[
      type == 'success' || type == 'info'
        ? 'bg-primary-container'
        : type == 'refresh'
          ? 'bg-secondary-container'
          : 'bg-error',
      'p-4 rounded grid gap-4',
    ]">
    <div class="grid__prepend">
      <svg-icon
        class="w-7 h-7"
        type="mdi"
        :path="
          type == 'success'
            ? mdiCheckCircle
            : type == 'info'
              ? mdiInformation
              : type == 'refresh'
                ? mdiRefreshCircle
                : mdiCloseCircle
        "></svg-icon>
    </div>
    <div class="grid__content flex flex-col">
      <span
        style="word-break: break-word"
        class="flex items-center text-xl font-medium">
        {{
          type == 'success'
            ? 'Siker'
            : type == 'info'
              ? 'Info'
              : type == 'refresh'
                ? 'Új verzió'
                : 'Hiba'
        }}
      </span>
      <div class="flex flex-col items-end gap-2">
        <span style="word-break: break-word">
          <span v-html="msg"></span>
        </span>
        <LazyDefaultButton
          :small="true"
          v-if="type == 'refresh'"
          @click="$pwa?.updateServiceWorker(true)">
          Frissítés
        </LazyDefaultButton>
      </div>
    </div>
    <div class="grid__close">
      <button
        :class="[
          type == 'success' || type == 'info'
            ? 'interactive-bg-primary-container'
            : type == 'refresh'
              ? 'interactive-bg-secondary-container'
              : 'interactive-bg-error',
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
import {
  mdiClose,
  mdiCloseCircle,
  mdiCheckCircle,
  mdiInformation,
  mdiRefreshCircle,
} from '@mdi/js';

defineProps<{
  modelValue: boolean;
  msg: string;
  type?: AlertType;
}>();
const emit = defineEmits(['update:modelValue']);
const { $pwa } = useNuxtApp();
</script>
<style scoped>
.grid {
  grid-template-areas:
    'prepend content  close'
    '.     content    .  ';
  grid-template-columns: max-content auto max-content;
}

.grid__prepend {
  grid-area: prepend;
}
.grid__content {
  grid-area: content;
}
.grid__close {
  grid-area: close;
}
</style>
