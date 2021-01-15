<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!--  商品列表 -->
    <cart-list/>
<!--    底部汇总-->
    <cart-botton-bar/>
  </div>


</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from "./childComps/CartList";
import CartBottonBar from  "./childComps/CartBottonBar";

import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottonBar,
  },
  computed: {
    // ...mapGetters(['cartLength'])
    ...mapGetters({ // 自定义名字
      length: 'cartLength',
    })
  }

}
</script>

<style scoped>
.cart {
  position: relative;
  height: 100vh;
}
.content {
  height: calc(100vh - 142px);
  /* position: absolute;
  top: 0;
  bottom: 94px;
  left: 0;
  right: 0; */
  overflow: hidden;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
