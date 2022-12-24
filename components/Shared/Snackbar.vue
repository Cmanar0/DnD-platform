<template>
  <v-snackbar :color="snackbarColor" v-model="snackbar">
    {{ snackbarText }}

    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: ['snackbarProp', 'textProp', 'colorProp'],
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'red',
    }
  },
  watch: {
    snackbarProp: function () {
      this.snackbar = this.snackbarProp
    },
    textProp: function () {
      this.snackbarText = this.textProp
    },
    colorProp: function () {
      this.snackbarColor = this.colorProp
    },
    snackbar: function () {
      if (this.snackbar === true) {
        setTimeout(() => this.$emit('snackbar-salfe'), 2000)
      }
    },
  },
}
</script>
