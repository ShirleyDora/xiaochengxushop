//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots:"true",//是否显示面板指示点
    autoplay:"true",//是否自动切换
    interval:"3000",//自动切换时间间隔
    duration:"500",//滑动动画时长
    //保存轮播图图像url
    imgUrls:[
      { url:'../../images/test.png'},
      { url: '../../images/test.png'},
      { url: '../../images/test.png'}
    ],
    navigationData:[
      {"name":"精品图书","icon":"http://cdn-img.easyicon.net/png/11780/1178089.gif"},
      { "name": "手机电脑", "icon": "http://cdn-img.easyicon.net/png/12087/1208792.gif" },
    ]
  },
  // 点击首页商品展示商品详情信息
  // 最热商品点击事件
  hotClick:function(){
    wx.navigateTo({
      url:'../../pages/shopinfo/shopinfo?id=' + this.data.hot.id,
    })
  },
  // 最新商品点击事件
  newClick:function(){
    wx.navigateTo({
      url:'../../pages/shopinfo/shopinfo?id=' + this.data.newbook.id,
    })
  },
  // 畅销商品点击事件
  sellClick:function(){
    wx.navigateTo({
      url:'../../pages/shopinfo/shopinfo?id=' + this.data.sell.id,
    })
  },
  onLoad: function () {
    var that = this;
    //请求导航按钮数据-从服务端获取商品种类数据
    wx.request({
      url:getApp().globalData.server + 'type',
      success:function(res){
        console.log(res)
          that.setData(
          {
              navigationData:res.data.type
          }
          )
      }
    })
    //请求轮播图数据
    wx.request({
      url:getApp().globalData.server + 'hnf',
      success:function(res){
        console.log(res);
        that.setData(
          {hot:res.data.result.hot[0],
          newbook:res.data.result.new[0],
          sell:res.data.result.sell[0],
          imgUrls:[{
            url:res.data.result.sell[0].img,
            id:res.data.result.sell[0].id
          }, {
              url: res.data.result.hot[0].img,
              id: res.data.result.hot[0].id
            }, {
              url: res.data.result.new[0].img,
              id: res.data.result.new[0].id
            }]}
        )
      }
    })
  },
  //轮播图页面跳转到商品详情页
  swiperClick:function(e){
    wx.navigateTo({
      url:'../../pages/shopinfo/shopinfo?id='+ e.currentTarget.dataset.id,
    })
  },
  //导航按钮跳转到指定种类的商品列表
  navClick:function(e){
    wx.navigateTo({
      url:'../../pages/categorygoods/categorygoods?itemType='+ e.currentTarget.dataset.type,
    })
  },
})
