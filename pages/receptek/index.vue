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
        'mb-8',
      ]">
      <div
        v-if="recipesFiltered.length == 0 && !loading"
        :class="[
          'col-span-full',
          'mt-8',
          'flex',
          'items-center',
          'justify-center',
          'gap-2',
          'text-xl',
          device.isMobileOrTablet ? 'flex-col text-center' : '',
        ]">
        <svg-icon
          :class="device.isMobileOrTablet ? 'h-16 w-16' : 'h-12 w-12'"
          type="mdi"
          :path="mdiMagnify"></svg-icon>

        A megadott keresési feltételeknek egy recept sem felel meg.
      </div>
      <div
        v-else
        :class="['col-span-full', '-mb-4', 'text-right']">
        {{ recipesFiltered.length }} recept
      </div>

      <SkeletonRecipe v-if="loading" />
      <SkeletonRecipe v-if="loading" />
      <SkeletonRecipe v-if="loading" />
      <SkeletonRecipe v-if="loading" />
      <SkeletonRecipe v-if="loading" />
      <SkeletonRecipe v-if="loading" />

      <NuxtLink
        v-else
        :to="`/receptek/${recipe.author}/${recipe.id}`"
        v-for="recipe in recipesFiltered"
        :key="recipe.id">
        <div
          style="grid-template-rows: 1fr 52px 32px"
          :class="['max-w-xs', 'grid', 'grid-cols-1']">
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
                :class="['text-xl', 'mb-3']"
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
              <div class="flex items-center gap-1 justify-end">
                <img
                  :class="['aspect-square rounded-full ml-1 w-5 h-5']"
                  :src="avatarURL(recipe.authorName)" />
                <div class="text-xs italic">{{ recipe.authorName }}</div>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </ViewWrapper>
</template>
<script setup lang="ts">
import settings from '@/appsettings.json';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify } from '@mdi/js';
const device = useDevice();

const recipe = useRecipe();

/** Array of recipes read from database */
const recipes = useState('allRecipes', () => [] as Recipe[]);
/** The search query */
const query = useState('searchQuery', () => '');

onUnmounted(() => {
  query.value = '';
  loading.value = true;
  recipes.value = [];
});
const loading = useState('recipeListLoading', () => true);

recipes.value = await recipe.readRecipeList();
setTimeout(() => {
  loading.value = false;
}, 250);

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

/** The URL of the image used as the avatar of the current user */
function avatarURL(authorName: string) {
  let _formattedName = (authorName ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(' ', '');
  return `https://dhemeira.hu/api/avatar?username=${_formattedName}`;
}

const title = 'Receptek';
const description =
  'Fedezd fel a PalatePanda receptek gyűjteményét, és kóstold meg az otthoni konyha változatos ízeit. Ismerj meg új és izgalmas recepteket a közösség által megosztott kulináris kalandokból. Inspirálódj, főzz egyedi ételeket, és hagyd, hogy a PalatePanda vezessen el a gasztronómiai örömök világában.';

useSeoMeta({
  title: () => `${title}`,
  ogTitle: () => `${title} | ${settings.APP_NAME}`,
  description: description,
  ogDescription: description,
  ogImage: `${settings.APP_URL}/logo.png`,
  robots: 'index, nofollow',
});
</script>
