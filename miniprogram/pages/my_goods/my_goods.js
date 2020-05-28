// pages/buy/buy.js
import {request} from "../../request/index.js";
Page({


  //修改商品信息
  change_goods_info(e){
    console.log(e)
    console.log(e.target.dataset.ab)
    wx.reLaunch({
      url: '../sell/sell?goodsid='+e.target.dataset.ab,
    })
  },

  //下架

//下架商品

  Lower_shelf(e){
    console.log(e)
    console.log(e.target.dataset.ab)
    wx.request({
      url: 'https://www.campustransaction.xyz/L_M/O_T_S_G/',
      data:{
        COMMODITY_ID:e.target.dataset.ab,
      },
      success(res){
        console.log(res);
      },
      fail(res){
        console.log(res);
      }
    }),
    wx.redirectTo({
      url: 'my_goods',
    })
  },

//全部
  async my_goods(){
    let that=this
    wx.getStorage({
      key: 'user_id',
      success(res){
        wx.request({
          url: 'https://www.campustransaction.xyz/Q_M/A_P_Q/',
          data:{
            User_id:res.data
          },
          success(res){
            console.log(res);
            that.setData({
              goodslist:res.data
            })     
            for(var i in that.data.goodslist){
              var state
              if(that.data.goodslist[i].IS_PUTAWAY=="Under_the_shelf"){
                state="已下架"
                let updateVal = that.data.goodslist[i].IS_PUTAWAY;
                //goodslist[i].IS_PUTAWAY=state
                var up = "goodslist[" + i + "].IS_PUTAWAY";
                that.setData({
                  goodslist:that.data.goodslist,
                  i:i,
                  [up]:state
                })
              }
              else{
                state="下架"
                let updateVal = that.data.goodslist[i].IS_PUTAWAY;
                //goodslist[i].IS_PUTAWAY=state
                var up = "goodslist[" + i + "].IS_PUTAWAY";
                that.setData({
                  goodslist:that.data.goodslist,
                  i:i,
                  [up]:state
                })
              }
            }
          }
        })
      }
    })
  },

  //出售中
  async my_ongoods(){
    let that=this
    wx.getStorage({
      key: 'user_id',
      success(res){
        wx.request({
          url: 'https://www.campustransaction.xyz/Q_M/A_P_Q_O/',
          data:{
            User_id:res.data
          },
          success(res){
            console.log(res);
            that.setData({
              goodslist:res.data
            })     
            for(var i in that.data.goodslist){
              var state
                state="下架"
                let updateVal = that.data.goodslist[i].IS_PUTAWAY;
                //goodslist[i].IS_PUTAWAY=state
                var up = "goodslist[" + i + "].IS_PUTAWAY";
                that.setData({
                  goodslist:that.data.goodslist,
                  i:i+1,
                  [up]:state
                })
            }
          }
        })
      }
    })
  },

  //已下架
  async my_downgoods(){
    let that=this
    wx.getStorage({
      key: 'user_id',
      success(res){
        wx.request({
          url: 'https://www.campustransaction.xyz/Q_M/A_P_Q_U/',
          data:{
            User_id:res.data
          },
          success(res){
            console.log(res);
            that.setData({
              goodslist:res.data
            })     
            // for(var i in that.data.goodslist){
            //   var state
            //     state="上架"
            //     let updateVal = that.data.goodslist[i].IS_PUTAWAY;
            //     //goodslist[i].IS_PUTAWAY=state
            //     var up = "goodslist[" + i + "].IS_PUTAWAY";
            //     that.setData({
            //       goodslist:that.data.goodslist,
            //       i:i+1,
            //       [up]:state
            //     })
            // }
          }
        })
      }
    })
  },

  //页面触底事件
  totalPages:1,
  //获取商品列表数据
  async getGoodsList(){
    wx.showLoading({
      title: '加载中',
      mask:true,
    })
    const res=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",data:this.QueryParams});
    const total=res.data.message.total;
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
      //拼接数组
      goodsList:[...this.data.goodsList,...res.data.message.goods]
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  },

  //接口要的参数
  QueryParams:{
    query:"",
    cid:"5",
    pagenum:1,
    pagesize:10
  },
  //切换功能
  handleTabsItemChange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
    if(index==0){   
      this.setData({
        index:0,
      })
      this.my_goods()
    }
    if(index==1){   
      this.setData({
        index:1,
      })
      this.my_ongoods()
    }
    if(index==2){   
      this.setData({
        index:2,
      })
      this.my_downgoods()
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"出售中",
        isActive:false
      },
      {
        id:2,
        value:"已下架",
        isActive:false
      },
    ],
    goodsList:[],
    goodslist:[],
    index:"",
    flog:"已下架",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList()
    this.my_goods()
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
    
    //重置数组
    this.setData({
      goodsList:[]
    })
    //重置页码
    this.QueryParams.pagenum=1;
    //重新发送请求
    if(this.data.index==0){
      this.my_goods();
    }
    if(this.data.index==1){
      this.my_ongoods();
    }
    if(this.data.index==2){
      this.my_downgoods();
    }
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
  },

  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParams.pagenum>=this.totalPages)
      //console.log("meile")
      wx.showToast({
        title: '没有下一页数据了',
        icon:"none"
      })
    else{
      //console.log("haiyou")
      this.QueryParams.pagenum++;
      if(this.data.index==0){
        this.my_goods();
      }
      if(this.data.index==1){
        this.my_ongoods();
      }
      if(this.data.index==2){
        this.my_downgoods();
      }
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})