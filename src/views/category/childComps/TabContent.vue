<template>
  <div class="tabContent">
    <div class="item" v-for="(item, index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="" @load="imageLoad">
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      subcategories: {
        type: Object,
        default () {
          return {
          }
        }
      }
    },
    data() {
      return {
        counter: 0,
      }
    },
    methods: {
      imageLoad() {
        if (++this.counter === this.subcategories.list.length) {
          console.log('图片加载完成');
          this.$emit('imgLoad')
        }
      }
    },
  }

</script>

<style scoped>
  .tabContent {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 10px 0 10px;
  }

  .tabContent>div {
    width: 33.33%;
    margin-bottom: 10px;
  }

  .item {
    text-align: center;
    /* border-bottom: solid 2px var(--color-tint); */
  }

  .item-img {
    width: 60%;
  }

  .item-text {
    color: #666;
    font-size: 12px;
    margin-top: 10px;
    /* font-weight: 700; */
  }

</style>
