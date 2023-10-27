// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vite-pwa/nuxt', 'nuxt-vuefire', '@nuxtjs/tailwindcss', '@nuxtjs/eslint-module'],
  ssr: true,
  pwa: {
    includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
    manifest: {
      name: 'Lakics Péter',
      short_name: 'Lakics Péter',
      description: 'Lakics Péter személyes weboldala.',
      theme_color: '#121212',
      background_color: '#121212',
      lang: 'hu',
      shortcuts: [
        {
          name: 'Profil',
          url: '/profil',
        },
      ],
      icons: [
        {
          src: 'android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
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
