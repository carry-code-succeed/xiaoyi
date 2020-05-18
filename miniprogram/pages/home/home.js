import {request} from "../../request/index.js";
Page({
  async getGoodsList(){
    const res=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",data:this.QueryParams});
    
    this.setData({
      //拼接数组
      goodsList:res.data.message.goods
    })
  },
  QueryParams:{
    query:"",
    cid:"5",
    pagenum:1,
    pagesize:4
  },
  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    swiperList:[

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success:(result)=>{
        this.setData({
          swiperList:result.data.message
        })
      }
    })
    */
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
    .then(result=>{
      this.setData({
        swiperList:result.data.message
      })
    });
    this.getGoodsList()
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