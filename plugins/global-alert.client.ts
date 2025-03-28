import { defineNuxtPlugin } from "#app";
import { createVNode, render } from "vue";
import GlobalAlert from "~/components/GlobalAlert.vue";

export default defineNuxtPlugin((nuxtApp) => {
  // ✅ 컨테이너 생성 및 alert 컴포넌트 마운트
  const mountAlert = () => {
    const container = document.createElement("div");
    const vNode = createVNode(GlobalAlert);
    
    // Nuxt 앱 컨텍스트 주입
    vNode.appContext = nuxtApp.vueApp._context;
    
    render(vNode, container);
    document.body.appendChild(container);
    
    return vNode.component?.exposed;
  };

  // ✅ alert 인스턴스 생성
  let alertInstance: any = null;

  return {
    provide: {
      alert: async (type: string, title: string, message: string, confirmLabel?: string, cancelLabel?: string) => {
        console.log("Plugin received:", { type, title, message }); // 디버깅용
        if (!alertInstance) {
          alertInstance = mountAlert();
        }
        return alertInstance?.showAlert(type, title, message, confirmLabel, cancelLabel);
      }
    }
  };
});
