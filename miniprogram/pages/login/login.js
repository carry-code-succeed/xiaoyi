// pages/denglu/denglu.js
Page({


  a1(){
    let that=this
    wx.request({
      url: 'https://139.196.203.66:443/U_M/U_L/',
      data:{
        user_id:this.data.zhanghao,
        user_password:this.data.mima,
      },
      success(res){
        
        console.log(res)
        console.log(res.data)
        if(res.data==that.data.zhanghao){
          wx.setStorage({
            data: res.data,  
            key: 'user_id',
          }),
          wx.switchTab({
            url:"../home/home",
            success(res){
              console.log(res)
            }
          })
        } else{
          that.setData({
            meg:"账号或密码错误"
          })
        }
        
      },
      fail(res){
        console.log(res)
      }
    })
  },

  //账号暂存
  feikong1(e){
    this.setData({
      zhanghao:e.detail.value,
      jump:true
    })
    
  },
  //密码暂存
  feikong2(e){
    this.setData({
      mima:e.detail.value,
      jump:true
    })
  },
  //提交数据，并进行非空判断
  submit1(){
    var mima3 = /^[0-9a-zA-Z_]{6,20}$/i;
    var zhanghao1 = /^[0-9a-zA-Z]{4,20}$/i
    if(this.data.zhanghao==="a" || this.data.mima==="a")
      this.setData({
        meg:"账号或密码不能为空",
        jump:true
      })
      else if (zhanghao1.test(this.data.zhanghao)==false)
      this.setData({
        meg:"账号或密码错误",
        jump:true
      })
    else if(mima3.test(this.data.mima1)==false)
      this.setData({
        meg:"账号或密码错误",
        jump:true
      })
    
    else
      this.setData({
        jump:false,
        meg:""
      })

  },

  /**
   * 页面的初始数据
   */
  data: {
    zhanghao:"a",
    mima:"a",
    meg:"",
    jump:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.clearStorage()
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