// pages/personal_data/personal_data.js
Page({

  //修改用户昵称
  change_name(e){

    this.setData({
      name:e.detail.value
    })
    wx.request({
      url: 'https://139.196.203.66/A_M/M_U_I',
      data:{
        USER_ID:this.data.user_id,
        Information_name:"USER_NAME",
        Information_content:this.data.name,
      },
      success(res){
        console.log(res)
      }
    })
  },


  /**
   * 页面的初始数据
   */
  data: {
    a:"江某",
    name:"",
    user_id:"11233121",
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