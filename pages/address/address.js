// pages/address/address.js
var city = require('../../utils/city.js');
var detailedInfo;
var name;
var phoneNum;
var address={};
var addressList = [

];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinceList:[],
    cityList:[],
    districtList:[],
    indexProvince:0,
    indexCity:0,
    indexDistrict:0,
    isChecked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData(
        {
          provinceList:city.getProvince(),
          cityList:city.getCity(this.data.provinceList[this.data.indexProvince]),
          districtList:city.getArea(this.data.provinceList[this.data.indexProvince],
          this.data.cityList[this.data.indexCity])
        }
      )
      addressList = wx.getStorageSync('addressList').length > 0?wx.getStorageSync('addressList'):[]
  },
  //  改变省
  provinceChange:function(e)
  {
    this.setData(
      {
        indexProvince:e.detail.value,
        indexCity:0,
        indexDistrict:0
      }      
    )
    //  重新装载当前省的City列表
    this.setData(
      {
        cityList:city.getCity(this.data.provinceList[this.data.indexProvince])
      }
    )

    //  重新装在当前市的区县列表
    this.setData(
      {
        districtList:city.getArea(this.data.provinceList[this.data.indexProvince],
        this.data.cityList[this.data.indexCity])
      }
    )
  },
  cityChange:function(e)
  {
      this.setData(
        {
          indexCity:e.detail.value,
          indexDistrict:0
        }
      )
      //  重新装在当前市的区县列表
      this.setData(
        {
          districtList: city.getArea(this.data.provinceList[this.data.indexProvince],
            this.data.cityList[this.data.indexCity])
        }
      )
  },
  districtChange:function(e)
  {
    this.setData(
      {
        indexDistrict:e.detail.value
      }
    )
  },
  //  获取详细地址
  getAddressInfo:function(e)
  {
    detailedInfo = e.detail.value;    
  },
  //  获取收货人名字
  getName:function(e)
  {
    name = e.detail.value;
  },
  //  获取联系人电话
  getPhoneNum:function(e)
  {
    phoneNum = e.detail.value;
  },
  checkboxChange:function(e)
  {
    this.setData({
      isChecked:!this.data.isChecked
    })
    for(var key in addressList)
    {
      addressList[key].isDefault = false;
    }
  },
  //  点击添加地址
  addNewAddress:function(e)
  {
    address.province = this.data.provinceList[this.data.indexProvince];
    address.city = this.data.cityList[this.data.indexCity];
    address.district = this.data.districtList[this.data.indexDistrict];

    address.detailedInfo = detailedInfo;
    address.name = name;
    address.phoneNum = phoneNum;
    address.isDefault = this.data.isChecked;
    addressList.push(address);
    wx.setStorageSync('addressList', addressList);
    wx.navigateBack({
      delta:1
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