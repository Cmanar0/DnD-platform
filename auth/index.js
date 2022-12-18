import firebase from 'firebase/app'
import 'firebase/auth'

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  async register({ commit }, { email, password }) {
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      commit('setUser', user)
    } catch (error) {
      throw error
    }
  },
  async login({ commit }, { email, password }) {
    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      commit('setUser', user)
    } catch (error) {
      throw error
    }
  },
  async logout({ commit }) {
    try {
      await firebase.auth().signOut()
      commit('setUser', null)
    } catch (error) {
      throw error
    }
  },
}
