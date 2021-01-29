
// miniprogram/pages/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slidedata:[],
    recommend_list:[],
    rank_list:[]
  },
  recommendSong(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // 获取轮播
    await request('/banner',{type:2}).then(res=>{
      this.setData({
    slidedata:res.banners
  });
  })
  // 获取推荐歌曲
  await request('/personalized',{limit:10}).then(res=>{
    this.setData({
      recommend_list:res.result
    });
  })
  // 获取排行榜
  let index=0;
  let newArr=[];
  while (index<5) {
    await request('/top/list',{idx:index++}).then(res=>{
      const hot={
        name:res.playlist.name,
        tracks:res.playlist.tracks
      }
    newArr.push(hot);
    })
  }  
this.setData({
  rank_list:newArr
})

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