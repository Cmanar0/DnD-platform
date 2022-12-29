<template>
  <div>
    <div class="user-list">
      <user-card v-for="user in users" :key="user.id" :user="user" />
    </div>
  </div>
</template>

<script>
import UserCard from '/components/list-components/list-of-users-in-game/UserCard.vue'

export default {
  components: {
    UserCard,
  },
  data() {
    return {
      users: [
        { id: 1, name: 'John Smith', profilePicture: '/images/john-smith.jpg' },
        { id: 2, name: 'Jane Doe', profilePicture: '/images/jane-doe.jpg' },
        // ...
      ],
    }
  },
}
</script>

<style>
.user-list {
  padding: 25px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}
</style>
