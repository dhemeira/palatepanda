<template>
  <ViewWrapper>
    <DefaultButton to="/recept-iras">Recept írása</DefaultButton>

    <FormInput
      class="my-4"
      :icon="mdiMagnify"
      v-model="query"
      type="search"
      autocomplete="off"
      name="search_recipe"
      id="search_recipe"
      placeholder="Recept keresése" />

    <div
      :class="[
        'grid',
        'grid-flow-row',
        'grid-cols-1',
        'sm:grid-cols-2',
        'lg:grid-cols-3',
        'gap-y-8',
        'gap-x-4',
        'w-fit',
        'mx-auto',
        'mt-4',
      ]">
      <div
        style="grid-template-rows: 1fr 52px 72px"
        :class="['max-w-xs', 'grid', 'grid-cols-1']"
        v-for="recipe in recipesFiltered"
        :key="recipe.id">
        <img
          style="grid-area: 1/1/3/2"
          :class="['object-cover', 'w-full', 'aspect-square', 'rounded-lg', 'shadow-md']"
          v-if="recipe.coverImage"
          :src="recipe.coverImage" />
        <img
          style="grid-area: 1/1/3/2"
          :class="['object-cover', 'w-full', 'aspect-square', 'rounded-lg', 'shadow-md']"
          v-else
          src="/logo.png" />

        <div
          :class="['mx-3', 'rounded-lg', 'bg-background', 'self-end', 'shadow-lg']"
          style="grid-area: 2/1/4/2">
          <div :class="['bg-primary/10', 'rounded-lg', 'p-4']">
            <p
              :class="['text-xl', 'mb-4']"
              :title="recipe.title"
              style="
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-wrap: break-word;
              ">
              {{ recipe.title }}
            </p>
            <DefaultButton :to="`/receptek/${recipe.author}/${recipe.id}`">Megtekint</DefaultButton>
          </div>
        </div>
      </div>
    </div>
  </ViewWrapper>
</template>
<script setup lang="ts">
import settings from '@/appsettings.json';
import { mdiMagnify } from '@mdi/js';

definePageMeta({
  middleware: ['auth'],
});

const user = useCurrentUser();
const recipe = useRecipe();

/** Array of recipes read from database */
const recipes = useState(
  'userRecipes',
  () => [] as { id: string; title: string; coverImage?: string; author: string }[]
);
/** The search query */
const query = useState('searchQuery', () => '');

/** When user gets authenticated, read recipes from database */
watch(
  () => user.value,
  (currentValue) => {
    recipes.value = [];
    if (currentValue) readFromDb();
  },
  { immediate: true }
);

/**
 * Returns the recipes that fit the search query as an array.
 * @returns The filtered array of recipes
 */
const recipesFiltered = computed(() => {
  return recipes.value.filter((recipe) => {
    let _query = query.value.toLowerCase().trim().split(' ');
    let _matchFound = false;
    for (let _index = 0; _index < _query.length; _index++) {
      if (recipe.title.toLowerCase().trim().includes(_query[_index])) return (_matchFound = true);
    }

    return _matchFound;
  });
});

/**
 * Reads the authenticated user's recipes and pushes them into the recipes array
 */
async function readFromDb() {
  recipes.value = await recipe.readOwnRecipeList();
}

const title = 'Saját Receptek';
const description = 'Saját receptek megtekintése. Lakics Péter weboldala.';
useServerSeoMeta({
  title: `${title} | ${settings.APP_NAME}`,
  ogTitle: `${title} | ${settings.APP_NAME}`,
  description: description,
  ogDescription: description,
  ogImage: `${settings.APP_URL}/logo.png`,
  robots: 'index, nofollow',
});
</script>