<template>
  <div
    :class="[device.isMobileOrTablet ? 'mx-auto' : '']"
    style="max-width: 600px; height: 450px">
    <span class="flex items-center justify-center mb-6">
      <img
        class="rounded-lg mr-2"
        src="/logo.png"
        alt="Logo"
        width="48"
        height="48" />
      <h1 class="text-3xl font-bold">Belépve, mint:</h1>
    </span>
    <div class="bg-primary/5 text-on-surface mb-3 p-4 rounded drop-shadow-sm overflow-x-hidden">
      <Transition>
        <div
          v-if="waitingForCount"
          class="h-1 rounded-full bottom-0 absolute"
          style="animation: progressBar 1.5s ease-in-out infinite"></div>
      </Transition>

      <span
        style="gap: 0.5rem"
        class="flex items-center mb-2">
        <svg-icon
          type="mdi"
          :path="mdiAccount"></svg-icon>
        <span
          class="text-lg"
          style="word-break: break-all">
          {{ user?.displayName ?? user?.email?.split('@')[0] ?? 'Felhasználó' }}
        </span>
      </span>
      <span
        style="gap: 0.5rem"
        class="flex items-center mb-2">
        <svg-icon
          type="mdi"
          :path="mdiEmail"></svg-icon>
        <span class="flex flex-wrap">
          <span class="text-lg">{{ user?.email?.split('@')[0] ?? 'email' }}</span>
          <span class="text-lg">@{{ user?.email?.split('@')[1] ?? 'cím' }}</span>
        </span>
      </span>
      <span
        style="gap: 0.5rem"
        class="flex items-center mb-2">
        <svg-icon
          type="mdi"
          :path="mdiNotebook"></svg-icon>
        <span
          class="text-lg"
          style="word-break: break-all">
          Receptek: {{ countRecipes }} db
        </span>
      </span>
    </div>

    <div
      class="flex flex-col"
      style="gap: 0.75rem">
      <DefaultButton
        :icon="mdiNotebook"
        to="/receptek">
        Receptek
      </DefaultButton>
      <DefaultButton
        to="/profil"
        :outlined="true"
        color="primary">
        Profil
      </DefaultButton>
      <DefaultButton
        :outlined="true"
        color="primary"
        @click="auth.logout()">
        Kilépés
      </DefaultButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEmail, mdiNotebook, mdiAccount } from '@mdi/js';

/** The auth object */
const auth = useAuth();
const user = useCurrentUser();

/** The recipe object */
const recipe = useRecipe();
/** The count of the recipes this user has */
const countRecipes = useState('userRecipesCount', () => 0);
/** Controls the loader state while waiting for the count */
const waitingForCount = useState('watingForCount', () => true);

const device = useDevice();

onMounted(() => {
  /** When user gets authenticated, read recipes from database */
  watch(
    () => user.value,
    (currentValue) => {
      if (currentValue) readFromDb();
    },
    { immediate: true }
  );
});

async function readFromDb() {
  const _count = await recipe.getUserRecipesCount();

  setTimeout(() => {
    countRecipes.value = _count;
    waitingForCount.value = false;
  }, 750);
}
</script>

<style>
@keyframes progressBar {
  0% {
    width: 25%;
    left: -25%;
    @apply bg-primary/50;
  }
  50% {
    @apply bg-primary;
  }
  100% {
    width: 25%;
    left: 100%;
    @apply bg-primary/50;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
