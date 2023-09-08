<template>
  <div>
    <div
      :class="[
        isSmallScreen ? 'px-2 min-h-[calc(100vh-56px)]' : 'px-6 min-h-screen',
        'w-full py-4',
      ]"
      v-bind="$attrs">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
/** Is the screen small */
const isSmallScreen = useState('isSmallScreen');
</script>
