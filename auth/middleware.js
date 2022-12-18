import { beforeEach } from 'nuxt-vuex-router-sync'

export default function ({ store, redirect }) {
  beforeEach((to, from, next) => {
    if (to.matched.some((route) => route.meta.requiresAuth)) {
      // Check if the user is authenticated
      if (!store.state.auth.user) {
        // Redirect to the login page
        return redirect('/login')
      }
    }
    next()
  })
}
