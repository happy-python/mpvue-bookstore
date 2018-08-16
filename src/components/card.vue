<template>
  <div class="book-card" @click="goDetail(book.id)">
   <div class="thumb">
     <img :src="book.image" mode="aspectFit" @click.stop="preview(book.image)">
   </div>
   <div class="detail">
     <div class="row title">
       {{book.title}}
     </div>
     <div class="row">
       {{book.rating}} <rate :value="book.rating"/>
     </div>
     <div class="row">
        {{book.author}}
     </div>
     <div class="row">
        {{book.publisher}}
     </div>
     <div class="row">
        {{book.price}} 元
     </div>
   </div>
  </div>
</template>

<script>
import rate from '@/components/rate'
export default {
  props: ['book'],
  components: {
    rate
  },
  methods: {
    goDetail (id) {
      wx.navigateTo({
        url: `/pages/bookDetail/main?id=${id}`
      })
    },
    preview (image) {
      wx.previewImage({
        urls: [image]
      })
    }
  }
}
</script>

<style scoped>
.book-card {
  padding: 5px;
  overflow: hidden;
  margin-bottom: 5px;
  font-size: 14px;
}
.thumb {
  width: 105px;
  height: 105px;
  float: left;
  margin: 0 auto;
  overflow: hidden;
}
img {
  max-width: 100%;
  max-height: 100%;
}
.detail {
  margin-left: 100px;
}
.row{
  line-height: 20px;
  margin-bottom: 3px;
}
.title {
  color: #D84B45;
}
</style>
