<template><div class="bg-background-dark w-screen h-screen"></div></template>
<script setup lang="ts">
const props = defineProps({
  error: Object,
});

if (props.error?.statusCode == 404) {
  clearError({ redirect: '/404' });
}
</script>
