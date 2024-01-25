<template>
  <ViewWrapper>
    <AlertToast
      :class="['fixed', 'z-40', 'right-4', 'top-4', device.isMobileOrTablet ? 'ml-4' : 'ml-20']"
      v-model="showAlert"
      :msg="alertMessage"
      :type="alertType" />
    <div :class="['flex', 'gap-2']">
      <div :class="['flex', 'flex-col', 'w-1/2', 'gap-2', 'h-[calc(100vh-32px)]']">
        <h2 :class="['text-xl', 'font-bold', 'my-2']">Új recept</h2>
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
        <h2 :class="['text-xl', 'font-bold', 'my-2']">Előnézet:</h2>
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
import settings from '@/appsettings.json';
import { marked } from 'marked';
import { addDoc, collection, getFirestore } from 'firebase/firestore/lite';
import { errorHandler } from '@/helpers/index';
const device = useDevice();
/** The content of the text field */
const text = useState('text', () => '');
/** The markdown sanitized */
const cleaned = useState('cleaned', () => '');
/** The preview of the recipe's markdown */
const preview = useState('preview', () => '');
/** Alert object */
const { showAlert, alertType, alertMessage, openAlert } = useAlert();
/** The cover image of the recipe */
const coverImage = useState('coverImage', () => '');
/** The markdown of the recipe */
const markdown = useState('markdown', () => '');

const user = useCurrentUser();
const db = useFirestore();
const _database = getFirestore(db.app);

/**
 * Handles the save action for the recipe and notifies the user of it. If the save is successful, clear the text field, if not, show an error
 */
async function saveRecipe() {
  const _lines = cleaned.value.split('\n');

  if (_lines.length <= 1) return openAlert(errorHandler({ code: 'empty-recipe' }));

  let _title;

  if (isCoverImageLine(_lines[0]) && _lines[1] == '' && isTitleLine(_lines[2])) {
    _title = _lines[2].slice(2);
    let _id = await saveToDb(_title, markdown.value, coverImage.value);
    text.value = '';
    updatePreview();
    return openAlert(
      `Recept sikeresen mentve: <code class="bg-primary text-sm rounded px-1">${_id}</code>`,
      'success'
    );
  } else if (!isCoverImageLine(_lines[0]) && isTitleLine(_lines[0])) {
    _title = _lines[0].slice(2);
    let _id = await saveToDb(_title, markdown.value);
    text.value = '';
    updatePreview();
    return openAlert(
      `Recept sikeresen mentve: <code class="bg-primary text-sm rounded px-1">${_id}</code>`,
      'success'
    );
  } else {
    return openAlert(errorHandler({ code: 'no-recipe-title' }));
  }
}

/**
 * Updates the preview based on the text written in the text
 */
function updatePreview() {
  cleaned.value = text.value.replace(/\\n\\n/g, '\n');
  const _regex = new RegExp(/cImage\|.*\/.+\.(jpg|png)/);

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
 * Saves the recipe to the database
 * @param _title The title of the recipe
 * @param _markdown The text of the recipe in markdown form
 * @param _image The cover image for the recipe
 * @returns The id to indentify the recipe in the database
 */
async function saveToDb(_title: string, _markdown: string, _image?: string) {
  const _docRef = await addDoc(collection(_database, `users/${user.value?.uid}/recipes`), {
    title: _title,
    coverImage: _image == undefined ? null : _image,
    md: _markdown,
    name: user.value?.displayName,
  });

  return _docRef.id;
}

const title = 'Recept Írás';
const description = 'Recept írása. Lakics Péter weboldala.';

definePageMeta({
  middleware: ['auth'],
});

useSeoMeta({
  title: () => `${title}`,
  ogTitle: () => `${title} | ${settings.APP_NAME}`,
  description: description,
  ogDescription: description,
  ogImage: `${settings.APP_URL}/logo.png`,
  robots: 'noindex, nofollow',
});
</script>
