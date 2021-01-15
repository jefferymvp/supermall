<template>
  <div class="profile">
<!--      <nav-bar class="profile-nav">-->
<!--      <div slot="center">我的档案</div>-->
<!--    </nav-bar>-->
    <User></User>
    <user-list></user-list>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import User from './childComps/user.vue'
  import UserList from './childComps/UserList.vue'
  export default {
    components: {
      NavBar,
      User,
      UserList
    },
    data() {
      return {

      }
    },
  }

</script>
<style scope>
  .profile-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
