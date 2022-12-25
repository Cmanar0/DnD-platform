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
          {{ form.max_playersNum }}
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
        <v-row>
          <v-col cols="12" md="4">
            <v-switch v-model="form.private" label="Private game"></v-switch>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.password"
              :rules="password_rules_computed"
              :counter="10"
              label="Password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-btn
        :disabled="disable"
        class="btn-green"
        rounded
        @click="createGame"
        >{{ btnComputed }}</v-btn
      >
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
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getDocument } from '~/firebase'
import { updateDocument } from '~/firebase'

export default {
  components: {},
  props: {
    query: {
      default: null,
    },
  },
  data() {
    return {
      roomDetails: null,
      valid: false,
      password_rules: [
        (v) => !!v || 'Title is required',
        (v) => v.length >= 4 || 'Title must have at least 4 characters',
      ],
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
        (v) =>
          v.length >= 20 ||
          'Min amount of characters can not be less than 20 players',
      ],
      loaded: false,
      disable: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
      calendar: false,
      form: {
        uid_of_creator: null,
        title: '',
        password: '',
        description: '',
        private: false,
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
    max_players(newValue) {
      this.max_players = Number(newValue)
    },
  },
  computed: {
    btnComputed: function () {
      if (this.roomDetails !== null) {
        return 'Update'
      } else return 'Create a room'
    },
    password_rules_computed: function () {
      if (this.form.private) {
        return this.password_rules
      } else {
        return []
      }
    },
  },
  async created() {
    if (this.query !== null) {
      await this.fetchData('rooms', this.query)
      if (this.roomDetails) {
        Object.assign(this.form, this.roomDetails)
      }
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user && this.roomDetails && this.form.uid_of_creator !== user.uid) {
        this.$router.push('/dashboard')
      } else if (
        user &&
        this.roomDetails &&
        this.form.uid_of_creator === user.uid
      ) {
        console.log('user se shoduje s tvurcem roomu')
      } else {
        this.form.uid_of_creator = user.uid
      }
    })
  },

  methods: {
    async fetchData(collectionProp, doc_idProp) {
      this.roomDetails = await getDocument(collectionProp, doc_idProp)
    },
    createUniqueId() {
      // Generate a random number between 1 and 1000
      const uniqueValue = Math.floor(Math.random() * 1000) + 1
      // Prefix the unique value with "room"
      const uniqueId = 'room' + uniqueValue
      return uniqueId
    },
    createGame() {
      if (!this.valid) {
        this.snackbar = true
        this.snackbarText = 'Please fill information into all required fields.'
        this.snackbarColor = 'red'
        return
      }
      const collection = 'rooms'
      this.disable = true

      if (this.roomDetails === null) {
        createDocument(collection, this.form)
        this.snackbar = true
        this.snackbarText = 'Room was created successfully.'
        this.snackbarColor = 'green'
        setTimeout(() => this.$router.push('/dashboard'), 1500)
      } else {
        updateDocument(collection, this.form.doc_id, this.form)
        this.snackbar = true
        this.snackbarText = 'Room was updated successfully.'
        this.snackbarColor = 'green'
        setTimeout(() => this.$router.push('/dashboard'), 1500)
      }
    },
  },
}
</script>
