// pages/personal_data/personal_data.js
Page({
  change1(e){
    console.log(e.detail.value)
    this.setData({
      USER_NAME:e.detail.value
    })
  },
  change2(e){
    console.log(e.detail.value)
    this.setData({
      SEX:e.detail.value
    })
  },
  change3(e){
    console.log(e.detail.value)
    this.setData({
      TELEPHONE:e.detail.value
    })
  },
  change4(e){
    console.log(e.detail.value)
    this.setData({
      QQ_NUMBER:e.detail.value
    })
  },
  change5(e){
    console.log(e.detail.value)
    this.setData({
      SPECIALILZED_SUBJECT:e.detail.value
    })
  },
  change6(e){
    console.log(e.detail.value)
    this.setData({
      GRADE:e.detail.value
    })
  },

  //修改用户昵称
  change(){
    let that=this
    var timestamp = new Date().getTime()
    this.setData({
      timestamp:String(timestamp),
    })
    console.log(this.data.tempFilePaths)
    if(this.data.flog==1){
    wx.cloud.uploadFile({
      cloudPath: this.data.timestamp + '.jpg',
      filePath: this.data.tempFilePaths, // 文件路径
      success: res => {
        // get resource ID
        console.log(res.fileID)
        that.setData({
          tempFilePaths:res.fileID
        })
        console.log(that.data.USER_NAME)
        wx.request({
          url: 'https://www.campustransaction.xyz/A_M/M_U_I/',
          data:{
            USER_ID:that.data.user_id,
            USER_NAME:that.data.USER_NAME,
            USER_PICTRUE:that.data.tempFilePaths,
            QQ_NUMBER:that.data.QQ_NUMBER,
            TELEPHONE:that.data.TELEPHONE,
            SPECIALILZED_SUBJECT:that.data.SPECIALILZED_SUBJECT,
            GRADE:that.data.GRADE,
            SEX:that.data.SEX,
          },
          success(res){
            console.log(res)
            if(res.data[0].result=="成功！")
        {
          
          wx.showLoading({
            title: '成功',
            mask:true
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 1000)
        }
        else{
          wx.showLoading({
            title: '失败',
            mask:true
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 1000)
        }
          }
         }) 
      },
      fail: err => {
        console.log(err)
        // handle error
      }
    })
  }
  else{
    wx.request({
      url: 'https://www.campustransaction.xyz/A_M/M_U_I/',
      data:{
        USER_ID:that.data.user_id,
        USER_NAME:that.data.USER_NAME,
        USER_PICTRUE:that.data.tempFilePaths,
        QQ_NUMBER:that.data.QQ_NUMBER,
        TELEPHONE:that.data.TELEPHONE,
        SPECIALILZED_SUBJECT:that.data.SPECIALILZED_SUBJECT,
        GRADE:that.data.GRADE,
        SEX:that.data.SEX,
      },
      success(res){
        console.log(res)
        if(res.data[0].result=="成功！")
        {
          
          wx.showLoading({
            title: '成功',
            mask:true
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 1000)
        }
        else{
          wx.showLoading({
            title: '失败',
            mask:true
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 1000)
        }
      }
     }) 
  }
},


  /**
   * 页面的初始数据
   */
  data: {
    a:"无",
    name:"",
    user_id:"",
    message:"",
    timestamp:"",
    flog:0,
    tempFilePaths:"",

    USER_ID:"",
    USER_NAME:"",
    USER_PASSWORD:"",
    USER_PICTRUE:"",
    QQ_NUMBER:"",
    TELEPHONE:"",
    SPECIALILZED_SUBJECT:"",
    GRADE:"",
    SEX:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    wx.getStorage({
      key: 'user_id',
      success (res) {
        console.log(res.data)
        that.setData({
          user_id:res.data,
        })
        wx.request({
          url: 'https://www.campustransaction.xyz/Q_M/U_I_Q/',
          data:{
            User_id:res.data
          },
          success(res1){
            that.setData({
              message:res1.data[0],
              tempFilePaths:res1.data[0].USER_PICTRUE,
              USER_ID:res1.data[0].USER_ID,
              USER_NAME:res1.data[0].USER_NAME,
              USER_PASSWORD:res1.data[0].USER_PASSWORD,
              QQ_NUMBER:res1.data[0].QQ_NUMBER,
              TELEPHONE:res1.data[0].TELEPHONE,
              SPECIALILZED_SUBJECT:res1.data[0].SPECIALILZED_SUBJECT,
              GRADE:res1.data[0].GRADE,
              SEX:res1.data[0].SEX,
            })
          }
        })
      }
    })
    
  },

  chooseImg(){
    let that=this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths:tempFilePaths[0],
          //add_img:tempFilePaths[0],
          flog:1,
        })
      },
      fail(res){
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