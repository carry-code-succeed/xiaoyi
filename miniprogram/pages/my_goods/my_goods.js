// pages/buy/buy.js
import {request} from "../../request/index.js";
Page({

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
    wx.navigateTo({
      url: 'my_goods',
    })
  },

  

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
            that.setData({
              goodslist:res.data
            })
            
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
    this.getGoodsList();
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
      this.getGoodsList();
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})