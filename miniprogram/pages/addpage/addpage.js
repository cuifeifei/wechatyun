// miniprogram/pages/addpage/addpage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    des:""
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

  },
  titleInput:function(e){
    this.setData({
      title    :    e.detail.value
    })
  },
  desInput:function(e){
    this.setData({
      des    :    e.detail.value
    })
  },
  onClickComit(){
    if(this.data.title==""||this.data.des==""){
      wx.showToast({
        icon:"none",
        title: "请填写记录数据",
      })
      return
    }
    var title=this.data.title
    var des=this.data.des
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var info={}
    info.title=title
    info.des=des
    info.time=timestamp
    this.addSqlYun({name:"add",openid:app.globalData.openid,info:info})
  },
  addSqlYun(data) {
    wx.cloud.callFunction({
      name: 'sum',
      data:data,
      success: res => {
        console.log("成功")
        console.log(res)
        wx.showToast({
          icon:"success",
          title: "备忘录添加成功",
        })
        wx.navigateTo({
          url: '../mainpage/mainpage',
        })
      },
      fail: err => {
        console.log("失败")
        console.log(err)
      }
    })
  },
})