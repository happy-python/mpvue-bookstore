import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/books/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#D84B45',
      navigationBarTitleText: '图书荟萃',
      navigationBarTextStyle: '#D84B45'
    },
    tabBar: {
      color: '#E6E6E6',
      selectedColor: '#D84B45',
      list: [{
        pagePath: 'pages/books/main',
        text: '图书',
        iconPath: 'static/img/book.png',
        selectedIconPath: 'static/img/book-active.png'
      }, {
        pagePath: 'pages/personal/main',
        text: '我的',
        iconPath: 'static/img/personal.png',
        selectedIconPath: 'static/img/personal-active.png'
      }]
    }
  }
}
