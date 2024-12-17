var mdb = require('mongoose')
var userSchema = mdb.Schema({
    username:String,
    email: String,
    password: String
})
const user_schema = mdb.model("users",userSchema)
module.exports = user_schema;