<template>
  <div>
    <div class="page-head">
      <div class="flex-head">
        <div class="flex">
          <div class="ico">
            <v-icon class="big-icon icon-spinner">mdi-account </v-icon>
          </div>
          <div class="medailon">
            <h3>Edit your account information</h3>
            <p>
              Update your information so other users can get to know you better
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-page">
      <div class="content-card">
        <v-card-text>
          <v-container>
            <v-form v-model="valid">
              <v-row>
                <v-col cols="12" md="6" sm="12">
                  <v-text-field
                    v-model="userInfo.nickname"
                    label="Nickname"
                    :rules="nicknameRules"
                    type="text"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6" sm="12">
                  <div class="pic-input">
                    <v-file-input
                      label="Choose photo"
                      v-model="userInfo.image"
                      show-size
                      truncate-length="20"
                      @change="uploadFile"
                    ></v-file-input>
                    <v-img class="profile-photo" v-if="url" :src="url"></v-img>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="userInfo.bio"
                    label="Bio"
                    counter="100"
                    type="text"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-btn
                    style="width: 100%"
                    class="btn-green"
                    rounded
                    @click="updateAccount"
                    >Update</v-btn
                  >
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    style="width: 100%"
                    rounded
                    outlined
                    @click="
                      () =>
                        this.hasHistory()
                          ? this.$router.go(-1)
                          : this.$router('/')
                    "
                    >Back</v-btn
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
import { updateDocument } from '~/firebase'

export default {
  components: { Snackbar },
  data() {
    return {
      valid: false,
      nicknameRules: [
        (v) => !!v || 'Nickname is required',
        (v) => v.length >= 4 || 'Nickname must have at least 4 characters',
      ],

      userInfo: {
        nickname: ' ',
        image: null,
        bio: '                                   ',
      },
      url: null,
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
    }
  },
  mounted() {
    this.userInfo = { ...JSON.parse(localStorage.getItem('dndUser')) }
    if (this.userInfo.image !== null) {
      this.url = URL.createObjectURL(this.image)
    }
  },
  methods: {
    uploadFile(e) {
      if (e) {
        this.url = URL.createObjectURL(this.userInfo.image)
      } else this.url = null
    },
    hasHistory() {
      return window.history.length > 1
    },
    updateAccount() {
      if (!this.valid) {
        this.snackbar = true
        this.snackbarText = 'Please fill information into all required fields.'
        this.snackbarColor = 'red'
        return
      }

      updateDocument('users', this.userInfo.uid, this.userInfo)

      // var user = firebase.auth().currentUser

      // // Update the user's password
      // user
      //   .updatePassword(this.newPassword)
      //   .then(() => {
      //     this.snackbarColor = 'green'
      //     this.snackbarText = 'Your information was updated successfully'
      //     this.snackbar = true
      //     this.newPassword = ''
      //     this.newPasswordAgain = ''
      //   })
      //   .catch((error) => {
      //     this.snackbarColor = 'red'
      //     this.snackbarText = error
      //     this.snackbar = true
      //   })
    },
  },
}
</script>
<style scoped>
.custom {
  padding: 0 15px 0 40px !important;
}
.btn-left {
  display: flex;
  justify-content: flex-start;
}
.pic-input {
  display: flex;
}
.profile-photo {
  margin-left: 25px;
  max-width: 70px;
  max-height: 70px;
  border-radius: 40px;
}
</style>
