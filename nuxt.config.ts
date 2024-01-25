// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vite-pwa/nuxt',
    'nuxt-vuefire',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@nuxtjs/device',
    '@vueuse/nuxt',
  ],
  ssr: true,
  pwa: {
    includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
    manifest: {
      name: 'Lakics Péter',
      short_name: 'Lakics Péter',
      description: 'Lakics Péter személyes weboldala.',
      screenshots: [
        {
          src: 'wide_login.png',
          sizes: '1920x1032',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Login screen',
        },
        {
          src: 'wide_recipes.png',
          sizes: '1920x1032',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Recipe list',
        },
        {
          src: 'wide_recipe.png',
          sizes: '1920x1032',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Recipe',
        },
        {
          src: 'narrow_login.jpg',
          sizes: '1080x2400',
          type: 'image/jpeg',
          label: 'Login screen',
        },
        {
          src: 'narrow_recipes.jpg',
          sizes: '1080x2400',
          type: 'image/jpeg',
          label: 'Recipe list',
        },
        {
          src: 'narrow_recipe.jpg',
          sizes: '1080x2400',
          type: 'image/jpeg',
          label: 'Recipe',
        },
      ],
      theme_color: '#121212',
      background_color: '#121212',
      lang: 'hu',
      shortcuts: [
        {
          name: 'Receptek',
          url: '/receptek',
          icons: [
            {
              src: 'android-chrome-96x96.png',
              sizes: '96x96',
            },
          ],
        },
        {
          name: 'Saját Receptek',
          url: '/receptek/sajat',
          icons: [
            {
              src: 'android-chrome-96x96.png',
              sizes: '96x96',
            },
          ],
        },
        {
          name: 'Profil',
          url: '/profil',
          icons: [
            {
              src: 'android-chrome-96x96.png',
              sizes: '96x96',
            },
          ],
        },
      ],
      icons: [
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  },
  vuefire: {
    auth: {
      enabled: true,
      sessionCookie: true,
    },
    config: {
      apiKey: 'AIzaSyD9TZF08GGjx8sYGAsPp248tjGf1VXVzRg',
      authDomain: 'lakics-peter.firebaseapp.com',
      projectId: 'lakics-peter',
      storageBucket: 'lakics-peter.appspot.com',
      messagingSenderId: '645413753292',
      appId: '1:645413753292:web:21f7cf3f8043aefa900d69',
    },
  },
  eslint: {
    lintOnStart: false,
  },
});
