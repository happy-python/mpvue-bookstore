import config from '../config'

export function showToast (title, icon) {
  wx.showToast({
    title: title,
    icon: icon,
    duration: 2000
  })
}

export function showModal (title, content) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
    success: function (res) {
    }
  })
}

export async function request (method, url, data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      method,
      url: config.host + url,
      data,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          const msg = res.data.data ? res.data.data.error : res.data.error
          reject(msg)
        }
      }
    })
  })
}
