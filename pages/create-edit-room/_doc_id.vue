<template>
  <div>
    <div class="page-head">
      <div class="flex-head">
        <div class="flex">
          <div class="ico">
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
        <CreateEditRoom :query="query"></CreateEditRoom>
      </div>
    </div>
  </div>
</template>

<script>
import CreateEditRoom from '/components/form-components/CreateEditRoom.vue'
import { getDocument } from '~/firebase'

export default {
  components: {
    CreateEditRoom,
  },
  data() {
    return {
      query: this.$route.query.doc_id,
      // roomDetails: {},
    }
  },
  async created() {
    // await this.fetchData('rooms', this.$route.query.doc_id)
  },
  methods: {
    createGame() {},
    // async fetchData(collectionProp, doc_idProp) {
    //   this.roomDetails = await getDocument(collectionProp, doc_idProp)
    // },
  },
}
</script>

<style scoped></style>
