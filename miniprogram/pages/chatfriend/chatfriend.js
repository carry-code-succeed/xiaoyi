// pages/chatfriend/chatfriend.js
//云数据库初始化
const db = wx.cloud.database({});
const cont = db.collection('river_data');

Page({
   data:{
        ne:[],  //这是一个空的数组，等下获取到云数据库的数据将存放在其中
        user_id:"",
        groupId_avatar:[
          
        ],
        
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //1、引用数据库   
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'xiaoyi'
    })
    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('chatroom').get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          ne: res.data
        })
        //得到有自己id的聊天室 
        for(var i in this.data.ne){
          if(this.data.ne[i].groupId.split("%")[0]==this.data.user_id){
           console.log(this.data.ne[i].groupId)
           this.setData({
            //groupId_avatar:[...this.data.groupId_avatar,this.data.ne[i].groupId,this.data.ne[i].avatar]

           })
           var obj={}
           obj.groupid=this.data.ne[i].groupId
           obj.avatar=this.data.ne[i].avatar
           this.data.groupId_avatar.push(obj)
           console.log(this.data.groupId_avatar)
          }
         }
      }
    })
    wx.getStorage({
      key: 'user_id',
      success (res) {
        console.log(res.data)
        _this.setData({
          user_id:res.data,
        })
      }
      
    })


  },    

  refreshchat(){
    //聊天室清空
    this.setData({
      groupId_avatar:[],
    })
    //得到有自己id的聊天室  
    for(var i in this.data.ne){
     if(this.data.ne[i].groupId.split("%")[0]==this.data.user_id){
      console.log(this.data.ne[i].groupId)
      this.setData({
        groupId_avatar:[...this.data.groupId_avatar,this.data.ne[i].groupId]
      })
     }
    }
  },

  go(e){
       wx.navigateTo({
        url: '/pages/room/room?id=' + e.currentTarget.dataset.id,
       })
  }

})