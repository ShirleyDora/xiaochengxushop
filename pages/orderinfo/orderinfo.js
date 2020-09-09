// pages/orderinfo/orderinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      orderState:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //获取订单信息
  onLoad: function (options) {
      var that = this;
      wx.request({
        url:getApp().globalData.server + "order/details",
        data:{
          orderid:options.id
        },
        success:function(res)
        {
          console.log(res)
          that.setData({
            detailsList:res.data.details,
            detailsPrice:res.data.details[0].allprice,
            orderState:res.data.details[0].state,
            orderId:res.data.details[0].orderid
            })
        }
      })
  },
  //确认收货
  getGoods:function()
  {
    var that = this;
    wx.showModal({
      title:'提示',
      content:'确认收货?',
      showCancel:true,
      cancelText:'取消',
      cancelColor:'#000000',
      confirmText:'继续',
      confirmColor:'#3CC51F',
      success:function(res)
      {
        if(!res.confirm)
        {
          return false;
        }
        else
        {
          wx.request({
            url: getApp().globalData.server + "order/getGoods",
            data:{
              orderid:that.data.orderId
            },
            success:function(res)
            {
              that.setData({
                orderState:3
              })
              wx.showModal({
                
                content: '收货成功！',
                showCancel:false
              })
            }            
          })
        }
      }

    })
  },
  //支付
  pay:function()
  {
      var that = this;
      wx.showModal({
        title:'提示',
        content:'确认支付此订单？',
        showCancel:true,
        cancelText:'取消',
        cancelColor:'#000000',
        confirmText:'继续',
        confirmColor:'#3CC51F',
        success:function(res)
        {
          if(!res.confirm)
          {
            return false;
          }
          else
          {
            wx.request({
              url:getApp().globalData.server + "order/pay",
              data:{
                orderid:that.data.orderId
              },
              success:function(res)
              {
                that.setData({
                  orderState:1
                })
                wx.showModal({
                  title: '提示',
                  content: '支付成功',
                  showCancel:false,
                  cancelColor:'#000000',
                  confirmText:'继续',
                  confirmColor:'#3CC51F',
                  success:function(res)
                  {
                    wx.navigateTo({
                      url: '../../pages/orderInfo/orderInfo?id=' + that.data.orderId,
                    })
                  }
                })
              }
            })
          }
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