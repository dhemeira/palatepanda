<template>
  <ViewWrapper>
    <img
      v-if="coverImage"
      :class="['h-52', 'xl:h-72', 'object-cover', 'w-full']"
      :src="coverImage" />
    <div :class="['w-3/4', 'mx-auto']">
      <div
        style="line-height: 2"
        class="recipe"
        v-if="data"
        v-html="markdownToHtml()"></div>
      <DefaultButton
        class="mt-8"
        to="/receptek">
        Vissza a receptekhez
      </DefaultButton>
    </div>
  </ViewWrapper>
</template>

<script setup lang="ts">
import settings from '@/appsettings.json';
import { marked } from 'marked';
import { doc, getDoc, getFirestore } from 'firebase/firestore/lite';

const data = useState('singleRecipeData', () => '');
const coverImage = useState('singleRecipeCoverImage', () => undefined);
const route = useRoute();

const user = useCurrentUser();

const db = useFirestore();
const _database = getFirestore(db.app);

definePageMeta({
  middleware: ['auth'],
});

onMounted(() => {
  watch(
    () => route.params.id,
    () => {
      if (route.params.id) {
        watch(
          () => user.value,
          () => {
            data.value = '';
            coverImage.value = undefined;
            if (user.value) readFromDb(route.params?.id as string);
          },
          { immediate: true }
        );
      }
    },
    { immediate: true }
  );
});

/**
 * Reads the requested recipe from the database and assigns the received data to variables
 * @param id The id of the requested recipe
 */
async function readFromDb(id: string) {
  const _docRef = doc(_database, `users/${user.value?.uid}/recipes`, id);
  const _docSnap = await getDoc(_docRef);

  if (_docSnap.exists()) {
    data.value = _docSnap.data()?.md;
    coverImage.value = _docSnap.data()?.coverImage;
  } else {
    showError({
      statusCode: 404,
      statusMessage: 'Recept nem található',
    });
  }
}

/**
 * Converts the recipe's markdown to html and returns it
 * @returns The html
 */
function markdownToHtml() {
  const _cleaned = data.value?.replace(/\\n\\n/g, '\n');
  if (_cleaned) {
    return marked(_cleaned, {
      mangle: false,
      headerIds: false,
    });
  }
}

const title = ref('Recept');
const description = ref('Recept megtekintése. Lakics Péter weboldala.');
useSeoMeta({
  title: `${title.value} | ${settings.APP_NAME}`,
  ogTitle: `${title.value} | ${settings.APP_NAME}`,
  description: `${description.value}`,
  ogDescription: `${description.value}`,
  ogImage: `${settings.APP_URL}/logo.png`,
  robots: 'noindex, nofollow',
});
</script>
