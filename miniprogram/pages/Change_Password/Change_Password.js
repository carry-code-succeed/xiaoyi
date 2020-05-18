
Page({


  //输入新密码
  password1(e){
    console.log(e);
    this.setData({
      password1:e.detail.value
    })
  },
  //输入确认密码
  password2(e){
    console.log(e);
    this.setData({
      password2:e.detail.value
    })
    if(this.data.password1==this.data.password2)
      {console.log("hege");
      this.setData({
        button_a:false
      })  
    }

  },

  change_password(){
    
      
    wx.request({
      url: 'https://139.196.203.66/A_M/M_U_I',
      data:{
        USER_ID:this.data.user_id,
        Information_name:"USER_PASSWORD",
        Information_content:this.data.password1,
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
    password1:"",
    password2:"",
    user_id:"11233121",
    button_a:true
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