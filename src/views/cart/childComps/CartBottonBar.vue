<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isAllcheck"
        class="check-button"
        @click.native="selectAll"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalprice}}
    </div>

    <div class="calculate" @click="toPrice">
      去结算: ({{jiesuanLength}})
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/cartcheck/CheckButton";
import { mapGetters } from 'vuex'

  export default {
    name: 'CartBottonBar',
    components: {
      CheckButton,
    },
    computed: {
      ...mapGetters(['cartList']),
      totalprice() { // 合计
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      jiesuanLength(){ // 去结算
        return this.cartList.filter(item => {
          return item.checked
        }).length
      },
      isAllcheck(){
        if(this.cartList.length===0){
          return false
        }
        //方式一、
        // return !this.cartList.find(item => !item.checked )

        // 方式二、普通遍历
        for(let item of this.cartList){
          if(!item.checked){
            return false
          }
        }
        return true
      },
      isCheck(){ // 有一个选中时
        return this.cartList.find(item => item.checked )
      }
    },
    methods: {
      selectAll() {
        if(this.isAllcheck){ // 全部选中
          this.cartList.forEach(item=>{item.checked=false})
        }else { // 全部不选中
          this.cartList.forEach(item=>{item.checked=true})
        }
      },
      toPrice(){
        if(!this.isAllcheck && !this.isCheck){
          this.$toast.show('请选择需要的商品',2000)
        }
      }
    },
  }

</script>
<style>
  .bottom-bar {
    position: relative;
    display: flex;

    line-height: 40px;
    height: 40px;

    background-color: #eee;
    font-size: 14px;
  }

  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 70px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: orangered;
    color: #fff;
    text-align: center;
  }
  /*.select {*/
  /*  margin-left: 5px;*/
  /*  margin-right: 20px;*/
  /*}*/

  /*.jiesuan {*/
  /*  height: 100%;*/
  /*  width: 100px;*/
  /*  background-color: orangered;*/
  /*  text-align: center;*/
  /*  line-height: 49px;*/
  /*  color: #fff;*/
  /*  z-index: 999;*/
  /*}*/



</style>
