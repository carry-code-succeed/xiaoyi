
Page({

  
  
  /**
   * 页面的初始数据
   */
  data: {
      a:"aa",
      name:"aa",
      user_id:"",
      user_info:[],
      pictrue:"",
  },
  onShow(){
    
  },
  onLoad: function (options){
    let that=this
    wx.getStorage({
      key: 'user_id',
      success(res){
        console.log(res)
        that.setData({
          user_id:res.data
        })
        wx.request({
          url: 'https://www.campustransaction.xyz/Q_M/U_I_Q/',
          data:{
            User_id:res.data
          },
          success(res){
            console.log(res)
            that.setData({
              user_info:res.data
            })
            
          },
          fail(res){
            console.log(res)
          }
        })
      }
    })
    
  }
 
})