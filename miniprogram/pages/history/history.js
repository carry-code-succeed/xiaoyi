// pages/history/history.js
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    goodslist:[],
    index:"",
    flog:"已下架",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.my_goods()
  },

  //全部
  async my_goods(){
    let that=this
    wx.getStorage({
      key: 'user_id',
      success(res){
        wx.request({
          url: 'https://www.campustransaction.xyz/U_M/S_H/',
          data:{
            USER_ID:res.data
          },
          success(res){
            console.log(res);
            // that.setData({
            //   goodslist:res.data
            // })     
            // for(var i in that.data.goodslist){
            //   var state
            //   if(that.data.goodslist[i].IS_PUTAWAY=="Under_the_shelf"){
            //     state="已下架"
            //     let updateVal = that.data.goodslist[i].IS_PUTAWAY;
            //     //goodslist[i].IS_PUTAWAY=state
            //     var up = "goodslist[" + i + "].IS_PUTAWAY";
            //     that.setData({
            //       goodslist:that.data.goodslist,
            //       i:i,
            //       [up]:state
            //     })
            //   }
            //   else{
            //     state="上架中"
            //     let updateVal = that.data.goodslist[i].IS_PUTAWAY;
            //     //goodslist[i].IS_PUTAWAY=state
            //     var up = "goodslist[" + i + "].IS_PUTAWAY";
            //     that.setData({
            //       goodslist:that.data.goodslist,
            //       i:i,
            //       [up]:state
            //     })
            //   }
            // }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //重置数组
    this.setData({
      goodsList:[]
    })
    //重置页码
    this.QueryParams.pagenum=1;
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
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