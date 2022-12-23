<template>
  <v-main>
    <Nuxt />
  </v-main>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  created() {
    // this.onAuthStateChangedMethod()
  },
  methods: {
    // onAuthStateChangedMethod() {
    //   firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       return
    //     } else {
    //       this.$router.push('/')
    //     }
    //   })
    // },
  },
}
</script>
