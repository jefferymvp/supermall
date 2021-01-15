<template>
<!--  <div id="checkBox">-->
    <div class="check-button" :class="{'check': isChecked}">
      <img src="~/assets/img/cart/tick.svg" alt="">
    </div>
<!--  </div>-->
</template>

<script>
  export default {
    props: {
      isChecked: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    methods: {
      colorCheck() {
        this.$emit('colorCheck')
      }
    }
  }

</script>

<style>
    .check-button{
      border-radius: 50%;
      border: 2px solid #aaa;
      width: 18px;
      height: 18px;
      margin-left: 8px;
    }
    .check {
      background-color: #ff8198;
      border-color: #ff8198;
    }

    #checkBox {
        display: flex;
        align-items: center;
    }

  /*.icon-check {*/
  /*  position: relative;*/
  /*  !* margin: 0; *!*/
  /*  width: 18px;*/
  /*  height: 18px;*/
  /*  border-radius: 50%;*/
  /*  border: 2px solid #ccc;*/
  /*  cursor: pointer;*/
  /*}*/



</style>
