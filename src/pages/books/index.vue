<template>
  <div>
    <div class="swiper">
      <swiper :indicator-dots="indicatorDots" indicator-active-color="#D84B45"
        :autoplay="autoplay" :interval="interval" :duration="duration">
        <block v-for="(imgUrls, blockIndex) in toplist" :key="blockIndex">
          <swiper-item>
            <img @click="goDetail(book.id)" v-for="book in imgUrls" :src="book.image" :key="book.id" mode="aspectFit" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>

    <card :book="book" v-for="book in booklist" :key="book.id" />
    <p v-if="!more" class="more">没有更多数据</p>
  </div>
</template>

<script>
import card from '@/components/card'
import { request } from '@/utils/index'
export default {
  name: 'books',
  components: {
    card
  },
  data () {
    return {
      booklist: [],
      page: 1,
      more: true,
      toplist: [],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000
    }
  },
  methods: {
    async getBooklist (page, action = '') {
      this.page = page
      wx.showNavigationBarLoading()
      const { booklist } = await request('GET', '/booklist', { page })
      if (page === 1) {
        this.booklist = []
        this.more = true
        if (action === 'refresh') wx.stopPullDownRefresh()
      } else {
        if (booklist.length < 10) this.more = false
      }
      this.booklist = this.booklist.concat(booklist)
      wx.hideNavigationBarLoading()
    },
    async getTopList () {
      const { toplist } = await request('GET', '/toplist')
      let index = 0
      let resIndex = 0
      const length = toplist.length
      const size = 3
      const result = new Array(Math.ceil(length / size))
      while (index < length) {
        result[resIndex++] = toplist.slice(index, (index += size))
      }
      this.toplist = result
    },
    goDetail (id) {
      wx.navigateTo({
        url: `/pages/bookDetail/main?id=${id}`
      })
    }
  },
  onShow () {
    this.getBooklist(1)
    this.getTopList()
  },
  onPullDownRefresh () {
    this.getBooklist(1, 'refresh')
    this.getTopList()
  },
  onReachBottom () {
    if (!this.more) return false
    this.getBooklist(this.page + 1)
  }
}
</script>

<style scoped>
.more {
  text-align: center;
  font-size: 12px;
  margin-bottom: 5px;
}
.swiper {
  margin-top: 5px;
}
.slide-image {
  width: 33.3%;
  height: 150px;
}
</style>
