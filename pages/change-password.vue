<template>
  <div>
    <div class="page-head">
      <div class="flex-head">
        <div class="flex">
          <div class="ico">
            <v-icon class="big-icon icon-spinner">mdi-lock-reset</v-icon>
          </div>
          <div class="medailon">
            <h3>Change your password</h3>
            <p>Your password will be changed immediatelly</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-page">
      <div class="content-card">
        <v-card-text>
          <v-container>
            <v-form>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="newPassword"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="newPasswordAgain"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="flex flex-center custom">
                  <v-btn color="success" rounded @click="changePassword"
                    >Update password</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <Snackbar
            :colorProp="snackbarColor"
            :textProp="snackbarText"
            :snackbarProp="snackbar"
            @snackbar-salfe="snackbar = false"
          >
          </Snackbar>
        </v-card-text>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import Snackbar from '/components/shared/Snackbar.vue'

export default {
  components: { Snackbar },
  data() {
    return {
      newPassword: '',
      newPasswordAgain: '',
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
    }
  },
  methods: {
    changePassword() {
      if (
        this.newPassword === '' ||
        this.newPassword !== this.newPasswordAgain
      ) {
        this.snackbar = true
        this.snackbarText = 'Please enter your new password correctly.'
        return
      }
      var user = firebase.auth().currentUser

      // Update the user's password
      user
        .updatePassword(this.newPassword)
        .then(() => {
          this.snackbarColor = 'green'
          this.snackbarText =
            'We sent you an email. Check also your spam folder.'
          this.snackbar = true
          this.newPassword = ''
          this.newPasswordAgain = ''
        })
        .catch((error) => {
          this.snackbarColor = 'red'
          this.snackbarText = error
          this.snackbar = true
        })
    },
  },
}
</script>
<style scoped>
.custom {
  padding: 0 15px 0 40px !important;
}
</style>
