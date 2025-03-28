// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0', // 외부 접근 허용
    port: 3002 // 사용할 포트
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

   // 프록시 설정 추가
   serverMiddleware: [
    {
      path: '/api',
      handler: 'http-proxy-middleware',
    }
  ],
  // proxy 설정
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.215:9090', // API 서버 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
