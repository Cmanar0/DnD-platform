<template>
  <v-container v-if="index === 2">
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
      <v-card-title> Register </v-card-title>
      <v-container>
        <v-form>
          <v-text-field
            v-model="nickname"
            label="Nickname"
            type="email"
            required
          ></v-text-field>
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

        <v-btn block color="rgb(98, 182, 255)" rounded @click="onRegister"
          >Register</v-btn
        >
      </v-container>
    </v-card-text>
  </v-container>
</template>

<script>
import firebase from 'firebase/compat/app'
import userUtil from '~/utils/user.js'

import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export default {
  props: ['index'],
  data() {
    return {
      nickname: '',
      email: '',
      password: '',
      error: null,
      loading: false,
      cred: {},
      uid: '',
    }
  },
  watch: {
    loading(val) {
      if (!val) return
      setTimeout(() => (this.loading = false), 800)
    },
  },
  methods: {
    async onRegister() {
      this.loading = true

      console.log('this.email :>> ', this.email)
      console.log('this.password :>> ', this.password)
      // this.$emit('loading-progress')
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((cred) => {
          this.uid = cred.user.uid
          return firebase
            .firestore()
            .collection('users')
            .doc(cred.user.uid)
            .set({
              uid: cred.user.uid,
              nickname: this.nickname,
              email: this.email,
              bio: null,
              image: null,
            })
        })
        .then(async (user) => {
          userUtil.setUidToLocalStorage(this.uid)
          const userFromFirestoreDatabase = await userUtil.fetchUser(
            'users',
            this.uid
          )
          console.log(
            'userFromFirestoreDatabase :>> ',
            userFromFirestoreDatabase
          )
          userUtil.setUserInfoToLocalStorage(userFromFirestoreDatabase)
          this.$router.push('/dashboard')
        })
        .catch((error) => {
          this.error = error
          console.log(this.error)
        })
    },
    // async createUserInFirebase(collection, document, uid) {
    //   await createDocument(collection, document, uid)
    // },
  },
}
</script>

<style></style>
