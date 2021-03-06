import {request} from "../../request/index.js";
Page({

  async getGoodsdetail(goods_id){
    let that=this
    wx.request({
      url: 'https://www.campustransaction.xyz/Q_M/C_I_Q/',
      data:{
        Commodity_id:goods_id
      },
      success(res){
        that.setData({
          goods_detail:res.data,
          sell_id:res.data[0].USER_ID
        })
      }
    })
  },

  
  /**
   * 页面的初始数据
   */
  data: {
    goods_detail:{},
    user_id:"",
    sell_id:"",
    chatid:"",
    templateId: '',
    subscribeMessageResult: '',
    requestSubscribeMessageResult: '',
    wxacodeSrc: '',
    wxacodeResult: '',
    showClearWXACodeCache: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    const {goods_id}=options;
    console.log(goods_id);
    this.getGoodsdetail(goods_id)
    wx.getStorage({
      key: 'user_id',
      success (res) {
        console.log(res.data)
        that.setData({
          user_id:res.data,
        })
        console.log(that.data.user_id)
        wx.request({
          url: 'https://www.campustransaction.xyz/U_M/A_H/',
          data:{
            USER_ID:that.data.user_id,
            // COMMODITY_ID:goods_id,
            COMMODITY_ID:'20200510181135',
          },
          success(res1){
            console.log(res1)
          }
        })
      }
    })
  },





//账号暂存
feikong1(e){
  this.setData({
    zhanghao:e.detail.value,
    chatCollection:this.data.zhanghao
  })
},

// 聊天室
go(){
  let that=this
  wx.getStorage({
    key: 'user_id',
    success (res) {
      console.log(res.data)
      that.setData({
        user_id:res.data,
        chatid:that.data.goods_detail[0].USER_ID + '%' + res.data
      })
     wx.navigateTo({
      url: '/pages/room/room?id=' + that.data.chatid,
  })
    }
  })
}
})


  


  
  



