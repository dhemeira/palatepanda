<template>
  <div>
    <div
      :class="[
        device.isMobileOrTablet ? 'px-2 min-h-[calc(100vh-56px)]' : 'px-6 min-h-screen',
        'w-full py-4',
      ]"
      v-bind="$attrs">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const device = useDevice();
</script>
