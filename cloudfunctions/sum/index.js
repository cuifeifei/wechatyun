// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cui-tongfei'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const temp = cloud.database()
  const db = temp.collection('user')
  switch(event.name){
    case "add"://添加
      var openid=event.openid;
      var info=event.info;
      const _ = temp.command
      return await  db.doc(openid).update({
        data: {
          info: _.push(info)
        }
      })
    case "delect"://删除
    // let res = await db.where({info:[1]}).remove();
      var openid=event.openid;
      return await db.doc(openid).update({
        data: {
          info:event.info
        }
      })
    // break
    // return await db.where({'info.num':'zx'}).get();
    case "change"://修改
      return;
    case "get"://获取
      var openid=event.openid;
      return await db.doc(openid).get();
    default:
      return 0;
  }
  //return event.a+event.b;
  // const dbs = cloud.database()
  // const db = dbs.collection('user')
  // users.add({
  //   data: {// data 字段表示需新增的 JSON 数据
  //     // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
  //     description: "learn cloud database",
  //     due: new Date("2018-09-01"),
  //     tags: [
  //       "cloud",
  //       "database"
  //     ],
  //     // 为待办事项添加一个地理位置（113°E，23°N）
  //     location: new db.Geo.Point(113, 23),
  //     done: false
  //   },
  //   success: function(res) {
  //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
  //     console.log(res)
  //   }
  // })

  
}