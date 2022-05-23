<template>
  <div class="min-h-screen grid grid-rows-[auto_1fr]">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
  <AppToasts />
</template>

<script lang="ts" setup>
import AppHeader from "@/components/blocks/AppHeader.vue";
import AppToasts from "@/components/blocks/AppToasts.vue";
</script>
