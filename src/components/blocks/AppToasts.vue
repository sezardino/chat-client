<template>
  <Teleport to="#toasts-wrapper">
    <div class="fixed right-4 top-3">
      <template v-for="toast in store.toasts" :key="toast.title">
        <div
          class="grid gap-4 grid-cols-[auto_auto_auto] items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow"
          role="alert"
        >
          <div
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"
            :class="{
              'text-green-500 bg-green-100': toast.type === 'success',
              'text-orange-500 bg-orange-100': toast.type === 'info',
              'text-red-500 bg-red-100': toast.type === 'error',
            }"
          >
            <component :is="getIcon(toast.type)" class="w-5 h-5" />
          </div>
          <div class="text-sm font-normal">{{ toast.title }}</div>
          <button
            type="button"
            class="bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
            aria-label="Close"
            @click="store.deleteToast(toast.title)"
          >
            <CrossIcon />
          </button>
        </div>
      </template>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import type { Notification } from "@/types";
import { useApp } from "@/stores";

import CrossIcon from "@/assets/icons/cross.svg";
import CheckIcon from "@/assets/icons/check.svg";
import InfoIcon from "@/assets/icons/info.svg";

const store = useApp();

const getIcon = (type: Notification["type"]) => {
  return type === "success"
    ? CheckIcon
    : type === "info"
    ? InfoIcon
    : CrossIcon;
};
</script>
