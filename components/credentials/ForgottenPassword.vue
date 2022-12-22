<template>
  <v-container v-if="index === 3">
    <v-card-text>
      <v-card>
        <v-progress-linear
          :active="loading"
          :indeterminate="loading"
          absolute
          bottom
          color="rgb(0, 124, 232)"
        ></v-progress-linear>
      </v-card>
      <v-card-title> Forgot a password? </v-card-title>
      <v-container v-if="!reset">
        <v-form>
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
          ></v-text-field>
        </v-form>
        <br />
        <div v-if="error" class="error">{{ error }}</div>
        <br />

        <v-btn block color="rgb(98, 182, 255)" rounded @click="onRegister"
          >Send me an email to reset my password</v-btn
        >
      </v-container>
      <v-container v-else>
        <br />
        <div v-if="reset" class="success">{{ resetResult }}</div>
        <br />
      </v-container>
    </v-card-text>
  </v-container>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export default {
  props: ['index'],
  data() {
    return {
      email: '',
      error: null,
      loading: false,
      reset: false,
      resetResult: '',
    }
  },
  watch: {
    loading(val) {
      if (!val) return

      setTimeout(() => (this.loading = false), 800)
    },
  },
  methods: {
    onRegister() {
      this.loading = true

      console.log('this.email :>> ', this.email)
      console.log('this.password :>> ', this.password)
      // this.$emit('loading-progress')
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.reset = true
          this.resetResult =
            'We sent you an email with a link to reset your password'
        })
        .catch((error) => {
          this.error = error
          console.log(this.error)
        })
    },
  },
}
</script>

<style></style>
