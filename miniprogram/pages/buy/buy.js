// pages/buy/buy.js
import {request} from "../../request/index.js";
Page({
  async getGoodslist(){
    let that=this
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    const pagination=this.QueryParams2.pagination
    const capacity=this.QueryParams2.capacity
    const Commodity_name=this.QueryParams2.Commodity_name
    console.log(Commodity_name);
    
    wx.request({
      url: 'https://139.196.203.66:443/Q_M/H_P_Q/',
      data:{
        pagination:pagination,
        capacity:capacity,
        Commodity_name:Commodity_name,
      },
      success(res){
        console.log(res)
        that.setData({
          goodslist:res.data,
        })
        that.setData({
          goodslist2:res.data[2].goods,
        })
        
        
        
      }
    })
    //const total=res.data.message.total;
    //this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
    
    //this.setData({
      //拼接数组
     // goodslist:[...this.data.goodslist,...res.data.message.goods]
    //})
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  },

  QueryParams2:{
    pagination:1,
    capacity:20,
    Commodity_name:"",
  },
  //页面触底事件
  totalPages:1,
  //获取商品列表数据
  async getGoodsList(){
    wx.showLoading({
      title: '加载中',
      mask:true
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
    pagesize:10,
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
        value:"默认",
        isActive:true
      },
      {
        id:1,
        value:"时间",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      },
    ],
    goodsList:[],
    goodslist:[],
    goodslist2:[],
    search_word:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options);
    if(options.search_word!=undefined)
    { console.log("关键词为"+options.search_word);
      this.QueryParams2.Commodity_name=options.search_word
      console.log(this.QueryParams2.Commodity_name);
      
      this.setData({
      search_word:options.search_word
    })
    } else{
      console.log("无关键词");
    }
    this.getGoodsList(),
    this.getGoodslist()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.QueryParams2.Commodity_name=""
    //重置数组
    this.setData({
      goodsList:[],
      goodslist:[]
    })
    //重置页码
    this.QueryParams.pagenum=1;
    //重新发送请求
    this.getGoodsList();
    this.getGoodslist();
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