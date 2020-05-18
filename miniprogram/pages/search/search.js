// pages/search/search.js
Page({

  emptyHistory(){
    this.setData({
      searchHistory:""
    })
  },
  /**
   * 页面的初始数据
   */
  search(){
    console.log(this.data.searchValue)
  },
  //接收输入框数据
  searchInput(e){
    this.setData({
      searchValue:e.detail.value
    })
  },
  //点击热门搜索里的属性时触发
  hotSearch(e){
    this.setData({
      searchValue:e.target.dataset.option,
      input_value:e.target.dataset.option
    })
    this.search()
  },
  data: {
    searchHistory:[
      {
        id:0,
        name:"鼠标垫"
      },
      {
        id:1,
        name:"口红"
      },
      {
        id:2,
        name:"运动鞋"
      },
    ],
    searchValue:"",
    input_value:"",
    shopList:[
      {
        id:0,
        name:"鼠标垫"
      },
      {
        id:1,
        name:"口红"
      },
      {
        id:2,
        name:"运动鞋"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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