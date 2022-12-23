<template>
  <div>
    <v-text-field
      v-model="form.title"
      label="Title"
      type="text"
      required
    ></v-text-field>
    <v-btn color="rgb(98, 182, 255)" rounded @click="createGame"
      >Create a game</v-btn
    >
  </div>
</template>

<script>
import ListOfRooms from '/components/list-components/ListOfRooms.vue'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { createDocument } from '~/firebase'

export default {
  components: {
    ListOfRooms,
  },
  data() {
    return {
      apiResult: [],
      loaded: false,
      form: {
        title: '',
      },
      games: [],
    }
  },
  watch: {
    // loaded(val) {
    //   if (!val) return
    //   setTimeout(() => (this.loaded = false), 800)
    // },
  },
  created() {},
  methods: {
    fetchData() {
      db.collection('rooms').get()
    },
    createGame() {
      const collection = 'games'
      createDocument(collection, this.form)
    },
  },
}
</script>
