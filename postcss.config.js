module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗宽度
      viewportHeight: 667, // 视窗高度
      unitPrecision: 5, // 指定px转为视窗单位值的小数位数
      viewportUnit: 'vw', // 视窗单位，建议vw
      // 指定不需要转换的类
      selectorBlackList: ['igonre', 'tab-bar', 'tab-bar-item'],
      minPixelValue: 1, // 小于1px不转换
      mediaQuery: false,
      // exclude: [/tabbar/], // 正则表达式 可以按文件夹排除
      include: undefined,
    },
  }
}
