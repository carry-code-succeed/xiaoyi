import {request} from "../../request/index.js";
Page({

  a1(e){
    this.setData({
      a:e.detail.value
    })
  },

  cancellation(){
    let that=this
    wx.request({
      url: 'https://139.196.203.66/A_M/L_O_U_A',
      data:{
        USER_ID:this.data.a
      },
      success(res){
        that.setData({
          b:res.data
          
        })
        wx.showLoading({
          title: that.data.b,
          mask:true
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      }
    })
    
  },
  /**
   * 页面的初始数据
   */
  data: {
    a:"",
    b:""
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