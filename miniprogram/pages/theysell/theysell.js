
Page({

  async my_ongoods(){
   let that=this
    wx.request({
      url: 'https://www.campustransaction.xyz/Q_M/A_P_Q_O/',
      data:{
        User_id:that.data.seller_id
      },
      success(res){
        console.log(res);
        that.setData({
          goodslist:res.data
        })     
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    seller_id:"",
    seller_info:[],
    goodslist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    console.log(options)
    
    this.setData({
      seller_id:options.sell_id
    })
    this.my_ongoods()
    wx.request({
      url: 'https://www.campustransaction.xyz/Q_M/U_I_Q/',
      data:{
        User_id:this.data.seller_id
      },
      success(res1){
        console.log(res1)
        that.setData({
          seller_info:res1.data
        })
        
      },
      fail(res){
        console.log(res)
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