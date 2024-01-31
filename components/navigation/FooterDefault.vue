<template>
  <footer class="bg-primary-container text-center flex flex-col py-2 px-4 items-center flex-auto">
    <div class="flex">
      <a
        class="h-12 w-12 flex items-center justify-center mx-4 hover:text-black dark:hover:text-white"
        href="https://github.com/dhemeira"
        target="_blank">
        <svg-icon
          type="mdi"
          :path="mdiGithub"></svg-icon>
      </a>

      <a
        class="h-12 w-12 flex items-center justify-center mx-4 hover:text-black dark:hover:text-white"
        href="https://www.linkedin.com/in/peterlakics/"
        target="_blank">
        <svg-icon
          type="mdi"
          :path="mdiLinkedin"></svg-icon>
      </a>
    </div>

    <div
      class="flex flex-col sm:flex-row justify-center"
      style="gap: 0.35rem">
      <span>© 2023 - {{ new Date().getFullYear() }}</span>
      <span class="hidden sm:inline">|</span>
      <strong>Lakics Péter</strong>
    </div>
  </footer>
</template>
<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiGithub, mdiLinkedin } from '@mdi/js';
</script>
