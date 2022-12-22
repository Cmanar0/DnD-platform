<template>
  <div class="credentials-background">
    <div class="flex-center credentials-offset-top">
      <!-- <button @click="loadingProgress">cdssd</button> -->

      <div class="credential-card">
        <v-card>
          <v-tabs
            v-model="tab"
            style="width: 600px !important"
            class="flex-center"
            block
            icons-and-text
          >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1">
              Login
              <v-icon>mdi-account-check</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
              Register
              <v-icon>mdi-account-plus</v-icon>
            </v-tab>

            <v-tab href="#tab-3">
              Forgot Password
              <v-icon>mdi-account-box</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items style="width: 600px" v-model="tab">
            <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
              <Login :index="i"> </Login>
              <Register :index="i"> </Register>
              <ForgottenPassword :index="i"> </ForgottenPassword>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '~/components/credentials/Login.vue'
import Register from '~/components/credentials/Register.vue'
import ForgottenPassword from '~/components/credentials/ForgottenPassword.vue'
export default {
  layout: 'public',
  components: {
    Login,
    Register,
    ForgottenPassword,
  },
  data() {
    return {
      tab: null,
    }
  },
  methods: {},
}
</script>
<style scoped></style>
