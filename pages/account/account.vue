<template>
  <div>
    <div class="page-head">
      <div class="flex-head">
        <div class="flex">
          <div class="ico">
            <v-icon class="big-icon icon-spinner">mdi-account </v-icon>
          </div>
          <div class="medailon">
            <h3>Your account information</h3>
            <p>
              Update your information so other users can get to know you better
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-page">
      <div class="profile-head" id="top">
        <div>
          <div
            v-if="userInfo.profile_photo_path_name !== null"
            class="pic-wrap"
          >
            <img id="profile-img" />
          </div>
          <div v-else class="icon-wrap">
            <v-icon style="padding: 0" class="profile-icon" dark>
              mdi-account-circle
            </v-icon>
          </div>
          <div class="name" id="name">
            <h1>
              {{ userInfo.nickname }}
            </h1>
          </div>
          <div class="edit">
            <v-btn
              rounded
              class="ma-2"
              :loading="loading4"
              :disabled="loading4"
              color="secondary"
              @click="edit"
            >
              Edit
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
            </v-btn>
          </div>
        </div>
      </div>
      <div class="profile-body">
        <div class="about-me">About me:</div>
        <div class="bio">
          {{ userInfo.bio }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'

export default {
  data() {
    return {
      userInfo: {},
      loader: null,
      loading4: false,
    }
  },
  mounted() {
    this.userInfo = { ...JSON.parse(localStorage.getItem('dndUser')) }
    if (this.userInfo.profile_photo_path_name !== null) {
      const storage = firebase.storage()
      const imageRef = storage
        .ref()
        .child(this.userInfo.profile_photo_path_name)
      imageRef.getDownloadURL().then(function (url) {
        const imgElement = document.getElementById('profile-img')
        imgElement.src = url
      })
    }
    if (this.userInfo.background_color !== null) {
      const element = document.getElementById('top')
      element.style.backgroundColor = this.userInfo.background_color.hex

      // Check the brightness of the background color
      const brightness =
        (this.userInfo.background_color.rgba.r * 299 +
          this.userInfo.background_color.rgba.g * 587 +
          this.userInfo.background_color.rgba.b * 114) /
        1000

      const nameelement = document.getElementById('name')

      if (brightness > 125) {
        // Set text color to black if background is light
        nameelement.style.color = 'black'
      } else {
        // Set text color to white if background is dark
        nameelement.style.color = 'white'
      }
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 1000)

      this.loader = null
    },
  },
  methods: {
    edit() {
      this.loader = 'loading4'
      setTimeout(() => this.$router.push('/account/change-account'), 1000)
    },
  },
}
</script>
<style scoped>
.profile-head {
  background-color: rgba(164, 118, 19, 0.694);
  border-radius: 10px 10px 0 0;
}
.profile-body {
  background-color: rgb(255, 255, 255);
  border-radius: 0 0 10px 10px;
  display: flex;
}
.custom {
  padding: 0 15px 0 40px !important;
}
.edit {
  padding: 0 15px 10px 0;
  display: flex;
  justify-content: right;
}

.name {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.about-me {
  padding: 20px;
}
.bio {
  padding: 20px;
}

.pic-wrap {
  padding: 50px 0 0 0;
  display: flex;
  justify-content: center;
}

.profile-icon {
  scale: 4;
  margin: 25px;
}

.icon-wrap {
  padding: 50px 0 0 0;
  display: flex;
  justify-content: center;
}
#profile-img {
  max-width: 150px;
  width: 150px;
  max-height: 150px;
  height: 150px;
  border-radius: 75px;
  border: 3px solid white;
  object-fit: cover;
}
</style>
