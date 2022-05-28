<template>
  <div
    class="h-full w-full max-w-2xl border rounded grid grid-rows-[auto_1fr_auto]"
  >
    <div class="relative flex items-center p-3 border-b border-gray-300">
      <span class="block ml-2 font-bold text-gray-600">{{ roomName }}</span>
    </div>
    <div class="relative w-full p-6 overflow-y-auto">
      <ul class="space-y-2 flex flex-col">
        <template v-for="message in messages" :key="message.id">
          <ChatMessage
            :message="message"
            :current-user="appStore.user?.id || ''"
          />
        </template>
      </ul>
    </div>
    <form
      class="flex items-center justify-between w-full p-3 border-t border-gray-300"
      @submit.prevent="submitHandler"
    >
      <UiInput
        :model-value="message"
        variant="secondary"
        placeholder="Message"
        @update:modelValue="message = $event"
      />
      <UiButton variant="tertiary" type="submit" aria-label="send message">
        <ArrowIcon
          class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
        />
      </UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useAppStore } from "@/stores";
import type { Message } from "@/common";

import ArrowIcon from "@/assets/icons/arrow.svg";

import UiInput from "@/components/UI/UiInput.vue";
import UiButton from "@/components/UI/UiButton.vue";
import ChatMessage from "@/components/blocks/ChatMessage.vue";

interface Props {
  roomName: string;
  messages: Message[];
}

defineProps<Props>();
const emit = defineEmits<{ (e: "submit", body: string): void }>();

const appStore = useAppStore();

const message = ref("");

const submitHandler = () => {
  if (!message.value.trim()) {
    return;
  }

  emit("submit", message.value);
  message.value = "";
};
</script>
