

Page({

  zhuce(){
    let that=this
    wx.request({
      url: 'https://www.campustransaction.xyz/U_M/U_R/',
      data:{
        user_id:this.data.zhanghao,
        student_id:this.data.xuehao,
        student_name:this.data.xingming,
        user_password:this.data.mima1,
        user_name:this.data.name,
      },
      success(res){
        console.log(res)
        if(res.data=="ERROR")
        that.setData({
          meg:"学号或姓名有错或者已被注册过"
        })
        else{
          wx.redirectTo({
            url: '../login/login'
          })
        }
      },
      fail(res){
        console.log(res)
      }
    })
    
    
  },
  //数据存放

  

  a1(){
    wx.request({
      url: 'https://www.campustransaction.xyz/U_M/U_R/',
    })
  },
  //判断账号密码是否规范
  xhyz(){
    var mima3 = /^[0-9a-zA-Z_]{6,20}$/i;
    var zhanghao1 = /^[0-9a-zA-Z]{4,12}$/i
    if(this.data.zhanghao==="a" || this.data.mima1==="a" || this.data.mima2==="a" || this.data.xuehao==="a" || this.data.xingming==="a" || this.data.name==="a")
      this.setData({
        meg:"不能留空",
        jump:true
      }) 
    else if(this.data.mima1!=this.data.mima2)
      this.setData({
        meg:"两次输入密码不同",
        jump:true
      })
    else if (zhanghao1.test(this.data.zhanghao)==false)
      this.setData({
        meg:"账号不规范",
        jump:true
      })
    else if(mima3.test(this.data.mima1)==false)
      this.setData({
        meg:"密码不规范",
        jump:true
      })
    else if(this.data.value=="jujue")
      this.setData({
        meg:"请同意注册协议",
        jump:true
      })
    else
      this.setData({
        meg:"验证通过",
        jump:false
      })
  },
  //用户昵称暂存
  name(e){
    this.setData({
      name:e.detail.value
    })
  },
  //账号暂存
  zhanghao(e){
    this.setData({
      zhanghao:e.detail.value
    })
  },
  //密码暂存
  mima1(e){
    this.setData({
      mima1:e.detail.value
    })
  },
  //确认密码暂存
  mima2(e){
    this.setData({
      mima2:e.detail.value
    })
  },
  //学号暂存
  xuehao(e){
    this.setData({
      xuehao:e.detail.value
    })
  },
  //姓名暂存
  xingming(e){
    this.setData({
      xingming:e.detail.value
    })
  },
  //是否勾选注册协议
  checkboxChange(e){
    console.log(e)
    if(e.detail.value=="tongyi")
      this.setData({
        value:e.detail.value
      })
    else
      this.setData({
        value:"jujue"
      })
    this.xhyz()
  },
  /**
   * 页面的初始数据
   */
  data: {
    zhanghao:"a",
    mima1:"a",
    mima2:"a",
    xuehao:"a",
    xingming:"a",
    meg:"",
    value:"jujue",
    jump:true,
    name:"a",
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