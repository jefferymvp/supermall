
module.exports={
    configurewepack:{
        //配置别名
        resolve: {
            // extensions: ['.js', '.vue', '.json'],
            alias: {
              'assets': '@/assets',
              'common': '@/common',
              'components': '@/components',
              'network': '@/network',
              'views': '@/views',
            }
        },
    }
}
