<template>
  <section
    class="h-full gradient-form bg-gray-200 flex items-center justify-center"
  >
    <div class="container py-12 px-6 h-full mx-auto">
      <div
        class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
      >
        <div class="xl:w-10/12">
          <div class="block bg-white shadow-lg rounded-lg">
            <div class="lg:flex lg:flex-wrap g-0 items-center">
              <div class="lg:w-6/12 px-4 md:px-0">
                <div class="md:p-12 md:mx-6">
                  <h4 class="text-xl text-center font-semibold mt-1 mb-12 pb-1">
                    Create Temp User
                  </h4>
                  <form @submit.prevent="submitHandler">
                    <p class="mb-4">Please enter user name and room name</p>
                    <UiInput
                      type="text"
                      :model-value="name"
                      @update:modelValue="name = $event"
                      placeholder="Username"
                      class="mb-5"
                    />
                    <UiButton is-full-width type="submit"> Create </UiButton>
                  </form>
                </div>
              </div>
              <div
                class="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
              >
                <ChatIllustration width="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

import { PageRoutes } from "@/common";
import { useAppStore } from "@/stores";

import ChatIllustration from "@/assets/illustration/chat.svg";

import UiButton from "@/components/UI/UiButton.vue";
import UiInput from "@/components/UI/UiInput.vue";

const router = useRouter();
const appStore = useAppStore();

const name = ref("");

const onSubmitSuccess = () => {
  router.push(PageRoutes.CHATS);
  name.value = "";
};

const submitHandler = () => {
  if (!name.value) {
    return;
  }

  appStore.login(name.value, onSubmitSuccess);
};
</script>
