<template>
  <div class="userList">
    <div class="list_header">
      <div class="money">
        <div>
          <span class="number">0.00</span>元
        </div>
        <span>我的余额</span>
      </div>
      <div class="book">
        <div>
          <span class="number">0</span>个
        </div>
        <span>我的优惠</span>
      </div>
      <div class="store">
        <div>
          <span class="number">0</span>分
        </div>
        <span>我的积分</span>
      </div>
    </div>

    <div class="listview">
      <div>
        <img src="~assets/img/profile/message.svg" alt="">
        <span>我的消息</span>
      </div>
      <div>
        <img src="~assets/img/profile/pointer.svg" alt="">
        <span>积分商城</span>
      </div>
      <div>
        <img src="~assets/img/profile/vip.svg" class="huiyuan" alt="">
        <span>会员卡</span>
      </div>
      <div>
        <img src="~assets/img/profile/cart.svg" alt="">
        <span>我的购物车</span>
      </div>
      <div>
        <img src="~assets/img/profile/shopping.svg" alt="">
        <span>下载购物APP</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

  }

</script>
<style>
  .list_header {
    display: flex;
    border-bottom: 15px solid #f2f2f2;
  }

  .list_header>div {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80px;
    border-right: 3px solid #f2f2f2;
    color: #666;
  }

  .list_header .store {
    border-right: none;
  }

  .list_header .number {
    font-size: 20px;
    color: #e16671;
  }

  .list_header>div>div {
    margin-bottom: 3px;
  }

  .listview {
    padding: 8px 0 0 0;
    color: #666;
  }

  .listview>div {
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: solid 2px #f2f2f2;
  }

  .listview img {
    width: 25px;
    vertical-align: middle;
    margin-right: 7px;
    margin-left: 15px;
  }

  .listview div:nth-child(4) {
    border-top: 15px solid #f2f2f2 !important;
    box-sizing: content-box;
  }

</style>
