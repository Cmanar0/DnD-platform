<template>
  <div class="form">
    <div class="main">
      <form @submit.prevent="login">
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

        <button class="btn" type="submit">Log In</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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
    ...mapActions({
      login: 'auth/login',
    }),
    async onLogin() {
      try {
        await this.login({ email: this.email, password: this.password })
      } catch (error) {
        this.error = error.message
      }
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
