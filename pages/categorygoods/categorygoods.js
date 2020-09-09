// pages/categorygoods/categorygoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  //获取数据
  onLoad: function (options) {
    this.setData({
      title:options.itemType
    })
    wx.setNavigationBarTitle({
      title:this.data.title,
    })
    var that = this;
    wx.request({
      url:getApp().globalData.server + 'goods/typeList',
      data:{typename:this.data.title},
      success:function(res){
        that.setData({
          goodslist:res.data.goodlist
        })
      }
    })
  },
  //跳转到相应的商品详情
  itemClick:function(e){
    wx.navigateTo({
      url:'../../pages/shopinfo/shopinfo?id='+ e.currentTarget.dataset.id,
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
  onShow: function () {

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