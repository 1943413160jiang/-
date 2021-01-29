// miniprogram/pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_list:[],
    current:'',
    video_list:[],
    videId:'',
    videoTimeUpdate:[],
    trigger:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
async getNavList(){
 await request('/video/group/list').then(res=>{
   this.setData({
     nav_list:res.data.slice(0,14),
     current:res.data[0].id
   });
   this.getVideoList(res.data[0].id);
  })
},
async getVideoList(id){
  await request('/video/group',{id}).then(res=>{
    let index=0;
    wx.hideLoading();
    let video_list=res.datas.map(item=>{
      item.id=index++;
      return item;
    });
    this.setData({
      video_list,
      trigger:false
    });
  })
},
toNav(event){
  let current=event.currentTarget.id;
  this.setData({
    current:current>>>0,
    video_list:[]
  });
  wx.showLoading({
    title: '正在加载',
  })
  this.getVideoList(current);
},
handlePlay(event){
    let vid=event.currentTarget.id;
    // this.vid!==vid && this.VideoContext && this.VideoContext.stop();
    // this.vid=vid;
    this.setData({
      videId:vid
    });
    this.VideoContext=wx.createVideoContext(vid);
    let {videoTimeUpdate}=this.data;
    let videoItem=videoTimeUpdate.find(item=>item.id===vid);
    if(videoItem){
      this.VideoContext.seek(videoItem.currentTime);
    }
    this.VideoContext.play();
},
handleTime(event){
      let {videoTimeUpdate}=this.data;
      let obj={
        id:event.currentTarget.id,
        currentTime:event.detail.currentTime
      }
      let videItem=videoTimeUpdate.find(item=>item.id===obj.id)
      if(videItem){
        videItem.currentTime=obj.currentTime
      }else{
        videoTimeUpdate.push(obj);
      }
      this.setData({
        videoTimeUpdate
      });
},
handleEnd(event){
      let {videoTimeUpdate}=this.data;
      let vid=event.currentTarget.id;
      videoTimeUpdate.splice(videoTimeUpdate.findIndex(item=>item.id===vid),1);
      this.setData({
        videoTimeUpdate
      });
},
downupload(){
  this.setData({
    trigger:true
  });
  this.getVideoList(this.data.current);
},
tolower(){
    let {video_list}=this.data;
    let clone=video_list;
    video_list.push(...clone);
    this.setData({
      video_list
    });
    
},
handleSearch(){
  wx.navigateTo({
    url: '/pages/search/search',
  })
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
console.log("下拉了");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (obj,event) {
    let {video_list} = this.data;
    let videoItem=video_list.find(item=>
      item.data.vid===obj.target.id)
        if(obj.from==='button'){
          return {
              title:videoItem.data.title,
              path:'/pages/video/video',
              imageUrl:videoItem.data.coverUrl
          }
        }
  }
})