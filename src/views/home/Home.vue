<template>
  <div id="home">
    <nav-bar class="home-nav">  <div slot="center">果子购物平台</div></nav-bar>
<!--    吸顶隐藏-->
    <tab-control  :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl1"
                  class="tab-control"
                  v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type = "3"
            @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <!--    轮播图-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!--    首页推荐-->
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control  :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isBackTop" />
  </div>
</template>

<script>
// 子组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from "./childComps/RecommendView";
import FeatureView from './childComps/FeatureView'

// 公共组件
import NavBar from 'components/common/navbar/NavBar'
import  TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

// 函数
import {BACK_POSITION} from 'common/const.js'
import {getHomeMultidata,getHomeGoods} from 'network/home'
import {itemMixin, backTop} from 'common/mixin.js'

export default {
  name: "Home",
  components:{
    BackTop, // 回到顶部
    NavBar,
    HomeSwiper, // 轮播图组件
    RecommendView, // 首页推荐
    FeatureView, // 首页流行
    TabControl, // '流行','新款','精选'
    GoodsList, // 商品列表
    Scroll,
  },
  mixins: [itemMixin, backTop], // 混入 图片加载完成， 回到顶部
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType: 'pop',
      isBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false, // 是否吸顶
      saveY: 0,
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    // console.log('destroyed');
  },
  activated() { // 离开进入保持当前y轴状态
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 保存Y轴
    this.saveY = this.$refs.scroll.getScrollY()

    //2、 取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)

  },
  created() {
    // console.log('home created')

    // 1、请求多个数据
    this.getHomeMultidata()
    // 2、请求商品数据
    this.getHomeGoods('pop') // 流行
    this.getHomeGoods('new') // 新款
    this.getHomeGoods('sell') // 精选 热销
  },
  mounted() {
    // console.log('Home mounted 1 测试混入');
  },
  methods:{
    /**
     * 事件监听方法
     */

    tabClick(index){
       switch (index){
         case 0:
           this.currentType = 'pop'
               break
         case 1:
           this.currentType = 'new'
           break
         case 2:
           this.currentType = 'sell'
           break
       }
       this.$refs.tabControl1.currentIndex = index
       this.$refs.tabControl2.currentIndex = index
     },
    contentScroll(position){
      // 混入对象 混入对象 是否显示回到顶部
      this.listenShowBackTop(position)
      this.isTabFixed = (-position.y) > this.tabOffsetTop // 判断是否吸顶
    },
    loadMore(){ // 上拉加载更多
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh() // 重新刷新高度
    },
    swiperImageLoad(){
      //3、吸顶效果： 获取tabControl组件的当前的偏移
      //  用于获取组件中的元素 ： $el
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        // console.log(res.data.banner.list);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page =this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        // console.log(res.data);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1

        //上拉加载动作结束, 触发下一次的上拉件。
        this.$refs.scroll.finishPullUp()
      })
    }

  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.content { /*滑动窗口调整*/
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/*最顶部scroll里的样式*/
.tab-control{
  position: relative;
  z-index: 9;
  top: -1px;
}

/*滑动窗口调整*/
/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*!*margin-top: -1px;*!*/
/*}*/
</style>
