<template>
  <div id="shop-item" >
    <div class="item-selector">
      <!-- 选中按钮 -->
    <<check-button :is-checked="itemInfo.checked" @click.native="checkClick"></check-button>
    </div>

    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>

<!--    <div class="bgc" v-show="isShow" @click="closeBgc">-->
<!--      <div>-->
<!--        <p>设置</p>-->
<!--        <p>常买</p>-->
<!--      </div>-->
<!--      <div>-->
<!--        <p>移入</p>-->
<!--        <p>关注</p>-->
<!--      </div>-->
<!--      <div>看相似</div>-->
<!--      <div @click="remove()">删除</div>-->
<!--    </div>-->
  </div>
</template>
<script>
import CheckButton from "components/content/cartcheck/CheckButton";

  export default {
    components: {
      CheckButton,
    },
    props: {
      itemInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      checkClick(){
        this.itemInfo.checked = !this.itemInfo.checked
      }
    }

  }

</script>
<style scoped>
  #shop-item {
    position: relative;
    width: 100%;
    display: flex;
    font-size: 0;
    /* padding: 5px; */
    border-bottom: 1px solid #ccc;
  }
  .bgc {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    background:rgba(36,41,44,0.5);
    /* justify-content: space-around; */
    align-items: center;
  }
  .bgc div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    margin-left: 22px;
    background-color:#f0f0f0;
    z-index: 999;
    font-size: 14px;
    color: #333;
  }
  .bgc div:nth-child(2){
    background-color:#ffc700;
    color: #fff;
  }
  .bgc div:nth-child(3){
    background-color:#fd6a2b;
    color: #fff;
  }
  .bgc div:nth-child(4){
    background-color:#f81300;
    color: #fff;
  }
  .item-title,
  .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-selector{
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }

</style>
