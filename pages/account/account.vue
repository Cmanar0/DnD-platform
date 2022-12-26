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
      <div class="content-card profile-head">
        <div>
          {{ userInfo.nickname }}
        </div>
        {{ userInfo.nickname }}
        <div>
          {{ userInfo.bio }}
        </div>
        <div>
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
  </div>
</template>

<script>
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
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
}
.custom {
  padding: 0 15px 0 40px !important;
}
</style>
