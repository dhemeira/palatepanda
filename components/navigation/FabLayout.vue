<template>
  <div class="bottom-app-bar fixed bottom-0 flex z-50 w-screen h-11 px-3 pointer-events-none">
    <span class="pointer-events-auto">
      <LazyFabsButtonShareRecipe
        v-if="isRecipeView"
        :right="right" />
      <LazyFabsButtonToTop
        v-else-if="isRecipesView"
        :right="right" />
    </span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  right: boolean;
  button: any;
}>();

/** Checks wheter the current view is the Recipes view */
const isRecipesView = computed(() => {
  return props.button == 'receptek' || props.button == 'receptek-sajat';
});

/** Checks wheter the current view is the Recipe view */
const isRecipeView = computed(() => {
  return props.button == 'receptek-author-id';
});
</script>
<style scoped>
.bottom-app-bar {
  --right-location: 20px;
}
</style>
