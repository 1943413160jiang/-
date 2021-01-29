// miniprogram/pages/recommendSong/recommendSong.js
import request from '../../utils/request'
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
        date:'',
        month:'',
        recommend_list:[],
        index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userinfo=wx.getStorageSync('userinfo');
    if(!userinfo){
      wx.showToast({
        title: '请先登录',
        icon:'none',
        success:()=>{
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      });
    }
    this.setData({
      date:new Date().getDate(),
      month:new Date().getMonth()+1
    });
    this.get_commend_list();

    PubSub.subscribe('myType',(msg,type)=>{
      let {index,recommend_list}=this.data;
      if(type==='pre'){
       index<=0? index=recommend_list.length-1:index-=1;
      }else{
        index>=recommend_list.length-1? index=0:index+=1;
      }
      this.setData({
        index
      });
      let vid=recommend_list[index].id;
      PubSub.publish('sendId',vid);
    });
  },
  async get_commend_list(){
    await request('/recommend/songs').then(res=>{
     this.setData({
       recommend_list:res.recommend
     });
    })
  },
  toSongDetail(event){
    let id=event.currentTarget.dataset.id;
    let index=event.currentTarget.dataset.index;
      this.setData({
        index
      });
    wx.navigateTo({
      url:'/pages/songDetail/songDetail?id='+id,
    });
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