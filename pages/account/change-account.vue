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
          <!-- {{ userInfo }} -->
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
                      v-model="image"
                      show-size
                      truncate-length="20"
                      @change="uploadFile"
                      accept="image/*"
                      @before-upload="validateFile"
                    ></v-file-input>
                    <v-img class="profile-photo" v-if="url" :src="url"></v-img>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6" sm="12">
                  <v-text-field
                    v-model="userInfo.bio"
                    label="Bio"
                    counter="100"
                    type="text"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="12">
                  <div>
                    <v-text-field
                      label="Color of the profile background"
                      v-model="userInfo.background_color.hex"
                      @click="showDialog = true"
                    />
                    <v-dialog max-width="290" v-model="showDialog">
                      <div class="dialog-color">
                        <v-color-picker v-model="userInfo.background_color" />
                        <v-btn class="dialog-btn" @click="showDialog = false"
                          >Save</v-btn
                        >
                      </div>
                    </v-dialog>
                  </div>
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
import userUtil from '~/utils/user.js'

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
        profile_photo_path_name: null,
        background_color: '',
        bio: '                                   ',
      },
      showDialog: false,
      url: null,
      image: null,
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
    }
  },
  mounted() {
    this.userInfo = { ...JSON.parse(localStorage.getItem('dndUser')) }
  },
  methods: {
    uploadFile(e) {
      if (e) {
        this.url = URL.createObjectURL(this.image)
      } else this.url = null
    },
    validateFile(file) {
      if (file.type.startsWith('image/')) {
        // The file is an image, so allow it to be uploaded
        return true
      } else {
        // The file is not an image, so cancel the upload
        return false
      }
    },
    hasHistory() {
      return window.history.length > 1
    },
    async updateAccount() {
      if (!this.valid) {
        this.snackbar = true
        this.snackbarText = 'Please fill information into all required fields.'
        this.snackbarColor = 'red'
        return
      }
      console.log('this.userInfo')
      console.log(this.userInfo)
      if (this.image) {
        await this.uploadImage()
      }

      await updateDocument('users', this.userInfo.uid, this.userInfo)
      userUtil.setUserInfoToLocalStorage(this.userInfo)

      this.$router.push('/account/account')
    },
    async uploadImage() {
      if (this.userInfo.profile_photo_path_name !== null) {
        await this.deleteImage()
      }
      // Get a reference to the file in Firebase Storage
      const storageRef = firebase.storage().ref()
      const fileRef = storageRef.child(
        `profile_photos/${this.userInfo.uid}/${this.image.name}`
      )
      // Save the file reference to the userInfo object
      this.userInfo.profile_photo_path_name = `profile_photos/${this.userInfo.uid}/${this.image.name}`

      // Upload the file
      await fileRef.put(this.image)
      // userUtil.setUserInfoToLocalStorage(this.userInfo)
    },
    async deleteImage() {
      const storage = firebase.storage()

      // Assume that the file is stored in a folder with the name 'files'
      const fileRef = storage.ref(this.userInfo.profile_photo_path_name)
      // Delete the file
      fileRef.delete()
      // await this.userInfo.profile_photo_path_name.delete()
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
.dialog-color {
  padding: 15px;
}
.dialog-btn {
  margin-top: 15px;
  width: 100%;
}
.profile-photo {
  margin-left: 25px;
  max-width: 70px;
  width: 70px;
  max-height: 70px;
  height: 70px;
  object-fit: cover;

  border-radius: 40px;
}
</style>
