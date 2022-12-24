<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.title"
              :rules="title_rules"
              :counter="40"
              label="Title"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.max_players"
              :rules="max_players_rules"
              label="Max amount of players"
              type="number"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-dialog
              ref="dialog"
              v-model="calendar"
              :return-value.sync="form.date_start"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.date_start"
                  label="Picker in dialog"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="form.date_start" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="calendar = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(form.date_start)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.description"
              :rules="description_rules"
              :counter="350"
              label="Description"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-btn class="btn-green" rounded @click="createGame">Create a game</v-btn>
    </v-form>
    <Snackbar
      :colorProp="snackbarColor"
      :textProp="snackbarText"
      :snackbarProp="snackbar"
      @snackbar-salfe="snackbar = false"
    >
    </Snackbar>
  </div>
</template>

<script>
import { createDocument } from '~/firebase'

export default {
  components: {},
  data() {
    return {
      valid: false,
      title_rules: [
        (v) => !!v || 'Title is required',
        (v) => v.length >= 4 || 'Title must have at least 4 characters',
      ],
      max_players_rules: [
        (v) => !!v || 'Max amount of players is required',
        (v) => v >= 2 || 'Max amount of players has to be at least 2',
        (v) => v <= 10 || 'Max amount of players can not excede 10 players',
      ],
      description_rules: [
        (v) => !!v || 'Description is required',
        (v) =>
          v.length <= 350 ||
          'Max amount of characters can not excede 350 players',
      ],
      loaded: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
      calendar: false,
      form: {
        title: '',
        description: '',
        num_of_players: 1,
        max_players: null,
        date_start: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
      },
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
    createGame() {
      if (!this.valid) {
        this.snackbar = true
        this.snackbarText = 'Please fill information into all required fields.'
        this.snackbarColor = 'red'
        return
      }
      const collection = 'rooms'
      createDocument(collection, this.form)
      this.snackbar = true
      this.snackbarText = 'Room was created successfully.'
      this.snackbarColor = 'green'
      setTimeout(() => this.$router.push('/dashboard'), 1500)
    },
  },
}
</script>
