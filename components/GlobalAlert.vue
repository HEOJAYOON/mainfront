<template>
    <v-dialog v-model="isVisible" max-width="420" persistent>
      <v-card class="alert-card">
        <v-card-title class="headline">
          <v-icon :color="iconColor" class="alert-icon">{{ icon }}</v-icon>
          {{ title }}
        </v-card-title>
        <v-card-text v-if="message !== ''" class="message-box">
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="type === 'confirm'"  variant="tonal" @click="handleCancel">
            {{ cancelText }}
          </v-btn>
          <v-btn variant="tonal" :color="buttonColor" @click="handleConfirm">
            {{ confirmText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watchEffect } from "vue";
  
  const isVisible = ref(false);
  const type = ref<"success" | "warning" | "error" | "confirm">("success");
  const title = ref("");
  const message = ref("");
  const confirmText = ref("확인");
  const cancelText = ref("취소");
  let resolveFunction: ((value: boolean) => void) | null = null;
  
  const icon = computed(() => ({
    success: "mdi-check-circle",
    warning: "mdi-alert-circle",
    error: "mdi-close-circle",
    confirm: "mdi-help-circle",
  }[type.value]));
  
  const iconColor = computed(() => ({
    success: "green",
    warning: "orange",
    error: "red",
    confirm: "blue",
  }[type.value]));
  
  const buttonColor = computed(() => ({
    success: "green",
    warning: "orange",
    error: "red",
    confirm: "blue",
  }[type.value]));
  
  const showAlert = (
    alertType: "success" | "warning" | "error" | "confirm",
    newTitle: string,
    newMessage: string,
    confirmLabel: string = "확인",
    cancelLabel: string = "취소"
  ) => {

    type.value = alertType;
    title.value = newTitle;
    message.value = newMessage || " "; // ✅ 빈 문자열 방지
    confirmText.value = confirmLabel;
    cancelText.value = cancelLabel;
    isVisible.value = true;
  
    return new Promise((resolve) => {
      resolveFunction = resolve;
    });
  };
  
  const handleConfirm = () => {
    isVisible.value = false;
    if (resolveFunction) {
      resolveFunction(true);
      resolveFunction = null;
    }
  };
  
  const handleCancel = () => {
    isVisible.value = false;
    if (resolveFunction) {
      resolveFunction(false);
      resolveFunction = null;
    }
  };
  
  defineExpose({ showAlert });
  </script>
  
  <style scoped>
  .alert-card {
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    padding: 16px 24px;
    text-align: center;
  }
  
  .headline {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: 600;
    padding: 16px;
  }
  
  .alert-icon {
    font-size: 28px;
    margin-right: 12px;
  }
  
  .message-box {
    font-size: 1rem;
    padding: 16px 20px;
    word-break: break-word;
    white-space: pre-wrap; /* ✅ 줄 바꿈 유지 */
  }
  
  .v-card-actions {
    padding: 16px;
    justify-content: flex-end;
  }
  
  .v-btn {
    min-width: 80px;
  }
  </style>
  