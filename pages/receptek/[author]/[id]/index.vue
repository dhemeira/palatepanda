<template>
  <ViewWrapper>
    <ClientOnly>
      <div :class="['fixed', 'bg-background', 'right-2', 'rounded-full']">
        <div :class="['bg-primary/10', 'rounded-full', 'p-1', 'flex', 'gap-1']">
          <div
            :class="['w-1', 'h-1', 'rounded-full', isSupported ? 'bg-active' : 'bg-error']"
            :title="isSupported ? 'WakeLock támogatott' : 'WakeLock nem támogatott'"></div>
          <div
            :class="['w-1', 'h-1', 'rounded-full', isActive ? 'bg-active' : 'bg-error']"
            :title="isActive ? 'WakeLock aktív' : 'WakeLock inaktív'"></div>
        </div>
      </div>
    </ClientOnly>
    <img
      v-if="coverImage"
      :class="[
        'h-52',
        'xl:h-72',
        'object-cover',
        '-mt-4',
        'max-w-none',
        device.isMobileOrTablet ? 'w-[calc(100%+1rem)] -mx-2' : 'w-[calc(100%+3rem)] -mx-6',
      ]"
      :src="coverImage" />
    <div :class="['w-full', 'md:w-3/4', 'mx-auto']">
      <div
        style="line-height: 2"
        class="recipe"
        v-if="data"
        v-html="markdownToHtml()"></div>
      <div class="mt-4 flex justify-end flex-wrap">
        <NuxtLink
          v-if="route.params.author == user?.uid"
          class="m-4"
          :to="`/receptek/${route.params.author}/${route.params?.id}/szerkesztes`">
          <span
            class="hover:text-black dark:hover:text-white cursor-pointer underline decoration-dotted decoration-2 underline-offset-4 text-black/50 dark:text-white/75">
            Recept szerkesztése
          </span>
        </NuxtLink>
        <div class="flex items-center font-bold gap-2 bg-inverse-primary/10 p-4 w-fit rounded">
          <img
            v-if="authorName"
            :class="['aspect-square rounded-full ml-1 w-8 h-8']"
            :src="avatarURL" />
          {{ authorName ?? 'Nincs szerző' }}
        </div>
      </div>
      <DefaultButton
        v-if="route.query?.callbackURL && user"
        class="mt-8"
        :to="'/receptek/' + route.query?.callbackURL">
        Vissza a receptekhez
      </DefaultButton>
      <DefaultButton
        v-else
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
const authorName = useState('singleRecipeAuthorName', () => '');
const coverImage = useState('singleRecipeCoverImage', () => undefined);
const route = useRoute();
const user = useCurrentUser();
const device = useDevice();
const db = useFirestore();
const _database = getFirestore(db.app);
const { isSupported, isActive, request, release } = useWakeLock();
watch(
  () => route.params.author,
  () => {
    if (route.params.author) {
      watch(
        () => route.params.id,
        () => {
          if (route.params.id) {
            data.value = '';
            coverImage.value = undefined;
            readFromDb(route.params?.author as string, route.params?.id as string);
          }
        },
        { immediate: true }
      );
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (!document.hidden) {
    request('screen');
  }
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      request('screen');
    }
  });
});
onUnmounted(() => {
  release();
});

/**
 * Reads the requested recipe from the database and assigns the received data to variables
 * @param id The id of the requested recipe
 */
async function readFromDb(author: string, id: string) {
  const _docRef = doc(_database, `users/${author}/recipes`, id);
  const _docSnap = await getDoc(_docRef);

  if (_docSnap.exists()) {
    data.value = _docSnap.data()?.md;
    authorName.value = _docSnap.data()?.name;
    coverImage.value = _docSnap.data()?.coverImage;
    title.value = _docSnap.data()?.title;
    image.value = _docSnap.data()?.coverImage;
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

/** The URL of the image used as the avatar of the current user */
const avatarURL = computed(() => {
  let _formattedName = (authorName.value ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(' ', '');
  return `https://source.boringavatars.com/marble/64/${_formattedName}`;
});

const title = useState('recipeTitle', () => 'Recept');
const description = ref('Recept megtekintése. Lakics Péter weboldala.');
const image = ref(`${settings.APP_URL}/logo.png`);
useSeoMeta({
  title: () => `${title.value}`,
  ogTitle: () => `${title.value} | ${settings.APP_NAME}`,
  description: `${description.value}`,
  ogDescription: `${description.value}`,
  ogImage: image,
  robots: 'noindex, nofollow',
});
</script>
