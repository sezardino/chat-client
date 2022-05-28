<template>
  <li
    ref="wrapperRef"
    class="flex"
    :class="{
      'my-5 border-b flex-row': !message.from,
      'flex-col': message.from,
      'items-end': message.from && message.from.id === currentUser,
      'items-start': message.from && message.from.id !== currentUser,
    }"
  >
    <template v-if="message.from">
      <span class="block text-xs">{{ message.from.name }}</span>
      <div
        class="relative max-w-[95%] lg:max-w-lg px-4 py-2 text-slate-100 rounded shadow"
        :class="background"
      >
        <span class="block text-md break-words">{{ message.body }}</span>
        <span class="block text-right text-sm">
          {{ getDate(message.date) }}
        </span>
      </div>
    </template>
    <template v-else>
      <span class="ml-auto text-md">{{ message.body }}</span>
      <span class="ml-auto text-xs">{{ getDate(message.date) }}</span>
    </template>
  </li>
</template>

<script lang="ts" setup>
import { getDate, type Message, type User } from "@/common";
import { onMounted, ref } from "vue";

interface Props {
  message: Message;
  currentUser: User["id"];
}

const props = defineProps<Props>();
const wrapperRef = ref<HTMLLIElement | null>(null);

const background = !props.message.from
  ? ""
  : props.message.from.id !== props.currentUser
  ? "bg-gradient-to-bl from-orange-400 to-rose-400"
  : "bg-gradient-to-br from-rose-500 via-red-400 to-red-500";

onMounted(() => {
  if (!wrapperRef.value) {
    return;
  }

  wrapperRef.value.scrollIntoView({ behavior: "smooth" });
});
</script>
