<template>
  <div id="user">
    <div class="enter">
      <img src="~assets/img/profile/avatar.svg" alt="">
    </div>
    <div class="phone">
      <div>登录/注册</div>
      <div class="phoneD">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="right">
      <img src="~assets/img/profile/back.svg" alt="">
    </div>
  </div>
</template>
<script>
  export default {

  }

</script>
<style>
  #user {
    display: flex;
    align-items: center;
    padding: 10px 15px 5px;
    background-color:var(--color-tint);
    color: #fff;
    font-size: 14px;
}
.enter {
    width: 60px;
    height: 100%;
    margin-right: 15px;
}
.enter img {
    width: 100%;
}
.phone {
    flex: 1;
    height: 100%;
}
.phone img {
    width: 20px;
    vertical-align: middle;
}
.phone span {
    font-size: 13px;
}
.phoneD {
    margin-top: 5px;
    margin-left: -3px;
}
.right{
    height: 100%;
}
.right img {
    width: 27px;
}

</style>
