<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { useApp, useSocketStore } from "@/stores";
import { Layouts } from "@/types";

import WithToastsLayout from "@/components/layouts/WithToastsLayout.vue";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";

const route = useRoute();
const appStore = useApp();

const layout = computed(() => {
  if (useRoute().meta.layout === Layouts.DEFAULT) {
    return DefaultLayout;
  }

  return WithToastsLayout;
});

watch(
  () => appStore.user,
  (newValue, oldValue) => {
    if (oldValue && !newValue) {
      useRouter().push("/login");
    }
  }
);

</script>
