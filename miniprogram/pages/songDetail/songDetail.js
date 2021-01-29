
import request from '../../utils/request'
import PubSub, { publish } from 'pubsub-js'
import moment from 'moment'
const globalInstance=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
          isPlay:false,
          song:{},
          musicId:'',
          url:'',
          currentTime:'00:00',
          durationTime:'',
          currentWidth:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        let musicId=options.id;
        this.setData({
          musicId
        });
        this.getSong(musicId);
        if(globalInstance.globalData.isPlay && globalInstance.globalData.musicPlayId===musicId){
          this.setData({
            isPlay:true
          });
        }
        this.backgroundAudioManager= wx.getBackgroundAudioManager();
        this.backgroundAudioManager.onPlay(()=>{
          this.getIsPlay(true);
          globalInstance.globalData.musicPlayId=musicId
        });
        this.backgroundAudioManager.onPause(()=>{
         this.getIsPlay(false);
        });
        this.backgroundAudioManager.onStop(()=>{
          this.getIsPlay(false);
        });
        this.backgroundAudioManager.onTimeUpdate(()=>{
          let currentTime=moment(this.backgroundAudioManager.currentTime*1000).format('mm:ss');
          let currentWidth=this.backgroundAudioManager.currentTime/this.backgroundAudioManager.duration*400;
          this.setData({
            currentTime,
            currentWidth
          });
        });
        this.backgroundAudioManager.onEnded(()=>{
          PubSub.publish('myType','next');
          this.setData({
            currentWidth:0,
            currentTime:'00:00'
          });
        });
  },
  getIsPlay(isPlay){
    this.setData({
      isPlay
    });
    globalInstance.globalData.isPlay=isPlay;
  },
  async getSong(ids){
      await request('/song/detail',{ids}).then(res=>{
        let durationTime=moment(res.songs[0].dt).format('mm:ss');
        this.setData({
          song:res.songs[0],
          durationTime
        });
        wx.setNavigationBarTitle({
          title: this.data.song.name,
        })
      });
  },
  togglePlay(){
    let isPlay=!this.data.isPlay;
    this.setData({
      isPlay
    });
    let {musicId,url} = this.data;
    this.getSongPlay(musicId,this.data.isPlay,url);
  },
  async getSongPlay(id,isPlay,url){
        if(isPlay){
        if(!url){
          await request('/song/url',{id}).then(res=>{
            url=res.data[0].url
            this.setData({
              url
            });
          });
        }
        this.backgroundAudioManager.src=url;
        this.backgroundAudioManager.title=this.data.song.name;
        }else{
            this.backgroundAudioManager.pause();
        }
  },
  handleSwitch(event){
    this.backgroundAudioManager.stop();
    let type=event.currentTarget.id;
    PubSub.subscribe('sendId',(msg,id)=>{
      this.getSong(id);
      this.getSongPlay(id,true);
      PubSub.unsubscribe('sendId');
    });
    PubSub.publish('myType',type);
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