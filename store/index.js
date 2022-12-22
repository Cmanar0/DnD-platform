// import Vuex from 'vuex'
// import Vue from 'vue'

// Vue.use(Vuex)

// export default () =>
//   new Vuex.Store({
//     state: () => ({
//       snackbar: {
//         show: false,
//         text: '',
//       },
//     }),

//     mutations: {
//       // setSearch(state, value) {
//       //   state.search = value
//       // },
//       // addTask(state, newTaskTitle) {
//       //   let newTask = {
//       //     id: Date.now(),
//       //     title: newTaskTitle,
//       //     done: false,
//       //     dueDate: null,
//       //   }
//       //   state.tasks.push(newTask)
//       // },
//       // doneTask(state, id) {
//       //   let task = state.tasks.filter((task) => task.id === id)[0]
//       //   task.done = !task.done
//       // },
//       // deleteTask(state, id) {
//       //   state.tasks = state.tasks.filter((task) => task.id !== id)
//       // },
//       // updateTaskTitle(state, payload) {
//       //   let task = state.tasks.filter((task) => task.id === payload.id)[0]
//       //   task.title = payload.title
//       // },
//       // updateTaskDueDate(state, payload) {
//       //   let task = state.tasks.filter((task) => task.id === payload.id)[0]
//       //   task.dueDate = payload.dueDate
//       // },
//       showSnackbar(state, text) {
//         let timeout = 0
//         if (state.snackbar.show) {
//           state.snackbar.show = false
//           timeout = 300
//         }
//         setTimeout(() => {
//           state.snackbar.show = true
//           state.snackbar.text = text
//         }, timeout)
//       },
//       // hideSnackbar(state) {
//       //   state.snackbar.show = false
//       // },
//     },
//     actions: {
//       passwordChanged({ commit }) {
//         commit('showSnackbar', 'Your password was updated successfully.')
//       },
//       // addTask({ commit }, newTaskTitle) {
//       //   commit('addTask', newTaskTitle)
//       //   commit('showSnackbar', 'Your password was updated successfully.')
//       // },
//       // deleteTask({ commit }, id) {
//       //   commit('deleteTask', id)
//       //   commit('showSnackbar', 'shared.snackbar.taskDeleted')
//       // },
//       // updateTaskTitle({ commit }, payload) {
//       //   commit('updateTaskTitle', payload)
//       //   commit('showSnackbar', 'shared.snackbar.taskUpdated')
//       // },
//       // updateTaskDueDate({ commit }, payload) {
//       //   commit('updateTaskDueDate', payload)
//       //   commit('showSnackbar', 'shared.snackbar.dueDateUpdated')
//       // },
//     },
//   })
