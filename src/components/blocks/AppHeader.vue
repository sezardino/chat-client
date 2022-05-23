<template>
  <nav
    class="flex items-center justify-between flex-wrap bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-6"
  >
    <div class="container mx-auto flex flex-wrap gap-8 justify-between">
      <router-link to="/">
        <LogoIcon class="text-white" />
      </router-link>
      <button
        class="flex lg:hidden items-center px-3 py-2 border rounded text-white border-white hover:bg-black hover:bg-opacity-20"
        aria-label="open menu"
        @click="isOpen = !isOpen"
      >
        <HamburgerIcon class="fill-current h-3 w-3" />
      </button>
      <div
        :class="{ hidden: !isOpen }"
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto"
      >
        <ul
          class="mt-4 lg:mt-0 text-sm lg:flex-grow flex flex-col lg:flex-row gap-2"
        >
          <template v-for="link in headerLinks" :key="link.to">
            <li>
              <UiButton
                :to="link.to"
                variant="secondary"
                class="text-white hover:text-slate-200"
              >
                {{ link.name }}
              </UiButton>
            </li>
          </template>
        </ul>
        <div>
          <UiButton
            v-if="!appStore.user"
            variant="tertiary"
            :to="PageRoutes.LOGIN"
          >
            Login
          </UiButton>
          <UiButton
            v-if="appStore.user"
            variant="tertiary"
            @click="socketStore.logout"
          >
            Logout
          </UiButton>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { PageRoutes } from "@/types";
import UiButton from "@/components/UI/UiButton.vue";
import { useApp, useSocketStore } from "@/stores";

import LogoIcon from "@/assets/images/logo.svg";
import HamburgerIcon from "@/assets/icons/hamburger.svg";

const appStore = useApp();
const socketStore = useSocketStore();
const isOpen = ref(false);

const headerLinks = [
  {
    name: "Home",
    to: PageRoutes.HOME,
  },
  {
    name: "Help",
    to: PageRoutes.HELP,
  },
];
</script>
