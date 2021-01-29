let startY;
let moveY;
let distantY;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveDistant:'translateY(0)',
    moveTransition:'',
    userInfo:{}
  },
  handleStart(event){
    startY=event.touches[0].clientY;
    this.setData({
      moveTransition:''
    });
  },
  handleMove(event){
    moveY=event.touches[0].clientY;
    distantY=moveY-startY;
    if(distantY<0){
      return;
    }
    if(distantY>=80){
      distantY=80
    }
    this.setData({
      moveDistant:`translateY(${distantY}rpx)`,
      moveTransition:'all linear 0.5s'
    });
  },
  handleEnd(){
    this.setData({
      moveDistant:`translateY(0rpx)`
    });
  },
  toLogin(){
wx.navigateTo({
  url: '/pages/login/login'
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let userInfo=JSON.parse(wx.getStorageSync('userinfo'));
 if(userInfo){
  this.setData({
    userInfo
  })
 }
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