// pages/sell/sell.js
Page({
  
  async getGoodsdetail(goods_id){
    let that=this
    wx.request({
      url: 'https://www.campustransaction.xyz/Q_M/C_I_Q/',
      data:{
        Commodity_id:goods_id
      },
      success(res){
        console.log(res);
        that.setData({
          goods_detail:res.data,
          sell_id:res.data[0].USER_ID,
          add_img:res.data[0].COMMODITY_PICTURE,
          tempFilePaths:res.data[0].COMMODITY_PICTURE,
          add_img_succsed:"block",
          goods_name:res.data[0].COMMODITY_NAME,
          goods_price:res.data[0].COMMODITY_PRICE,
          goods_introduce:res.data[0].COMMODITY_INFO,
        })
        
      }
    })
  },

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
    
    a4(e){
      this.setData({
        goods_introduce:e.detail.value
      })
    },
  //
  
  upload(){
    let that=this;
    if(that.data.is_choose==1)
    {
    const filePath=this.data.tempFilePaths;
    var timestamp = Date.parse(new Date());
    const cloudPath=timestamp+filePath.match(/\.[^.]+?$/)[0];
    }
    else{
      wx.showLoading({
        title: '请上传图片',
        mask:true
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 500)
      return
    }
    
    
   wx.showLoading({
    title: '加载中',
    mask:true
  })
    console.log(that.data.goods_id);
    if(that.data.goods_id)
    {
      //有id
      wx.request({
        url: 'https://www.campustransaction.xyz/L_M/M_P_I/',
        data:{
          COMMODITY_ID:that.data.goods_id,
          COMMODITY_NAME:that.data.goods_name,
          COMMODITY_INFO:that.data.goods_introduce,
          COMMODITY_PRICE:that.data.goods_price,
          COMMODITY_PICTURE:that.data.tempFilePaths,
        },
        success(res){
          console.log(res);
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
    else{
      //无id
      if(that.data.goods_name && that.data.goods_price && that.data.goods_introduce) //都有值才会执行
      {
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
                    if(res.data[0].result=="成功！")
    
                      {wx.showLoading({
                        title: '成功',
                        mask:true
                      })
                      setTimeout(function () {
                        wx.hideLoading()
                      }, 1000)                
                    }
                    
                    if(res.data[0].result=="上架商品失败！")
                    {
                      wx.showLoading({
                        title: '失败',
                        mask:true
                      });
                      if(that.data.is_choose==1){
                        wx.cloud.deleteFile({
                          fileList:that.data.imgId
                        }).then(res=>{
                          console.log(res.fileList)
                        })
                        that.setData({
                          imgId:""
                        })
                      }  
                      
                      setTimeout(function () {
                        wx.hideLoading()
                      }, 1000)    
                    }
                    if(res.statusCode==500)
                    {
                      wx.showLoading({
                        title: '失败',
                        mask:true
                      });
                      setTimeout(function () {
                        wx.hideLoading()
                      }, 1000)
                    }
                  },
                  fail(res){
                    console.log(res); 
                    wx.showLoading({
                      title: '失败',
                      mask:true
                    });
                    setTimeout(function () {
                      wx.hideLoading()
                    }, 1000)    
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
        
      }
      else{
        wx.showLoading({
          title: '不能留空',
          mask:true
        });
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)    
      }
    
    }
    
  },

  cancleImg(){
    this.setData({
      tempFilePaths:"",
          add_img:"https://ae01.alicdn.com/kf/H00f3ec68a68e41ff80bb890d22cb13344.jpg",
          add_img_succsed:"none",
          imgId:"",
          is_choose:0,
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
          add_img_succsed:"block",
          is_choose:1,
        })
        
      },
      fail(res){
        
      }
    })
  },
  /**
   * 页面的初始数据
   */
  
  data: {
    is_choose:0,
    goods_id:"",
    list2:[],
    goods_detail:[],
    add_img_succsed:"none",
    add_img:"https://ae01.alicdn.com/kf/H00f3ec68a68e41ff80bb890d22cb13344.jpg",
    tempFilePaths:"",
    imgId:"",
    imgLocalUrl:"",
    imgUrl:"",
    goods_name:"",
    goods_price:"",
    goods_introduce:"",
    user_id:"a",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goodsid);
    let that=this
    wx.cloud.init({
      env: 'xiaoyi'
    })
    if(options.goodsid==undefined)
    {
      console.log("无");
    }
    else{
      that.setData({
        goods_id:options.goodsid,
      })
      that.getGoodsdetail(that.data.goods_id);
    }
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
    if(this.data.goods_id)
    {
      this.setData({
      goods_id:"",
      goods_detail:[],
      add_img_succsed:"none",
      add_img:"https://ae01.alicdn.com/kf/H00f3ec68a68e41ff80bb890d22cb13344.jpg",
      tempFilePaths:"",
      goods_name:"",
      goods_price:"",
      goods_introduce:"",
      sell_id:"",
      user_id:"a",
    })
    }
    
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