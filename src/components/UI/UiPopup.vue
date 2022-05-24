<template>
  <Teleport to="#modals-wrapper">
    <div
      v-show="isOpen"
      class="fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center"
      tabindex="-1"
      :aria-hidden="isOpen"
      @click="$emit('close-modal')"
    >
      <div class="relative w-auto pointer-events-none" @click.stop>
        <div
          class="border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current p-4"
        >
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
interface Props {
  isOpen: boolean;
}

defineProps<Props>();
defineEmits<{ (e: "close-modal"): void }>();
</script>
