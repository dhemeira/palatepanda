<template>
  <div
    :class="[isSmallScreen ? 'mx-auto' : '']"
    style="max-width: 600px; height: 450px">
    <span class="flex justify-center items-center mb-6">
      <img
        class="rounded-lg mr-2"
        src="/logo.png"
        alt="Logo"
        width="48"
        height="48" />
      <h1 class="text-3xl font-bold">{{ settings.APP_NAME }}</h1>
    </span>
    <form
      @submit.prevent="loginUser"
      autocomplete="on">
      <FormInput
        :icon="mdiEmail"
        v-model="email"
        type="email"
        autocomplete="email"
        name="email"
        id="email"
        placeholder="Email cím" />

      <FormInput
        :icon="mdiLock"
        v-model="pw"
        :type="showpw ? 'text' : 'password'"
        autocomplete="current-password"
        name="password"
        id="password"
        placeholder="Jelszó"
        :showToggle="true"
        :show="showpw"
        @toggle="showpw = !showpw" />
      <DefaultButton
        class="w-full"
        type="submit"
        :loading="loading">
        Belépés
      </DefaultButton>
    </form>
    <div class="flex justify-end my-4">
      <span
        class="hover:text-black dark:hover:text-white cursor-pointer underline decoration-dotted decoration-2 underline-offset-4 text-black/50 dark:text-white/75"
        @click="resetPw">
        Elfelejtett jelszó
      </span>
    </div>
    <AlertInline
      class="mt-3"
      v-model="showAlert"
      :msg="alertMessage"
      :type="alertType" />
  </div>
</template>
<script setup lang="ts">
import settings from '@/appsettings.json';
import { errorHandler, successHandler } from '@/helpers/index';
import { mdiEmail, mdiLock } from '@mdi/js';

/** Controls wheter to show or hide the characters in the password field */
const showpw = useState('showPassword', () => false);
/** The email address used to login */
const email = useState('loginEmail', () => '');
/** The password used to login */
const pw = useState('loginPassword', () => '');
/** Controls the loading state of the login button */
const loading = useState('loginLoading', () => false);
/** Alert object */
const { showAlert, alertType, alertMessage, openAlert } = useAlert();
/** Auth object */
const auth = useAuth();

/** Is the screen small */
const isSmallScreen = useState('isSmallScreen');

/**
 * Logs in the user or show error if unsuccesful
 */
async function loginUser() {
  if (!email.value || !pw.value) {
    openAlert(errorHandler({ code: 'auth-empty' }));
    return;
  }
  loading.value = true;
  let _res = await auth.login(email.value.trim().toLowerCase(), pw.value);
  if (_res) openAlert(errorHandler({ code: _res }));
  if (!_res) {
    email.value = '';
    pw.value = '';
  }

  loading.value = false;
}
async function resetPw() {
  if (!email.value) {
    openAlert(errorHandler({ code: 'email-empty' }));
    return;
  }

  let _res = await auth.resetPassword(email.value.trim().toLowerCase());
  if (_res) openAlert(errorHandler({ code: _res }));
  if (!_res) {
    openAlert(successHandler({ code: 'password-reset-sent' }), 'success');
  }
}
</script>
