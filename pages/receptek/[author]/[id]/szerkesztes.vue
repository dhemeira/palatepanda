<template>
  <ViewWrapper>
    <AlertInline
      :class="['fixed', 'z-40', 'right-4']"
      v-model="showAlert"
      :msg="alertMessage"
      :type="alertType" />
    <div class="flex gap-2">
      <div :class="['flex', 'flex-col', 'w-1/2', 'gap-2', 'h-[calc(100vh-32px)]']">
        <h2 class="text-xl font-bold my-2">Új recept</h2>
        <textarea
          :class="[
            'p-2',
            'rounded',
            'flex-1',
            'resize-none',
            'border',
            'border-on-background',
            'focus-within:border-secondary',
            'outline-none',
          ]"
          v-model="text"
          @input="updatePreview"></textarea>
      </div>
      <div :class="['w-1/2', 'flex', 'flex-col', 'recipe', 'gap-2', 'h-[calc(100vh-32px)]']">
        <h2 class="text-xl font-bold my-2">Előnézet:</h2>
        <div
          :class="[
            'p-2',
            'rounded',
            'flex-1',
            'resize-none',
            'border',
            'border-on-background',
            'focus-within:border-secondary',
            'overflow-y-auto',
          ]"
          style="line-height: 2; word-wrap: break-word"
          v-html="preview"></div>
        <DefaultButton
          :style="['flex: 0', 'min-height: 44px']"
          @click="saveRecipe">
          Mentés
        </DefaultButton>
      </div>
    </div>
  </ViewWrapper>
</template>
<script setup lang="ts">
import { marked } from 'marked';
import { setDoc, doc, getDoc, getFirestore } from 'firebase/firestore/lite';
import settings from '@/appsettings.json';
import { errorHandler } from '@/helpers/index';

/** The content of the text field */
const text = useState('textEdit', () => '');
/** The markdown sanitized */
const cleaned = useState('cleanedEdit', () => '');
/** The preview of the recipe's markdown */
const preview = useState('previewEdit', () => '');
/** Alert object */
const { showAlert, alertType, alertMessage, openAlert } = useAlert();
/** The cover image of the recipe */
const coverImage = useState('coverImageEdit', () => '');
/** The markdown of the recipe */
const markdown = useState('markdownEdit', () => '');
/** The current page's route object */
const route = useRoute();
/** The markdown of the recipe before editing it */
const originalMd = useState('originalMdEdit', () => '');

const user = useCurrentUser();
const db = useFirestore();
const _database = getFirestore(db.app);
const router = useRouter();
onMounted(() => {
  /** When route changes and user is loaded, reads the recipe from databse to be edited */
  watch(
    () => route.params.author,
    () => {
      if (route.params.author) {
        watch(
          () => route.params.id,
          () => {
            if (route.params.id) {
              watch(
                () => user.value,
                () => {
                  if (user.value) readFromDb(route.params?.id as string);
                },
                { immediate: true }
              );
            }
          },
          { immediate: true }
        );
      }
    },
    { immediate: true }
  );
});

/**
 * Saves the updated recipe
 */
async function saveRecipe() {
  const _lines = cleaned.value.split('\n');

  if (_lines.length <= 1) return openAlert(errorHandler({ code: 'empty-recipe' }));
  if (text.value == originalMd.value) {
    console.info('Recipe not modified');
    return router.push(`/receptek/${route.params?.id}`);
  }

  let _title;

  if (isCoverImageLine(_lines[0]) && _lines[1] == '' && isTitleLine(_lines[2])) {
    _title = _lines[2].slice(2);
    await saveToDb(_title, markdown.value, coverImage.value);
    router.push(`/receptek/${route.params?.id}`);
  } else if (!isCoverImageLine(_lines[0]) && isTitleLine(_lines[0])) {
    _title = _lines[0].slice(2);
    await saveToDb(_title, markdown.value);
    router.push(`/receptek/${route.params?.id}`);
  } else {
    return openAlert(errorHandler({ code: 'no-recipe-title' }));
  }
}

/**
 * Updates the preview based on the text written in the text
 */
function updatePreview() {
  cleaned.value = text.value.replace(/\\n\\n/g, '\n');
  const _regex = new RegExp(/cImage\|.*\/.+\.[j|p][p|n]g/);

  const _textArray = cleaned.value.split('\n');

  if (_regex.test(_textArray[0])) {
    coverImage.value = _textArray[0].split('|')[1];
    _textArray[0] = `<img style="width:100%; height:208px; object-fit: cover;" src="${
      _textArray[0].split('|')[1]
    }"/>\n`;

    cleaned.value = _textArray.join('\n');
    markdown.value = _textArray.slice(1).join('\n');
  } else {
    markdown.value = cleaned.value;
  }

  preview.value = marked(cleaned.value, {
    mangle: false,
    headerIds: false,
  });
}

/**
 * Checks if the given line of text is a cover image or not
 * @param line The current line of the text
 * @returns Whether the line is a cover image or not
 */
function isCoverImageLine(line: string) {
  return line.includes('<img style="width:100%; height:208px; object-fit: cover;" src="');
}

/**
 * Checks if the given line of text is a markdown title or not
 * @param line The current line of the text
 * @returns Whether the line is a markdown title or not
 */
function isTitleLine(line: string) {
  return line.includes('# ');
}

/**
 * Saves the edited recipe to the database
 * @param _title The title of the recipe
 * @param _markdown The text of the recipe in markdown form
 * @param _image The cover image for the recipe
 */
async function saveToDb(_title: string, _markdown: string, _image?: string) {
  const _ref = doc(_database, `users/${user.value?.uid}/recipes`, `${route.params.id}`);
  await setDoc(_ref, {
    title: _title,
    coverImage: _image == undefined ? null : _image,
    md: _markdown,
  });
}

/**
 * Reads the requested recipe from the database and assigns the received data to variables
 * @param id The id of the requested recipe
 */
async function readFromDb(id: string) {
  const _docRef = doc(_database, `users/${user.value?.uid}/recipes`, id);
  const _docSnap = await getDoc(_docRef);

  if (_docSnap.exists()) {
    originalMd.value = `cImage|${_docSnap.data()?.coverImage}\n`;
    originalMd.value += _docSnap.data()?.md;
    text.value = originalMd.value;
    updatePreview();
  } else {
    showError({
      statusCode: 404,
      statusMessage: 'Recept nem található',
    });
  }
}

definePageMeta({
  middleware: ['auth'],
});

const title = ref('Szerkesztés');
const description = ref('Recept szerkesztése. Lakics Péter weboldala.');
useSeoMeta({
  title: `${title.value} | ${settings.APP_NAME}`,
  ogTitle: `${title.value} | ${settings.APP_NAME}`,
  description: `${description.value}`,
  ogDescription: `${description.value}`,
  ogImage: `${settings.APP_URL}/logo.png`,
  robots: 'noindex, nofollow',
});
</script>
