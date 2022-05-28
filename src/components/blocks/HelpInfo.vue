<template>
  <section class="text-gray-600 body-font">
    <h1 class="sr-only">How To Start Using app</h1>
    <div class="container px-5 py-24 mx-auto flex flex-wrap">
      <div class="flex flex-wrap w-full justify-center items-center">
        <ul class="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
          <template v-for="step in steps" :key="step.title">
            <li class="flex relative pb-12 last:pb-0 group">
              <div
                class="group-last:hidden h-full w-10 absolute inset-0 flex items-center justify-center"
              >
                <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div
                class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10"
              >
                <component class="w-5 h-5" :is="step.icon" />
              </div>
              <div class="flex-grow pl-4">
                <h2
                  class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider"
                >
                  {{ step.title }}
                </h2>
                <p class="leading-relaxed">
                  {{ step.content }}
                </p>
              </div>
            </li>
          </template>
        </ul>
        <InfoIllustration />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import InfoIllustration from "@/assets/illustration/info.svg";

import ShieldIcon from "@/assets/icons/shield.svg";
import NailsIcon from "@/assets/icons/nails.svg";
import InfoIcon from "@/assets/icons/info.svg";
import CheckIcon from "@/assets/icons/check.svg";

const steps = [
  {
    title: "Login",
    content: "Just click login page, and you will redirect to login page",
    icon: ShieldIcon,
  },
  {
    title: "Create temporal username",
    content: "Just enter any username",
    icon: NailsIcon,
  },
  {
    title: "Create or join room",
    content: "Create or join the room, and you are ready to go!",
    icon: InfoIcon,
  },
  {
    title: "Start chatting",
    content: "Just start chatting",
    icon: CheckIcon,
  },
];
</script>
