<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/stores";
import { Layouts } from "@/common";

import WithToastsLayout from "@/components/layouts/WithToastsLayout.vue";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";

const router = useRouter();
const appStore = useAppStore();

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
      router.push("/login");
    }
  }
);

onMounted(() => {
  appStore.connect();
});
</script>
