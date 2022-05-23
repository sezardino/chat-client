<template>
  <div class="min-h-screen grid grid-rows-[auto_1fr]">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from "@/components/blocks/AppHeader.vue";
</script>
