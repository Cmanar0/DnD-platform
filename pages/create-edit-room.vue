<template>
  <div>
    <div class="page-head">
      <div class="flex-head">
        <div class="flex">
          <div>
            <v-icon class="big-icon icon-spinner">mdi-compass-rose</v-icon>
          </div>
          <div class="medailon">
            <h3>Share your game</h3>
            <p>don't forget to invite your friends</p>
          </div>
        </div>
        <v-btn color="rgb(98, 182, 255)" rounded @click="createGame">
          <v-icon>mdi-share</v-icon><span style="margin-left: 10px">Share</span>
        </v-btn>
      </div>
    </div>
    <div class="content-page">
      <div class="content-card">
        <CreateEditRoom :apiResult="apiResult"></CreateEditRoom>
      </div>
    </div>
  </div>
</template>

<script>
import ListOfRooms from '/components/list-components/ListOfRooms.vue'
import CreateEditRoom from '/components/form-components/CreateEditRoom.vue'

import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { createDocument } from '~/firebase'

export default {
  components: {
    ListOfRooms,
    CreateEditRoom,
  },
  data() {
    return {}
  },

  methods: {
    createGame() {},
  },
}
</script>

<style scoped></style>
