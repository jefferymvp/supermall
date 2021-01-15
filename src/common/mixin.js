import { debounce } from 'common/utils.js'
import BackTop from 'components/content/backTop/BackTop'
import {BACK_POSITION} from 'common/const.js'
export const itemMixin = {
  data() {
    return {
      itemImgListener: null, //取消监听
    }
  },
  mounted() {
    //监听图片加载完成事件
    const newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemLister = () => {
        console.log(111);
      newRefresh()
    }
    this.$bus.$on('ImgLoad', this.itemLister)
    // console.log('调用混入的内容');
  },
}
// 混入封装： 点击回到顶部
export const backTop = {
  components: {
    BackTop
  },
  data() {
    return {
      isBackTop: false,
    }
  },
  methods: {
    // 监听回到顶部事件
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    // 监听是否显示
    listenShowBackTop(position) {
      // 是否显示回到顶部
      this.isBackTop = (-position.y) > BACK_POSITION
    }
  },
}
