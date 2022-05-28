<template>
  <section class="text-gray-600 body-font">
    <div
      class="container mx-auto flex px-5 py-24 items-center justify-center flex-col"
    >
      <HeroIllustration class="max-w-md mb-5" />
      <div class="text-center lg:w-2/3 w-full">
        <h1
          class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900"
        >
          CHATED
        </h1>
        <p class="mb-8 leading-relaxed">
          Simple application for sharing messages between users.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <UiButton :to="PageRoutes.LOGIN"> Try it! </UiButton>
          <UiButton :to="PageRoutes.HELP"> How it Works </UiButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PageRoutes } from "@/common";
import UiButton from "@/components/UI/UiButton.vue";

import HeroIllustration from "@/assets/illustration/hero.svg";
</script>
