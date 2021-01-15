<template>

  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nva"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommendList"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isBackTop" />
    <detail-botton-bar @addCart="addToCart" />
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottonBar from "./childComps/DetailBottonBar";

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from 'common/utils.js' // 防抖函数
  import {itemMixin, backTop} from 'common/mixin.js'

  import { mapActions } from 'vuex' // 映射 Actions

  export default {
    name: "Detail",
    components: {
      DetailBottonBar,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
    },
    mixins: [itemMixin, backTop], // 混入
    data() {
      return {
        iid: null,
        topImages: [], // 轮播图
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: [],
        recommendList: [],
        themeTopYs: [], // 记录滚动y轴坐标
        getThemeTopY: null, // 防抖函数
        currentIndex: 0,
        isBackTop: false,
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages

          // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log(this.goods);

          // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6、 取出评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list
        }

        // 7 获取推荐数据
        getRecommend().then( res => {
          // console.log(res)
          this.recommendList = res.data.list
        })

        // 防抖操作
        this.getThemeTopY = debounce(()=> {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE) // 存入最大值，用于边界条件判断
          // console.log(this.themeTopYs)
        },100)

      })
    },
    mounted() {
      // console.log('Detail mounted 1 测试混入');
    },
    destroyed() { // 此处由于未缓存 需在destroyed 不能在deactivated() {}
       //  取消全局事件的监听
        this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']), // 映射 Actions
      imageLoad() {
        // console.log('-----图片加载次数----');
        this.$refs.scroll.refresh()
        this.getThemeTopY() // 防抖
      },
      titleClick(index) { // 点击标题滚动到对应内容
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position) { // 滚动到标题对应内容
        const positionY = -position.y
        // positionY和主题中的值进行对比
        const length = this.themeTopYs.length

          // 判断做法一、
          // if(this.currentIndex !==i &&
          //   ((i<length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
          //   || (i === length-1 && positionY >= this.themeTopYs[i])) ){
          //   this.currentIndex = i // 用于避免重复记录i的次数
          //   this.$refs.nva.currentIndex = this.currentIndex
          // }

        for (let i = 0; i < length-1; i++) {
          // 判断做法二、 hack
          if(this.currentIndex !==i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1] ){
            this.currentIndex = i // 用于避免重复记录i的次数
            this.$refs.nva.currentIndex = this.currentIndex
          }
        }

        //3、混入对象 是否显示回到顶部
        this.listenShowBackTop(position)
      },
      addToCart() {
        //1、 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //2、方式一、 将商品添加到购物车,弹窗提示
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })
        // 方式二、
        this.addCart(product).then(res => {
          this.$toast.show(res,2000); // 购物车弹窗提示
        })

      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
