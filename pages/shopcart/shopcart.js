// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //  提交订单
  addOrder:function()
  {
      if(this.data.cartShopList.length == 0)
      {
        wx.showModel({
          content:'您的购物车还是空，无法提交订单！',
          showCancel:false
        })
        return false;
      }
      if(this.data.addressInfo == null || this.data.addressInfo.detailedInfo==undefined ||
      this.data.addressInfo.name == undefined || this.data.addressInfo.phoneNum == undefined){
        wx.showModal({
          
          content: '请详细填写收货地址',
          showCancel:false
        })
        return false;
      }

      var address = this.data.addressInfo.province + "  " + 
      this.data.addressInfo.city + "  " + this.data.addressInfo.district + "  " + 
      this.data.addressInfo.detailedInfo +  " 收货人：" + this.data.addressInfo.name + " 电话：" + 
      this.data.addressInfo.phoneNum;
      wx.request({
        url: getApp().globalData.server + 'order/addOrder',
        data:{
          address:address,
          uid:getApp().globalData.userInfo.id,
          info:this.data.cartShopList,
          price:this.data.allPrice,
        },
        success:function(res)
        {
          console.log(res)
        }
      })
  },
  //  商品数量减少
  itemCountSub:function(e)
  {
      var index = e.currentTarget.dataset.index
      var list = this.data.cartShopList;
      if(list[index].goodnum > 1)
      {
        list[index].goodnum = --list[index].goodnum;
        this.setData({
          cartShopList:list
        })
      }
      // 计算总价格
      this.allShopPrice();
  },
  //点击商品图片后跳转到商品详情页面
  onItemClick:function(e)
  {
      var index = e.currentTarget.dataset.itemIndex;
      wx.navigateTo({
        url: '../../pages/shopinfo/shopinfo?id=' + e.currentTarget.dataset.goodid,
      })
  },
  //  商品数量增加
  itemCountAdd:function(e)
  {
    var index = e.currentTarget.dataset.index;
    var list = this.data.cartShopList;
    list[index].goodnum = ++list[index].goodnum;
    this.setData({
      cartShopList:list
    })
    // 计算总价格
    this.allShopPrice();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  //得到购物车数据
  onShow: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.server + 'cart?',
      data:{
        uid:getApp().globalData.userInfo.id
      },
      success:function(res)
      {
        that.setData({
          cartShopList:res.data.cartInfo
        })
        that.allShopPrice();
      }
    })
   

    // 显示收货地址
   var otherAddressInfo = getApp().globalData.otherAddressInfo;
    if(otherAddressInfo == null)
    {
      var addressList = wx.getStorageSync('addressList');
      console.log(addressList)
      for(var key in addressList)
      {
        if(addressList[key].isDefault)
        {
          this.setData({
            addressInfo:addressList[key],
           isHaveAddress:true
          })
        }
      }
      if(this.data.addressInfo == null && addressList.length > 0)
      {
        this.setData({
         addressInfo:addressList[0],
          isHaveAddress:true
        })
      }  
    }
    else
    {
      this.setData({
        addressInfo:otherAddressInfo,
        isHaveAddress:true
      })
    }
    
},
//  选择其他地址
selectAddress:function()
{
  wx.navigateTo({
    url: '../../pages/addresslist/addresslist',
  })
},
//计算购物车总价值
allShopPrice:function()
{
    var shopList = this.data.cartShopList;
    var shopPrice = 0;
    for(var key in shopList)
    {//console.log("aa")
      shopPrice += parseInt(shopList[key].price * shopList[key].goodnum);
    }
    this.setData({
      allPrice:shopPrice
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

  },
  //跳转填写收货地址
  addAddress:function(){
    wx.navigateTo({
      url: '../../pages/address/address',
    })
  },
  //清空购物车
  clearCart:function()
  {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认清空购物车？',
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
            url: getApp().globalData.server + 'cart/clear',
            data:{
              uid:getApp().globalData.userInfo.id
            }
          })
          that.setData({
            cartShopList:null
          })
          // 计算总价格
          that.allShopPrice();
        }
      }
    })
  }
})