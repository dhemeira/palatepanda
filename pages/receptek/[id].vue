<template>
  <div>Recept</div>
  {{ route.params.id }}
  {{ title }}
  <NuxtLink to="/receptek">Vissza a receptekhez</NuxtLink>
</template>

<script setup lang="ts">
import { doc } from 'firebase/firestore';
import settings from '@/appsettings.json';

const title = useState('singleRecipeTitle', () => 'Recept');
const data = useState('singleRecipeData', () => '');
const coverImage = useState('singleRecipeCoverImage', () => undefined);
const route = useRoute();
const user = useCurrentUser();

const db = useFirestore();
definePageMeta({
  middleware: ['auth'],
});
/** When the route changes, read the recipe with the same id */
watch(
  () => route.params.id,
  () => {
    if (route.params.id) {
      watch(
        () => user.value,
        (currentValue) => {
          data.value = '';
          coverImage.value = undefined;
          if (currentValue) readFromDb(route.params?.id as string);
        },
        { immediate: true }
      );
    }
  },
  { immediate: true }
);

/**
 * Reads the requested recipe from the database and assigns the received data to variables
 * @param id The id of the requested recipe
 */
function readFromDb(id: string) {
  const { data: recipe } = useDocument(doc(db, `users/${user.value?.uid}/recipes`, id));

  if (recipe.value) {
    data.value = recipe.value?.md;
    title.value = recipe.value?.title;
    coverImage.value = recipe.value?.coverImage;
  } else {
    console.log('Nincs ilyen recept');
  }
}
const description = ref(' recept. Lakics Péter weboldala.');
useSeoMeta({
  title: `${title.value} | ${settings.APP_NAME}`,
  ogTitle: `${title.value} | ${settings.APP_NAME}`,
  description: `${title.value}${description.value}`,
  ogDescription: `${title.value}${description.value}`,
  ogImage: `${settings.APP_URL}/logo.png`,
  robots: 'noindex, nofollow',
  ogUrl: `${settings.APP_URL}/`,
});
</script>
