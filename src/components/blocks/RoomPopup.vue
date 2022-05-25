<template>
  <UiButton variant="primary" @click="isOpen = true">
    {{ buttonLabel }}
  </UiButton>
  <UiPopup :is-open="isOpen" @close-modal="isOpen = false">
    <div class="min-w-[30vw]">
      <div
        class="modal-header flex flex-shrink-0 pb-4 items-center justify-between border-b border-gray-200 rounded-t-md"
      >
        <h5
          class="text-xl font-medium leading-normal text-gray-800"
          id="exampleModalLabel"
        >
          {{ label }}
        </h5>
      </div>
      <form class="mt-4" @submit.prevent="submitHandler">
        <UiInput
          :model-value="roomName"
          placeholder="Enter room name"
          name="room-name"
          @update:modelValue="roomName = $event"
        />
        <div
          class="mt-4 pt-4 flex flex-shrink-0 flex-wrap items-center border-t border-gray-200 rounded-b-md"
        >
          <UiButton type="submit">
            {{ buttonLabel }}
          </UiButton>
          <UiButton
            variant="secondary"
            type="button"
            class="border-4 text-teal-500 hover:text-teal-800"
            @click="cancelHandler"
          >
            Cancel
          </UiButton>
        </div>
      </form>
    </div>
  </UiPopup>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import UiPopup from "@/components/UI/UiPopup.vue";
import UiButton from "@/components/UI/UiButton.vue";
import UiInput from "@/components/UI/UiInput.vue";

interface Props {
  buttonLabel: string;
  label: string;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "submit", roomName: string, cb: () => void): void;
}>();

const isOpen = ref(false);
const roomName = ref("");

const cancelHandler = () => {
  isOpen.value = false;
  roomName.value = "";
};

const successHandler = () => {
  isOpen.value = false;
  roomName.value = "";
};

const submitHandler = () => {
  if (!roomName.value) {
    return;
  }

  emit("submit", roomName.value, successHandler);
};
</script>
