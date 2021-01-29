// miniprogram/pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    passowrd:''
  },
  handleInput(event){
    // 获取用户输入信息
    let val=event.detail.value;
    // 判断用户输入的是phone还是password
    let type=event.currentTarget.id;
    this.setData({
      [type]:val
    })
  },
  async login(){
    let {phone,password}=this.data;
    if(!phone){
      wx.showToast({
        title: '手机号码不能为空',
        icon:'none'
      })
      return;
    }
    let phoneReg=/^1(3|4|5|6|7|8|9)\d{9}$/
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机格式错误',
       icon:'none'
      })
      return;
    }
    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon:'none'
      })
      return;
    }
await request('/login/cellphone',{phone,password,isLogin:true}).then(res=>{
if(res.code===200){
  wx.showToast({
    title: '登录成功',
    icon:'none'
  });
  wx.setStorageSync('userinfo',JSON.stringify(res.profile))
  wx.reLaunch({
    url: '/pages/personal/personal',
  });
}else if(res.code===502){
  wx.showToast({
    title: '密码错误',
    icon:'none'
  })
}else if(res.code===400){
  wx.showToast({
    title: '手机号错误',
    icon:'none'
  })
}else{
  wx.showToast({
    title: '发生未知错误,请重新登录',
    icon:'none'
  })
}
})
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