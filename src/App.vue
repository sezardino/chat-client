<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { computed, onMounted, onUnmounted } from "vue";
import UiToasts from "./components/UI/UiToasts.vue";
import DefaultLayout from "./components/layouts/DefaultLayout.vue";
import WithToastsLayout from "./components/layouts/WithToastsLayout.vue";
import { Layouts } from "./types";

const route = useRoute();

const layout = computed(() => {
  if (route.meta.layout === Layouts.DEFAULT) {
    return DefaultLayout;
  }

  return WithToastsLayout;
});

</script>
