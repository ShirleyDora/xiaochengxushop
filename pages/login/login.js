// pages/login/login.js
Page({
data: {
zhanghao: '',
mima: ''
},
//获取输入的账号
getZhanghao(event) {
//console.log('账号', event.detail.value)
this.setData({
 zhanghao: event.detail.value
})
 
},
//获取输入的密码
getMima(event) {
// console.log('密码', event.detail.value)
this.setData({
 mima: event.detail.value
})
},
//点击登陆
login() {
let zhanghao = this.data.zhanghao
if (zhanghao.length < 4) {
 wx.showToast({
  icon: 'none',
  title: '账号至少4位',
 })
 return
}
 wx.showToast({
    title: '登陆成功',
   })
   wx.switchTab({
    url: '../../pages/mine/mine',
   })
},
register(){
   wx.navigateTo({
    url: '../../pages/register/register',
   })
}
})

