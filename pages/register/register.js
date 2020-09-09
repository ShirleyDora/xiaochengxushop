// pages/register/register.js
Page({
data: {

zhanghao: '',
mima: '',
remima:''
},

//获取用户账号
getZhangHao(event) {
console.log('获取输入的账号', event.detail.value)
this.setData({
 zhanghao: event.detail.value
})
},
// 获取密码
getMiMa(event) {
console.log('获取输入的密码', event.detail.value)
this.setData({
 mima: event.detail.value
})
},
 reMiMa(event) {
console.log('获取输入的密码', event.detail.value)
this.setData({
 remima: event.detail.value
})
},
//注册
zhuce() {

let mima = this.data.mima
let remima= this.data.remima 


//校验密码
if (mima.length < 4) {
 wx.showToast({
  icon: 'none',
  title: '密码至少4位',
 })
 return
}
if(mima !== remima){
   wx.showToast({
  icon: 'none',
  title: '两次输入的密码不一致',
 })
 return
}
wx.showToast({
   title: '注册成功',
  })
  wx.navigateTo({
   url: '../../pages/login/login',
  })
}
})