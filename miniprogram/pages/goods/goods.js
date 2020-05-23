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
        console.log(res);
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
    const {goods_id}=options;
    console.log(goods_id);
    this.getGoodsdetail(goods_id)
  },





//账号暂存
feikong1(e){
  this.setData({
    zhanghao:e.detail.value,
    chatCollection:this.data.zhanghao
  })
},

// 聊天室
async go(){
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
  
  try {
      const { result } = await wx.cloud.callFunction({
        name: 'openapi',
        data: {
          action: 'requestSubscribeMessage',
        },
      })

      const templateId = result

      console.warn('[云函数] [openapi] 获取订阅消息模板 调用成功：', templateId)
      that.setData({
        templateId,
      })
    } catch (err) {
      wx.showToast({
        icon: 'none',
        title: '调用失败',
      })
      console.error('[云函数] [openapi] 获取订阅消息模板 调用失败：', err)
    }
    const templateId = that.data.templateId

    if (!templateId) {
      wx.showModal({
        title: '发送失败',
        content: '请先获取模板 ID',
        showCancel: false,
      })
    }

    wx.requestSubscribeMessage({
      tmplIds: [templateId],
      success: (res) => {
        if (res[templateId] === 'accept') {
          that.setData({
            requestSubscribeMessageResult: '成功',
          })
        } else {
          that.setData({
            requestSubscribeMessageResult: `失败（${res[templateId]}）`,
          })
        }
      },
      fail: (err) => {
        that.setData({
          requestSubscribeMessageResult: `失败（${JSON.stringify(err)}）`,
        })
      },
    })
    that.setData({
      subscribeMessageResult: '',
    })

    wx.cloud.callFunction({
      name: 'openapi',
      data: {
        action: 'sendSubscribeMessage',
        templateId: that.data.templateId,
      },
      success: res => {
        console.warn('[云函数] [openapi] subscribeMessage.send 调用成功：', res)
        wx.showModal({
          title: '发送成功',
          content: '请返回微信主界面查看',
          showCancel: false,
        })
        wx.showToast({
          title: '发送成功，请返回微信主界面查看',
        })
        that.setData({
          subscribeMessageResult: JSON.stringify(res.result)
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [openapi] subscribeMessage.send 调用失败：', err)
      }
    })
   

}
})


  


  
  



