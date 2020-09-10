// miniprogram/pages/mainpage/mainpage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allinfo:[
    ],
    isshow:false
  },
  onClickAdd:function() {
    console.log("添加")
    wx.navigateTo({
      url: '../addpage/addpage',
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
    // this.useSqlYun({name:"delect",type:0})//添加用户信息
    // this.useSqlYun({name:"get",openid:"opNPd4kP5yc2byCK8HhhX2eO2C74"})
    this.onGetOpenid()//获取openid
    // this.useSqlYun({name:"add",openid:"opNPd4kP5yc2byCK8HhhX2eO2C74",info:[{title:"123",des:"des"},{title:"456",des:"890"}]})//添加用户信息
    // this.useSqlYun({name:"change",openid:"opNPd4kP5yc2byCK8HhhX2eO2C74",info:[{title:"123",des:"info"},{title:"456",des:"info"}]})//修改用户信息
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
  totleTips: function(info,icon) {
      wx.showToast({
        icon:icon,
        title: info,
      })
  },
  onGetOpenid: function() {
    if(app.globalData.openid){
      this.useSqlYun({name:"get",openid:app.globalData.openid})
      return;
    }
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        var openid=res.result.openid;
        app.globalData.openid = openid;
        this.useSqlYun({name:"get",openid:openid})
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  getUserInfo(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
            }
          })
        }
      }
    })
  },
  useSqlYun:function(data) {
    wx.cloud.callFunction({
      name: 'sum',
      data:data,
      success: res => {
        console.log("成功")
        console.log(res)
        if(data.name=="get"){
          this.setData({
            allinfo:res.result.data.info
          })
        }
      },
      fail: err => {
        console.log("失败")
        console.log(err)
        this.totleTips("调用失败","none")
      }
    })
  },
  longTapItem:function(e){
    console.log(e)
    var id=e.currentTarget.id;
    var kind=-1
    var info=this.data.allinfo
    for (let index = 0; index < info.length; index++) {
      const element = info[index];
      if(id==element.time){
        kind=index+1
        break
      }
    }
    var that=this
    wx.showModal({
      title: '提示',
      content: '是否要删除第'+kind+'条数据',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          info.splice(kind-1,1);
          that.useSqlYun({name:"delect",type:id,openid:app.globalData.openid,info:info})
          console.log(info)
          console.log('用户点击确定')
          that.setData({
            allinfo:info
          })
          that.totleTips("删除成功","success")
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  longTapAdd:function(e){
    this.setData({
      isshow:true
    })
  },
  bindTouchAddEnd:function(e){
    this.setData({
      isshow:false
    })
  },
})