<template>
  <div class="h-full flex justify-center items-center">
    <div v-if="!room" class="grid gap-3">
      <RoomPopup
        label="Create Room"
        button-label="Create Room"
        @submit="createRoomHandler"
      />
      <RoomPopup
        label="Join Room"
        button-label="Join Room"
        @submit="joinRoomHandler"
      />
    </div>
    <ChatRoom
      v-if="room"
      :room-name="room.name"
      :messages="appStore.rooms[0].messages"
      @submit="sendMessageHandler"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from "vue";
import { useApp, useSocketStore } from "@/stores";

import RoomPopup from "@/components/blocks/RoomPopup.vue";
import ChatRoom from "@/components/blocks/ChatRoom.vue";

const socketStore = useSocketStore();
const appStore = useApp();

const createRoomHandler = (roomName: string, successHandler: () => void) => {
  socketStore.createRoom(roomName, successHandler);
};

const joinRoomHandler = (roomName: string, successHandler: () => void) => {
  socketStore.joinRoom(roomName, successHandler);
};

const sendMessageHandler = (body: string) => {
  socketStore.sendMessage(body);
};

const room = computed(() => {
  if (!appStore.user) {
    return;
  }

  return appStore.rooms[0];
});

watch(room, (newValue) => {
  if (newValue) {
    socketStore.subscribe();
    return;
  }
});
</script>
