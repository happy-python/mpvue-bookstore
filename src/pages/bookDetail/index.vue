<template>
<div class="detail">
  <div class="thumb">
    <img :src="book.image" class="back" mode="aspectFill">
    <img :src="book.image" class="img" mode="aspectFit">
    <div class="info">
      <div class="title">{{book.title}}</div>
      <div class="author">{{book.author}}</div>
    </div>
  </div>

  <div class="row">
    <img :src="book.user_info.avatarUrl" class="avatar" mode="aspectFit">
    {{book.user_info.nickName}}
    <div class="right">
      {{book.rating}} <rate :value="book.rating"/>
    </div>
  </div>
  <div class="row">
    {{book.publisher}}
    <div class="right">
      {{book.price}}
    </div>
  </div>
  <div class="row">
    ISBN：{{book.isbn}}
    <div class="right">
      浏览量：{{book.count}}
    </div>
  </div>
  <div class="summary">
    <p v-for="(content, index) in book.summary" :key="index">{{content}}</p>
  </div>
</div>
</template>

<script>
import rate from '@/components/rate'
import { request } from "@/utils/index"
export default {
  name: "book-detail",
  components: {
    rate
  },
  data() {
    return {
      id: "",
      book: {}
    };
  },
  methods: {
    async getBookDetail() {
      this.id = this.$root.$mp.query.id
      const { book } = await request("GET", "/bookDetail", { id: this.id })
      wx.setNavigationBarTitle({
        title: book.title
      });
      this.book = book
    }
  },
  onShow() {
    this.getBookDetail()
  },
  onShareAppMessage: function (res) {
    return {}
  }
};
</script>

<style scoped>
.detail {
  font-size: 14px;
}
.right {
  float: right;
}
.row {
  padding: 5px 10px;
}
.avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  vertical-align: middle;
}
.summary {
  margin-top: 10px;
  padding: 0 10px;
  text-indent: 2em;
}
.thumb {
  width: 100%;
  height: 450rpx;
  overflow: hidden;
  position: relative;
}
.back {
  filter: blur(20px);
  width: 100%;
}
.img {
  position: absolute;
  width: 100%;
  height: 300rpx;
  left: 0;
  top: 30rpx;
}
.info {
  color: white;
  position: absolute;
  width: 100%;
  left: 0;
  top: 340rpx;
  text-align: center;
}
.title {
  font-size: 20px;
}
.author {
  font-size: 14px;
}
</style>
