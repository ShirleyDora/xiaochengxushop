// pages/shopinfo/shopinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideSelectInfo:true,
    indicatorDots:"true",//是否显示面板指示点
    autoplay:"true",//是否自动切换
    interval:"3000",//自动切换时间间隔
    duration:"500",//滑动动画时长
  },
 //  减少商品数量
 shopCountSub:function()
 {
  if(this.data.shopBuyCount > 1)
  {
    this.setData({
      shopBuyCount:--this.data.shopBuyCount
    })  
  }
 },
  //  增加商品数量
  shopCountAdd:function()
  {
      var buycount;
      if(this.data.shopBuyCount >= 10) // 限购10件
      {
        buycount = 10;
      }
      else if(this.data.shopBuyCount >= this.data.goodsinfo.num)
      {
        buycount = this.data.goodsinfo.num;
      }
      else
      {
        buycount = ++this.data.shopBuyCount;
      }
      this.setData({
        shopBuyCount:buycount
      })
  },
  // 将商品添加到购物车
  submitShopInfo:function(){
    var that = this;
    wx.request({
      url:getApp().globalData.server + "cart/addCart",
      data:{
        uid:getApp().globalData.userInfo.id,
        shopBuyCount:this.data.shopBuyCount,
        goodid:this.data.goodsinfo.id,
        
      },
      success:function(res){
        console.log(res)
        // 已经成功将商品添加到购物车
        if(res.data.succ == 1){
          wx.showModal({
            content:'加入购物车成功！',
            showCancel:false
          })
          that.setData({
            hideSelectInfo:true
          })
        }
      }
    })
  },
  //添加购物车后隐藏弹窗
  AddToCart:function(){
    this.setData({
      hideSelectInfo:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url:getApp().globalData.server + "goods/goodinfo",
      data:{goodsid:options.id},
      success:function(res){
        console.log(res)
        that.setData(
          {
            imgUrls:res.data.goodsinfo.img,
            goodsinfo:res.data.goodsinfo.info,
            shopBuyCount:1,
            selectInfoImg:res.data.goodsinfo.info.img
          }
        )
      }
    })
  },
  // 显示弹窗
  showSelectInfo:function(){
    this.setData({
      hideSelectInfo:false
    })
  },
  // 隐藏弹窗
  hiddenSelectInfo:function(){
    this.setData({
      hideSelectInfo:true
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