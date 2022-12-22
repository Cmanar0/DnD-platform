<template>
  <div>
    <br />
    <h1>Change your password</h1>
    <br />
    <v-container>
      <v-card-text>
        <v-container>
          <v-form>
            <v-text-field
              v-model="newPassword"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-form>
          <br />

          <v-btn block color="rgb(98, 182, 255)" rounded @click="changePassword"
            >Update password</v-btn
          >
        </v-container>
        <v-snackbar color="green" v-model="snackbar">
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-card-text>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export default {
  components: {},
  data() {
    return {
      newPassword: '',
      snackbar: false,
      text: '',
    }
  },
  methods: {
    changePassword() {
      if (this.newPassword === '') {
        this.snackbar = true
        this.text = 'Please enter your new password.'
        return
      }
      var user = firebase.auth().currentUser

      // Update the user's password
      user
        .updatePassword(this.newPassword)
        .then(() => {
          this.snackbar = true
          this.text = 'Your password was updated successfully.'
          this.newPassword = ''
        })
        .catch((error) => {
          this.snackbar = true
          this.text = error
        })
    },
  },
}
</script>
<style scoped></style>
