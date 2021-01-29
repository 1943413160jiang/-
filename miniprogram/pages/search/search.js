// miniprogram/pages/search/search.js
import request from '../../utils/request'
let flag=false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder_content:'搜索歌曲',
    hotlist:[],
    userInput:'',
    searchList:[],
    historyList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInit();
    this.getHistory();
  },
  getHistory(){
   let historyList= wx.getStorageSync('history');
   historyList=historyList===''? []:historyList
   this.setData({
     historyList
   });
  },
  clear(){
    this.setData({
      userInput:'',
      searchList:[]
    });
  },
  del(){
    wx.showModal({
      title:'你确定删除吗?',
      success:(res)=>{
        if(res.confirm){
          this.setData({
            historyList:[]
          });
          wx.removeStorageSync('history')
        }
      }
    })
  },
  async getInit(){
    let data=await request('/search/default');
    let hot=await request('/search/hot/detail');
    this.setData({
      placeholder_content:data.data.showKeyword,
      hotlist:hot.data
    });
  },
  handleInput(event){
      let userInput=event.detail.value;
      this.setData({
        userInput
      });
      if(flag){
        return;
      }
     setTimeout(() => {
      this.getInput();
      flag=false;
     }, 1000);
     flag=true;
  },
  async getInput(){
    if(!this.data.userInput){
      this.setData({
        searchList:[]
      });
      return;
    }
    let result=await request('/search',{keywords:this.data.userInput,limit:10});
    this.setData({
      searchList:result.result.songs
    });
    let {historyList}=this.data;
    if(historyList.indexOf(this.data.userInput)!==-1){
      historyList.splice(historyList.indexOf(this.data.userInput),1);
    }
    historyList.unshift(this.data.userInput);
    this.setData({
      historyList
    });
    wx.setStorageSync('history', historyList)
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