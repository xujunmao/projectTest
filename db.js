function db(success, error) {
    const mongoose = require("mongoose")
    const {HOST,IP,PORT,DB} =require("./dbConfig.js")
    mongoose.connect(`${HOST}://${IP}:${PORT}/${DB}`)
    mongoose.connection.once('open', () => {
        success()
        console.log("链接成功")
    })
    mongoose.connection.on("error", () => {
        if(typeof error==="function"){
            error()
            return
        }
        console.log("链接错误")
    })
    mongoose.connection.on("close", () => {
        console.log("链接关闭")
    })
}

module.exports=db
