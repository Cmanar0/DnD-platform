<template>
  <div class="form">
    <div class="main">
      <form @submit.prevent="onRegister">
        <div class="form-row">
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" />
        </div>

        <br />
        <div class="form-row">
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" />
        </div>
        <br />
        <button class="btn" type="submit">Register</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// import { mapActions } from 'vuex'

export default {
  layout: 'public',

  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    // ...mapActions({
    //   register: 'auth/register',
    // }),
    // async onRegister() {
    //   try {
    //     await this.register({ email: this.email, password: this.password })
    //   } catch (error) {
    //     this.error = error.message
    //   }
    // },
    onRegister() {
      console.log('this.email :>> ', this.email)
      console.log('this.password :>> ', this.password)
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user)
          this.$router.push('/')
        })
        .catch((error) => {
          this.error = error
          console.log(this.error)
        })
    },
  },
}
</script>
<style scoped>
.form-row {
  display: flex;
  justify-content: space-between;
}
.form {
  margin-top: 30%;
  display: flex;
  justify-content: center;
}
input {
  border: 1px solid cornflowerblue;
  border-radius: 5px;
}
.main {
  width: 300px;
  padding: 25px;
  border: 1px solid cornflowerblue;
  border-radius: 5px;
}
.btn {
  background-color: darkgrey;
}
</style>
