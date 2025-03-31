// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0', // 외부 접근 허용
    port: 3000 // 사용할 포트
  },
  css: ['vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [
      tailwindcss(), vuetify()
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  components: {
    dirs: [
      { path: "~/components/main", global: true},
      { path: "~/components/contents", global: true},
    ], // ✅ Lazy Loading 활성화
  },
  modules: [
    '@pinia/nuxt',
  ],
})
