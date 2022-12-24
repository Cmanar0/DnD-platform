<template>
  <div>
    <div class="custom-pad no-inherit">
      <div class="flex" style="max-width: calc(100% - 60px) !important">
        <div class="custom-room-medailon">
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
          </v-list-item-avatar>
          <div class="flex-col">
            <h3 v-text="item.title"></h3>
            <p v-text="item.date_start"></p>
          </div>
        </div>
        <v-list-item-content class="text">
          <v-list-item-title v-text="item.description"></v-list-item-title>

          <v-list-item-subtitle v-text="item.title"></v-list-item-subtitle>
        </v-list-item-content>
      </div>
      <v-list-item-action>
        <v-btn icon class="btn-icon">
          <v-icon color="grey ">mdi-square-edit-outline </v-icon>
        </v-btn>
      </v-list-item-action>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {}
  },
  watch: {},
}
</script>
<style scoped>
p {
  margin: 0;
}
.custom-pad {
  padding: 5px 15px 5px 25px;
  display: flex;
  gap: 10px;
}
.no-inherit :hover {
  background-color: rgba(238, 238, 238, 0);
}

.custom-room-medailon {
  display: flex;
  justify-content: center;
}
.text {
  text-overflow: ellipsis;
  overflow: hidden;
}
.btn-icon :hover {
  max-width: 0;
}
</style>
