<template>
  <div
    class="mb-7 relative w-full rounded border border-on-background focus-within:border-secondary">
    <svg-icon
      class="absolute top-1/2 !-translate-y-1/2 left-3 pointer-events-none"
      type="mdi"
      :path="icon"></svg-icon>
    <input
      :type="type"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :autocomplete="autocomplete"
      :name="name"
      :id="id"
      class="w-full py-4 px-11 bg-transparent rounded outline-none"
      placeholder=" " />
    <svg-icon
      v-if="showToggle"
      @click="emit('toggle')"
      class="absolute top-1/2 !-translate-y-1/2 right-3 pointer-events-auto cursor-pointer"
      type="mdi"
      :path="show ? mdiEye : mdiEyeOff"></svg-icon>
    <span
      class="floating-label absolute top-1/2 -translate-y-1/2 left-10 pointer-events-none px-2 rounded">
      {{ placeholder }}
    </span>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEye, mdiEyeOff } from '@mdi/js';
defineProps<{
  icon: string;
  modelValue: string;
  type: string;
  autocomplete: string;
  name: string;
  id: string;
  placeholder: string;
  show?: boolean;
  showToggle?: boolean;
}>();
const emit = defineEmits(['update:modelValue', 'toggle']);
</script>
<style scoped>
input:focus ~ .floating-label,
input:not(:focus):not(:placeholder-shown) ~ .floating-label {
  top: -0.5px;
  font-size: 14px;
  background: radial-gradient(
      circle at center left,
      transparent 1%,
      rgb(var(--color-background) / var(--tw-bg-opacity)) 1.1%,
      rgb(var(--color-background) / var(--tw-bg-opacity)) 79.9%,
      transparent 80%
    ),
    radial-gradient(
      circle at center right,
      transparent 1%,
      rgb(var(--color-background) / var(--tw-bg-opacity)) 1.1%,
      rgb(var(--color-background) / var(--tw-bg-opacity)) 79.9%,
      transparent 80%
    );
}

.floating-label {
  transition: 0.2s ease all;
}
</style>
