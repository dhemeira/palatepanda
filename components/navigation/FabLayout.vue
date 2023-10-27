<template>
  <div class="bottom-app-bar fixed bottom-0 flex z-50 w-screen h-11 px-3 pointer-events-none">
    <span class="pointer-events-auto">
      <FabsButtonEditRecipe
        v-if="isRecipeView && route.params.author == user?.uid"
        :right="right"
        :hideOnScroll="false" />
      <FabsButtonToTop
        v-else-if="isRecipesView"
        :right="right"
        :hideOnScroll="true" />
    </span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  right: boolean;
  button: any;
}>();
/** Route object */
const route = useRoute();
const user = useCurrentUser();

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
