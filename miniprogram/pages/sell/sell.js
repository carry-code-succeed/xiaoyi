// pages/sell/sell.js
Page({
  
  //数据暂存
    a1(e){
      this.setData({
        goods_name:e.detail.value
      })
    },
    a2(e){
      this.setData({
        goods_price:e.detail.value
      })
    },
    a3(e){
      this.setData({
        goods_num:e.detail.value
      })
    },
    a4(e){
      this.setData({
        goods_introduce:e.detail.value
      })
    },
  //
  upload(){
    let that=this;
    const filePath=this.data.tempFilePaths;
    var timestamp = Date.parse(new Date());
    const cloudPath=timestamp+filePath.match(/\.[^.]+?$/)[0];
    wx.getStorage({
      key: 'user_id',
      success(res){
        that.setData({
          user_id:res.data
        })
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: filePath, // 文件路径
          success: res => {
            // get resource ID
            that.setData({
              imgId:res.fileID
            })
            wx.request({
              url:'https://www.campustransaction.xyz/L_M/L_G/',
              data:{
                USER_ID:that.data.user_id,
                COMMODITY_NAME:that.data.goods_name,
                COMMODITY_INFO:that.data.goods_introduce,
                COMMODITY_PRICE:that.data.goods_price,
                COMMODITY_PICTURE:that.data.imgId,
              },
              success(res){
                console.log(res);
                if(res.data=="OK")

                  {wx.showLoading({
                    title: '成功',
                    mask:true
                  })
                  setTimeout(function () {
                    wx.hideLoading()
                  }, 1000)                
                }
                if(res.data=="ERROR")
                {
                  wx.showLoading({
                    title: '失败',
                    mask:true
                  });
                     
                  wx.cloud.deleteFile({
                    fileList:that.data.imgId
                  }).then(res=>{
                    console.log(res.fileList)
                  })
                  that.setData({
                    imgId:""
                  })
                  setTimeout(function () {
                    wx.hideLoading()
                  }, 1000)    


                }
              },
              fail(res){
                console.log(res); 
                
              }
            })
          },
          fail: err => {
            // handle error
          }
        })
      },
      fail(res){
        console.log(res);
        
      }
    })
    
  },

  cancleImg(){
    this.setData({
      tempFilePaths:"",
          add_img:"https://ae01.alicdn.com/kf/H00f3ec68a68e41ff80bb890d22cb13344.jpg",
          add_img_succsed:"none",
          imgId:"",
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
          add_img:tempFilePaths[0],
          add_img_succsed:"block"
        })
      }
    })
  },
  /**
   * 页面的初始数据
   */
  //关闭下拉框
  select_none(e){
    console.log(e.target.dataset.value)
    this.setData({
      type:e.target.dataset.value,
      list2:[]
    })
  },
  //点击出现下拉框
  select(){
    this.setData({
      list2:this.data.list1
    })
  },
  data: {
   
    type:"日常用品",
    list2:[],
    list1:[
      {
        id:0,
        name:"日常用品"
      },
      {
        id:1,
        name:"食物"
      },
      {
        id:2,
        name:"衣服"
      },
      {
        id:3,
        name:"其他"
      },
    ],
    add_img_succsed:"none",
    add_img:"https://ae01.alicdn.com/kf/H00f3ec68a68e41ff80bb890d22cb13344.jpg",
    tempFilePaths:"",
    imgId:"",
    imgLocalUrl:"",
    imgUrl:"",
    goods_name:"",
    goods_price:"",
    goods_num:"",
    goods_introduce:"",
    user_id:"a",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that=this
    wx.cloud.init({
      env: 'xiaoyi'
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