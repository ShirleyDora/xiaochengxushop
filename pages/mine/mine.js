// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //获取订单商品列表数据
  onLoad: function (options) {
      var that = this;
      wx.request({
        url: getApp().globalData.server + "order/orderList",
        data:{
          uid:getApp().globalData.userInfo.id
        },
        success:function(res)
        {
          that.setData({
            orderList:res.data.orderList
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  //显示我的信息
  onShow: function () {
      this.setData({
        userInfo:getApp().globalData.userInfo
      })
  },  
  //我的信息跳转用户订单页面
  showDetails:function(e)
  {
      wx.navigateTo({
        url: '../../pages/orderinfo/orderinfo?id=' + e.currentTarget.dataset.id,
      })
  },
  login:function(e){
    wx.navigateTo({
      url:'../../pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})