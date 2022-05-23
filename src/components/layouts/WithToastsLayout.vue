<template>
  <div class="min-h-screen grid grid-rows-[auto_1fr]">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
  <UiToasts />
</template>

<script lang="ts" setup>
import AppHeader from "@/components/blocks/AppHeader.vue";
import UiToasts from "@/components/UI/UiToasts.vue";
</script>
