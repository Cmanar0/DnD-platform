<template>
  <div>
    <v-card>
      <v-card-title>
        Rooms created by you
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <MyRoom
        class="room"
        v-for="(room, index) in myRooms"
        :key="index"
        :item="room"
      ></MyRoom>
      <!-- <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      ></v-data-table> -->
    </v-card>
  </div>
</template>

<script>
import MyRoom from '/components/list-components/list-of-rooms/MyRoom.vue'
import { getCollection } from '~/firebase'

export default {
  components: {
    MyRoom,
  },
  data() {
    return {
      search: '',
      myRooms: {},
    }
  },
  async created() {
    await this.fetchData('rooms')
  },
  methods: {
    async fetchData(collectionProp) {
      this.myRooms = await getCollection(collectionProp)
      // this.myRooms = [...getCollection(collectionProp)]
      this.snackbar = true
      this.snackbarText = 'Room was created successfully.'
      this.snackbarColor = 'green'
      setTimeout(() => this.$router.push('/dashboard'), 1500)
    },
  },
}
</script>

<style></style>
