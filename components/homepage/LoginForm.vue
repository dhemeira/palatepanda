<template>
  <div
    :class="[device.isMobileOrTablet ? 'mx-auto' : 'h-[400px]']"
    style="max-width: 600px">
    <AlertToast
      :class="['fixed', 'z-40', 'right-4', 'top-4', device.isMobileOrTablet ? 'ml-4' : 'ml-20']"
      v-model="showAlert"
      :msg="alertMessage"
      :type="alertType" />
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
      v-if="!forgottenPw"
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
    <form
      v-else
      @submit.prevent="resetPw"
      autocomplete="on">
      <FormInput
        :icon="mdiEmail"
        v-model="emailReset"
        type="email"
        autocomplete="email"
        name="email"
        id="email"
        placeholder="Email cím" />
      <DefaultButton
        class="w-full"
        type="submit"
        :loading="loading">
        Jelszóvisszaállítás
      </DefaultButton>
    </form>
    <div class="flex justify-end my-4">
      <span
        class="hover:text-black dark:hover:text-white cursor-pointer underline decoration-dotted decoration-2 underline-offset-4 text-black/50 dark:text-white/75"
        @click="changeForm">
        {{ forgottenPw ? 'Bejelentkezés' : 'Elfelejtett jelszó' }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import settings from '@/appsettings.json';
import { errorHandler, successHandler } from '@/helpers/index';
import { mdiEmail, mdiLock } from '@mdi/js';

/** Controls wheter to show or hide the characters in the password field */
const showpw = ref(false);
/** The email address used to login */
const email = ref('');
/** The email address used to reset password */
const emailReset = ref('');
/** The password used to login */
const pw = ref('');
/** Controls the loading state of the login button */
const loading = ref(false);
/** Alert object */
const { showAlert, alertType, alertMessage, openAlert } = useAlert();
/** Auth object */
const auth = useAuth();

const forgottenPw = ref(false);

const device = useDevice();

/**
 * Logs in the user or show error if unsuccesful
 */
async function loginUser() {
  showAlert.value = false;
  if (!email.value || !pw.value) {
    openAlert(errorHandler({ code: 'auth-empty' }));
    return;
  }
  loading.value = true;
  let _res = await auth.login(email.value.trim().toLowerCase(), pw.value);
  if (_res) openAlert(errorHandler({ code: _res }));
  else {
    email.value = '';
    pw.value = '';
  }
  loading.value = false;
}
async function resetPw() {
  if (!emailReset.value) {
    openAlert(errorHandler({ code: 'email-empty' }));
    return;
  }
  loading.value = true;

  let _res = await auth.resetPassword(emailReset.value.trim().toLowerCase());
  if (_res) openAlert(errorHandler({ code: _res }));
  if (!_res) {
    openAlert(successHandler({ code: 'password-reset-sent' }), 'success');
  }
  emailReset.value = '';
  forgottenPw.value = false;
  loading.value = false;
}

function changeForm() {
  forgottenPw.value = !forgottenPw.value;
  showAlert.value = false;
  emailReset.value = '';
  email.value = '';
  pw.value = '';
  showpw.value = false;
}
</script>
