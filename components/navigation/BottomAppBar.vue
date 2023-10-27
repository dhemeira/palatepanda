<template>
  <div class="sticky bottom-0 h-24 flex items-end pointer-events-none z-40 text-on-surface-variant">
    <div class="bottom-app-bar pointer-events-auto flex items-center justify-between px-2">
      <img
        v-if="user"
        :class="['aspect-square rounded-full ml-1 w-8 h-8']"
        :src="avatarURL"
        alt="" />
      <NuxtLink
        v-else
        class="rounded-full h-10 w-10 flex items-center justify-center"
        to="/">
        <svg-icon
          class="h-8 w-8"
          type="mdi"
          :path="mdiAccount"></svg-icon>
      </NuxtLink>
      <button
        class="rounded-full h-10 w-10 flex items-center justify-center"
        @click="showSidebar = !showSidebar">
        <svg-icon
          class="h-8 w-8"
          type="mdi"
          :path="mdiMenu"></svg-icon>
      </button>

      <div class="wrapper">
        <div class="app-bar-bg-wrapper">
          <div class="app-bar-bg"></div>
          <div
            style="
              box-shadow:
                0px 56px 0px 100vw rgb(var(--color-inverse-primary) / 0.1),
                0px 56px 0px 100vw rgb(var(--color-background) / var(--tw-bg-opacity));
            "
            :class="[
              'app-bar-cutout',
              right ? 'right' : '',
              isFabHidden ? 'hidecutout' : '',
            ]"></div>
        </div>
      </div>
      <LazyFabsButtonEditRecipe
        v-if="isRecipeView && route.params.author == user?.uid"
        :class="[
          'transition-all duration-300',
          isFabHidden ? 'opacity-0 pointer-events-none' : 'delay-700',
        ]"
        :right="right"
        :hideOnScroll="false" />
      <LazyFabsButtonToTop
        v-else-if="isRecipesView"
        :class="[
          'transition-all duration-300',
          isFabHidden ? 'opacity-0 pointer-events-none' : 'delay-700',
        ]"
        :right="right"
        :hideOnScroll="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount, mdiMenu } from '@mdi/js';

const user = useCurrentUser();
/** Route object */
const route = useRoute();
/** Controls sidebar visibility on small screens  */
const showSidebar = useState('showSidebar');

const props = defineProps<{
  right: boolean;
  button: any;
  hideFab: boolean;
}>();

/** Checks wheter the current view is the Recipes view */
const isRecipesView = computed(() => {
  return props.button == 'receptek' || props.button == 'receptek-sajat';
});

/** Checks wheter the current view is the Recipe view */
const isRecipeView = computed(() => {
  return props.button == 'receptek-author-id';
});

/** Checks wheter the FAB is hidden */
const isFabHidden = computed(() => {
  return (!isRecipeView.value && !isRecipesView.value) || props.hideFab;
});

/** The URL of the image used as the avatar of the current user */
const avatarURL = computed(() => {
  let _formattedName = (user.value?.displayName ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(' ', '');
  return `https://source.boringavatars.com/marble/64/${_formattedName}`;
});
</script>

<style scoped>
.wrapper {
  position: absolute;
  z-index: -1;
  display: flex;
  left: 0;
  width: 100%;
}

.app-bar-bg-wrapper {
  overflow: hidden;
  position: relative;
  display: inline-flex;
  justify-content: center;
  width: 100%;
}

.app-bar-cutout {
  position: absolute;
  width: 56px;
  border-radius: 50%;
  transition:
    top 500ms cubic-bezier(0.455, 0.03, 0.515, 0.955),
    right 300ms 700ms cubic-bezier(0.4, 0, 0.2, 1);
  right: calc(50% - 38px);
  height: 76px;
  width: 76px;

  top: -38px;
  background: none;
}

.app-bar-cutout.hidecutout {
  top: -85px;
  transition: all 500ms 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
}
.app-bar-cutout.right {
  right: var(--right-location);
}

.app-bar-bg {
  width: 100%;
  height: var(--bottom-appbar-height);
  background: none;
}

.bottom-app-bar {
  bottom: 0;
  position: relative;
  width: 100%;
  max-width: 100%;
  height: var(--bottom-appbar-height);

  --right-location: 25px;
}
</style>
