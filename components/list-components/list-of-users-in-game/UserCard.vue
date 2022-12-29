<template>
  <div class="user-card">
    <v-card :style="{ background: randomColor }">
      <v-card-title>
        <v-avatar size="50">
          <img :src="user.profilePicture" alt="Profile picture" />
        </v-avatar>
        <div class="name">{{ user.name }}</div>
      </v-card-title>
      <v-card-actions>
        <v-btn icon>
          <v-icon>mdi-email</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-phone</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <!-- display user info here -->
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['user'],
  computed: {
    randomColor() {
      const colors = [
        '#FF4500',
        '#FF8C00',
        '#FFA500',
        '#FFD700',
        '#FFFF00',
        '#FFFFE0',
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    },
  },
}
</script>

<style>
.user-card {
  display: flex;
  flex-direction: column;
}

.name {
  margin-left: 16px;
  font-size: 18px;
  font-weight: bold;
}
</style>
