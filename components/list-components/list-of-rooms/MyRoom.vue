<template>
  <div @click="openRoomDetail(item.doc_id)">
    <div class="custom-pad no-inherit">
      <div class="flex" style="max-width: calc(100% - 105px) !important">
        <div class="custom-room-medailon">
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
          </v-list-item-avatar>
          <div class="flex-col text">
            <h3 v-text="item.title"></h3>
            <p v-text="item.date_start"></p>
          </div>
        </div>
        <div class="text">
          <div class="flex">
            <span>
              <h4>{{ item.title }}</h4></span
            >
            <span v-text="item.date_start"></span>
            <span class="players"
              >{{ item.num_of_players }} / {{ item.max_players }} Players</span
            >
          </div>

          <v-list-item-title
            class="description"
            v-text="item.description"
          ></v-list-item-title>
        </div>
      </div>
      <v-list-item-action>
        <div class="left-icons no-inherit">
          <v-btn v-if="item.private" icon class="btn-icon">
            <v-icon color="grey ">mdi-lock </v-icon>
          </v-btn>

          <v-menu offset-y bottom left>
            <template v-slot:activator="{ attrs, on }">
              <v-btn icon class="btn-icon" v-bind="attrs" v-on="on">
                <v-icon color="grey ">mdi-dots-vertical </v-icon>
                <!-- <v-icon color="grey ">mdi-square-edit-outline </v-icon> -->
              </v-btn>
            </template>

            <v-list>
              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click="handleClick(index)"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-list>
          </v-menu>

          <DialogDelete
            v-if="dialogs.delete"
            @close="dialogs.delete = false"
            :item="dialogProps"
          />
          <DialogEdit
            v-if="dialogs.edit"
            @close="dialogs.edit = false"
            :item="dialogProps"
          />
        </div>
      </v-list-item-action>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: ['item', 'id'],
  components: {},
  data() {
    return {
      dialogs: {
        edit: false,
        dueDate: false,
        delete: false,
      },
      icons: [
        'mdi-dots-vertical',
        'mdi-dots-vertical',
        'mdi-square-edit-outline',
      ],
      dialogProps: {},
      items: [
        {
          title: 'Edit',
          icon: 'mdi-pencil',
          click() {
            this.dialogs.edit = true
          },
          text: 'Do you want to edit this room?',
          path: `/create-edit-room`,
          query: { doc_id: this.item.doc_id },
        },
        {
          title: 'Delete',
          icon: 'mdi-delete',
          click() {
            this.dialogs.delete = true
          },
          text: 'Do you want to delete this room?',
        },
      ],
    }
  },
  watch: {},
  methods: {
    handleClick(index) {
      this.items[index].click.call(this)
      this.dialogProps = { ...this.items[index] }
    },
    openRoomDetail(doc_id) {
      console.log(doc_id)
      this.$router.push({
        path: `/room-detail`,
        query: { doc_id: doc_id },
      })
    },
  },
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
  max-width: 150px;
  min-width: 150px;
  width: 150px;
  display: flex;
  justify-content: flex-start;
}
.text {
  text-overflow: ellipsis;
  overflow: hidden;
}
.description {
  color: rgb(159, 159, 159);
}
.players {
  margin-top: 5px;
  padding: 0 5px;
  background-color: rgba(164, 216, 90, 0.372);
  border-radius: 15px;
}
.btn-icon :hover {
  max-width: 0;
}
.left-icons {
  min-width: 76px;
  display: flex;
  justify-content: flex-end;
}
</style>
