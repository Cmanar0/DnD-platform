<template>
  <v-container v-if="index === 1">
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
      <v-card-title> Login </v-card-title>

      <v-container>
        <v-form>
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>
        </v-form>
        <br />
        <div v-if="error" class="error">{{ error }}</div>
        <br />
        <v-btn block color="rgb(98, 182, 255)" rounded @click="onLogin"
          >Login</v-btn
        >
      </v-container>
    </v-card-text>
  </v-container>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export default {
  layout: 'public',
  props: ['index'],
  data() {
    return {
      email: '',
      password: '',
      error: null,
      loading: false,
    }
  },
  watch: {
    loading(val) {
      if (!val) return

      setTimeout(() => (this.loading = false), 800)
    },
  },
  methods: {
    onLogin() {
      this.loading = true

      console.log('this.email :>> ', this.email)
      console.log('this.password :>> ', this.password)
      // this.$emit('loading-progress')
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user)
          this.$router.push('/dashboard')
        })
        .catch((error) => {
          this.error = error.message
          console.log(this.error)
        })
    },
  },
}
</script>

<style></style>
