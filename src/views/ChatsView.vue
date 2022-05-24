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
      :room-name="room.id"
      :messages="[
        { id: '1', body: 'dwd', date: Date.now(), from: appStore.user! },
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
import RoomPopup from "@/components/blocks/RoomPopup.vue";
import ChatRoom from "@/components/blocks/ChatRoom.vue";
import { useApp, useSocketStore } from "@/stores";
import { computed, watch } from "vue";

const socketStore = useSocketStore();
const appStore = useApp();

const createRoomHandler = (roomName: string, successHandler: () => void) => {
  socketStore.createRoom(roomName, successHandler);
};

const joinRoomHandler = (roomName: string, successHandler: () => void) => {
  socketStore.joinRoom(roomName, successHandler);
};

const room = computed(() => {
  if (!appStore.user) {
    return;
  }

  return appStore.user.rooms[0];
});
</script>
