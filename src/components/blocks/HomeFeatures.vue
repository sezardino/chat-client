<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
      <div class="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
        <FeatureIllustration />
      </div>
      <div
        class="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center"
      >
        <template v-for="item in data" :key="item.title">
          <div class="flex flex-col mb-10 lg:items-start items-center">
            <div
              class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5"
            >
              <component :is="item.icon" class="w-6 h-6" />
            </div>
            <div class="flex-grow">
              <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                {{ item.title }}
              </h2>
              <p class="leading-relaxed text-base mb-4">
                {{ item.content }}
              </p>
              <UiButton
                :to="PageRoutes.HELP"
                :variant="'secondary'"
                class="pl-0"
              >
                Learn More
                <ArrowIcon class="inline w-4 h-4 ml-2" />
              </UiButton>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PageRoutes } from "@/common";

import UiButton from "@/components/UI/UiButton.vue";

import FeatureIllustration from "@/assets/illustration/features.svg";
import ArrowIcon from "@/assets/icons/arrow-2.svg";
import NailIcon from "@/assets/icons/nails.svg";
import UsersIcon from "@/assets/icons/users.svg";

const data = [
  {
    title: "Anonymous messaging",
    content:
      "User and message data is stored on server, when you logout, user data is deleted. Wont to login, just enter any username",
    icon: UsersIcon,
  },
  {
    title: "Simple usage",
    content:
      "Just enter any username and create or join the room, and you are ready to go!",
    icon: NailIcon,
  },
];
</script>
