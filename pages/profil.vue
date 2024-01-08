<template>
  <ViewWrapper :class="device.isMobileOrTablet ? 'w-full' : 'w-3/4 mx-auto'">
    <h1 :class="['mt-2 mb-6', 'text-3xl', 'font-bold']">Profil</h1>
    <div
      :class="['flex', 'flex-col', 'mb-4']"
      style="gap: 0.5rem"
      justify-center
      row>
      <span
        style="gap: 0.5rem"
        :class="['flex', 'items-center', 'mb-2']">
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
        :class="['flex', 'items-center', 'mb-2']">
        <svg-icon
          type="mdi"
          :path="mdiEmail"></svg-icon>
        <span :class="['flex', 'flex-wrap']">
          <span class="text-lg">{{ user?.email?.split('@')[0] ?? 'email' }}</span>
          <span class="text-lg">@{{ user?.email?.split('@')[1] ?? 'cím' }}</span>
        </span>
      </span>
    </div>
    <form
      @submit.prevent="changeUsername"
      autocomplete="off">
      <FormInput
        :icon="mdiAccount"
        v-model="username"
        autocomplete="false"
        placeholder="Új felhasználónév"
        name="username"
        id="username"
        type="text" />

      <DefaultButton
        class="w-full"
        :loading="loading"
        type="submit">
        Felhasználónév megváltoztatása
      </DefaultButton>
    </form>
    <div class="relative flex py-8 items-center">
      <div class="flex-grow border-t border-gray-400"></div>
      <span class="flex-shrink mx-4 text-gray-400 font-bold">VAGY</span>
      <div class="flex-grow border-t border-gray-400"></div>
    </div>
    <form
      @submit.prevent="changePassword"
      autocomplete="off">
      <FormInput
        :icon="mdiLock"
        v-model="password"
        :type="showpw ? 'text' : 'password'"
        autocomplete="off"
        name="password"
        id="password"
        placeholder="Új jelszó"
        :showToggle="true"
        :show="showpw"
        @toggle="showpw = !showpw" />

      <DefaultButton
        class="w-full"
        :loading="loadingpw"
        type="submit">
        Új jelszó mentése
      </DefaultButton>
    </form>
    <AlertInline
      class="mt-3"
      v-model="showAlert"
      :msg="alertMessage"
      :type="alertType" />
  </ViewWrapper>
</template>
<script setup lang="ts">
import { errorHandler, successHandler } from '@/helpers/index';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEmail, mdiAccount, mdiLock } from '@mdi/js';
import settings from '@/appsettings.json';

/** The username written in the text field */
const username = useState('newUsername', () => '');
/** The password written in the text field */
const password = useState('newPassword', () => '');
/** Is the button in a loading state */
const loading = useState('usernameLoading', () => false);
/** Is the button in a loading state */
const loadingpw = useState('passwordLoading', () => false);
/** Alert object */
const { showAlert, alertType, alertMessage, openAlert } = useAlert();

/** Controls wheter to show or hide the characters in the password field */
const showpw = useState('showNewPassword', () => false);

const device = useDevice();

const auth = useAuth();
const user = useCurrentUser();

const title = 'Profil';
const description = 'Profil. Lakics Péter weboldala.';

definePageMeta({
  middleware: ['auth'],
});

useServerSeoMeta({
  title: `${title} | ${settings.APP_NAME}`,
  ogTitle: `${title} | ${settings.APP_NAME}`,
  description: description,
  ogDescription: description,
  ogImage: `${settings.APP_URL}/logo.png`,
  robots: 'noindex, nofollow',
});

/**
 * Changes the username and notifies the user if it was successful
 */
async function changeUsername() {
  if (username.value == '') {
    openAlert(errorHandler({ code: 'displayname-empty' }));
    return;
  }
  if (username.value.length < 5) {
    openAlert(errorHandler({ code: 'displayname-short' }));
    return;
  }
  if (username.value.length > 40) {
    openAlert(errorHandler({ code: 'displayname-long' }));
    return;
  }

  loading.value = true;
  var _result = await auth.changeName(username.value);
  if (_result) openAlert(errorHandler({ code: _result }));
  else openAlert(successHandler({ code: 'name-changed' }), 'success');
  username.value = '';

  loading.value = false;
}

async function changePassword() {
  if (password.value == '') {
    openAlert(errorHandler({ code: 'password-empty' }));
    return;
  }
  if (password.value.length < 6) {
    openAlert(errorHandler({ code: 'auth/weak-password' }));
    return;
  }

  loadingpw.value = true;
  var _result = await auth.changePw(password.value);
  if (_result) openAlert(errorHandler({ code: _result }));
  else openAlert(successHandler({ code: 'password-changed' }), 'success');
  password.value = '';

  loadingpw.value = false;
}
</script>
