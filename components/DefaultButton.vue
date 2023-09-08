<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="[
      'rounded h-11 uppercase font-bold tracking-widest px-2 flex justify-center items-center',
      outlined
        ? 'text-primary interactive-bg-background border-primary border-2'
        : 'interactive-bg-primary',
    ]">
    <svg-icon
      class="animate-spin w-8 h-8 stroke-current stroke-1"
      v-if="loading"
      type="mdi"
      :path="mdiLoading"></svg-icon>
    <span
      v-else
      class="flex flex-row justify-center items-center gap-2">
      <svg-icon
        v-if="icon"
        type="mdi"
        :path="icon"></svg-icon>
      <span style="white-space: normal; text-align: center"><slot>Gomb</slot></span>
    </span>
  </NuxtLink>
  <button
    v-else
    :class="[
      'rounded h-11 uppercase font-bold tracking-widest px-2 flex justify-center items-center',
      outlined
        ? 'text-primary interactive-bg-background border-primary border-2'
        : 'interactive-bg-primary',
    ]">
    <svg-icon
      class="animate-spin w-8 h-8 stroke-current stroke-1"
      v-if="loading"
      type="mdi"
      :path="mdiLoading"></svg-icon>
    <span
      v-else
      class="flex flex-row justify-center items-center gap-2">
      <svg-icon
        v-if="icon"
        type="mdi"
        :path="icon"></svg-icon>
      <span style="white-space: normal; text-align: center"><slot>Gomb</slot></span>
    </span>
  </button>
</template>
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLoading } from '@mdi/js';
defineProps<{
  to?: string;
  icon?: string;
  loading?: boolean;
  outlined?: boolean;
}>();
</script>
