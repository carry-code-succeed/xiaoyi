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
        groupId_avatar2:[
          
        ],
        xunwen:"",
        
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var flag=0
    var that=this
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
        for(var i=this.data.ne.length-1;i>=0;i--){
          if(this.data.ne[i].groupId.split("%")[0]==this.data.user_id&&this.data.ne[i].user_id!=this.data.user_id){
            console.log(this.data.ne[i].groupId)
            var obj={}
            obj.groupid=that.data.ne[i].groupId
            obj.avatar=that.data.ne[i].avatar
            obj.nickName=that.data.ne[i].nickName
            console.log(flag);
            if(flag==0){
              console.log("aaa");
              that.setData({
                //groupId_avatar:[...this.data.groupId_avatar,this.data.ne[i].groupId]
                groupId_avatar2:[...that.data.groupId_avatar,obj]
              })
            }
            elif()
           console.log(this.data.groupId_avatar)
          }
          if(this.data.ne[i].groupId.split("%")[1]==this.data.user_id&&this.data.ne[i].user_id!=this.data.user_id){
            console.log(this.data.ne[i].groupId)
            var obj={}
            obj.groupid=that.data.ne[i].groupId
            obj.avatar=that.data.ne[i].avatar
            obj.nickName=that.data.ne[i].nickName
            console.log(flag);
            if(flag==0){
              console.log("aaa");
              that.setData({
                //groupId_avatar:[...this.data.groupId_avatar,this.data.ne[i].groupId]
                groupId_avatar:[...that.data.groupId_avatar,obj]
              })
            }
            elif()
           console.log(this.data.groupId_avatar)
          }
        }
        if(groupId_avatar2.length!=0){
          that.setData({
            xunwen:"买家的询问"
          })
        }
        if(groupId_avatar.length!=0){
          that.setData({
            xunwen:"我的询问"
          })
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
    let that=this
    var flag=0
    //聊天室清空
    this.setData({
      groupId_avatar:[],
    })
    //得到有自己id的聊天室  
 for(var i=this.data.ne.length-1;i>=0;i--){
          if(this.data.ne[i].groupId.split("%")[0]==this.data.user_id&&this.data.ne[i].user_id!=this.data.user_id){
            console.log(this.data.ne[i].groupId)
            var obj={}
            obj.groupid=that.data.ne[i].groupId
            obj.avatar=that.data.ne[i].avatar
            obj.nickName=that.data.ne[i].nickName
            console.log(flag);
            if(flag==0){
              console.log("aaa");
              that.setData({
                //groupId_avatar:[...this.data.groupId_avatar,this.data.ne[i].groupId]
                groupId_avatar2:[...that.data.groupId_avatar,obj]
              })
            }
            elif()
           console.log(this.data.groupId_avatar)
          }
          if(this.data.ne[i].groupId.split("%")[1]==this.data.user_id&&this.data.ne[i].user_id!=this.data.user_id){
            console.log(this.data.ne[i].groupId)
            var obj={}
            obj.groupid=that.data.ne[i].groupId
            obj.avatar=that.data.ne[i].avatar
            obj.nickName=that.data.ne[i].nickName
            console.log(flag);
            if(flag==0){
              console.log("aaa");
              that.setData({
                //groupId_avatar:[...this.data.groupId_avatar,this.data.ne[i].groupId]
                groupId_avatar:[...that.data.groupId_avatar,obj]
              })
            }
            elif()
           console.log(this.data.groupId_avatar)
          }
         }
  },

  go(e){
       wx.navigateTo({
        url: '/pages/room/room?id=' + e.currentTarget.dataset.id,
       })
  }

})