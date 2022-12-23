<template>
  <div>
    <div class="page-head">
      <div class="flex-head">
        <div class="flex">
          <div>
            <v-icon class="big-icon icon-spinner">mdi-compass-rose</v-icon>
          </div>
          <div class="medailon">
            <h3>Create a new room of your own game</h3>
            <p>and invite friends</p>
          </div>
        </div>
        <v-btn class="btn-green create-btn" rounded @click="createGame">
          <v-icon class="btn-icon-spinner">mdi-plus-circle</v-icon>
          <span style="margin-left: 10px">Create a game</span></v-btn
        >
      </div>
    </div>

    <div class="content-page">
      <ListOfRooms :apiResult="apiResult"></ListOfRooms>
    </div>
  </div>
</template>

<script>
import ListOfRooms from '/components/list-components/ListOfRooms.vue'
import CreateEditRoom from '/components/form-components/CreateEditRoom.vue'

export default {
  components: {
    ListOfRooms,
    CreateEditRoom,
  },
  data() {
    return {}
  },

  methods: {
    createGame() {
      this.$router.push('/create-edit-room')
    },
  },
}
</script>

<style scoped>
.create-btn {
  height: 50px !important;
  border-radius: 25px !important;
}
</style>
