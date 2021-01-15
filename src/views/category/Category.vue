<template>
  <div class="category">
<!--    <nav-bar class="category-nav">-->
<!--      <div slot="center">分类</div>-->
<!--    </nav-bar>-->
    <scroll class="content1" ref="scroll" @scroll="contentScroll" :probeType="3">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
    </scroll>
    <scroll class="content2" ref="scroll" @scroll="contentScroll" :probeType="3">
      <tab-content :subcategories="subcategories" @imgLoad="imgLoad"></tab-content>
    </scroll>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import TabMenu from './childComps/tabMenu.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import TabContent from './childComps/TabContent.vue'

// 网络请求
import {
  getCategory,
  getSubcategory
} from "network/category";

export default {
  components: {
    NavBar,
    TabMenu,
    TabContent,
    Scroll,
  },
  data() {
    return {
      categories: [], // 左侧列表
      categoryData: [],
      currentIndex: -1,
      subcategories:{}  // 右侧列表
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    /*
    事件监听相关方法
    */
    // 监听分类菜单切换
    selectItem(index){
      this.getSubcategory(index)
    },
    // 监听图片加载完成
    imgLoad(){
      this.$refs.scroll.refresh();
      // console.log('刷新滚动距离');
    },
    contentScroll(){
      // console.log(111);
      this.$refs.scroll.refresh();
    },
    /*
    网络请求相关方法
    */
    getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据
        console.log(res);
        this.categories = res.data.category.list
        this.getSubcategory(0) // 默认传入左侧列表第一个索引
      })
    },
    getSubcategory(index) {
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      getSubcategory(maitKey).then(res => {
        console.log(res);
        this.subcategories=res.data
      })
    }
  },
}

</script>
<style scoped>
.category {
  position: relative;
  height: 100vh;
}
.category-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.content1 {
  overflow: hidden;
  position: absolute;
  top:0;
  bottom:96px;
  left:0;
  right: 0;
  width: 100px;
}
.content2 {
  overflow: hidden;
  position: absolute;
  top:0;
  bottom:96px;
  left:100px;
  right: 0;
}
</style>
