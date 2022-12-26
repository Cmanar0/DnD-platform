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
import firebase from 'firebase/compat/app'

export default {
  components: {
    MyRoom,
  },
  data() {
    return {
      userUid: null,
      search: '',
      myRooms: [],
    }
  },
  async created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.userUid = user.uid
    })
    await this.fetchData('rooms')
  },
  methods: {
    async fetchData(collection) {
      let allRooms = await getCollection(collection)

      this.myRooms = [
        ...allRooms.filter((room) => room.uid_of_creator === this.userUid),
      ]
      console.log('myRooms', this.myRooms)
      console.log('allRooms', allRooms)
    },
  },
}
</script>

<style></style>
