<template>
  <div class="container">
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <p class="card">
            <span v-if="lock">
              <button class="btn-info" open-type="getUserInfo" @getuserinfo="login">{{userInfo.nickName}}</button>
            </span>
            <span v-else>
              {{userInfo.nickName}}
            </span>
        </p>
      </div>
    </div>

    <div class="progress-bar">
      <progress :percent="percent" color="#D84B45" />
      <div class="desc">
          {{year}}年已过去了{{days}}天, 进度{{percent}}%
      </div>
    </div>

    <button class="btn" @click="scanCode" v-if="!lock">扫码添加图书</button>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import { request, showModal, showToast } from '@/utils/index'
import config from '@/config'
export default {
  name: 'personal',
  data () {
    return {
      userInfo: {
        avatarUrl: '../../../static/img/avatar.png',
        nickName: '点击登录'
      },
      lock: true
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      let dateBegin = new Date()
      dateBegin.setMonth(0)
      dateBegin.setDate(1)
      let dateEnd = new Date() // 获取当前时间
      let dateDiff = dateEnd.getTime() - dateBegin.getTime() // 时间差的毫秒数
      return Math.floor(dateDiff / (24 * 3600 * 1000)) // 计算出相差天数
    },
    percent () {
      return (this.days * 100 / this.isLeapYear(this.year)).toFixed(1)
    }
  },
  methods: {
    login () {
      let userInfo = wx.getStorageSync('userInfo')
      if (!userInfo) {
        qcloud.setLoginUrl(config.host + '/login')
        qcloud.login({
          success: userInfo => {
            showToast('登录成功', 'success')
            this.userInfo = userInfo
            this.lock = false
            wx.setStorageSync('userInfo', this.userInfo)
          },
          fail: err => {
            console.log('登录失败', err)
          }
        })
      }
    },
    isLeapYear (year) {
      if (year % 4 === 0 && year % 100 !== 0) {
        return 366
      } else if (year % 400 === 0) {
        return 366
      } else {
        return 365
      }
    },
    scanCode () {
      wx.scanCode({
        success: res => {
          if (res.result) {
            request('GET', '/addbook', { isbn: res.result, open_id: this.userInfo.openId }).then(data => {
              showModal('添加成功', data.title)
            }).catch(error => {
              showModal('添加失败', error)
            })
          }
        }
      })
    }
  },
  onShow () {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = userInfo
      this.lock = false
    }
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}
.progress-bar {
  margin: 30rpx 0rpx;
  width: 90%;
}
.card {
  padding: 10rpx;
}
.desc {
  color: #aaa;
  text-align: center;
  margin: 15px 15px;
}
.btn-info {
  font-size: 18px;
  background: none;
}
.btn-info::after {
  border: none;
}
</style>
