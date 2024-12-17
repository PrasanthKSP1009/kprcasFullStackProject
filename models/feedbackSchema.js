var mdb = require('mongoose')
var feedbackSchema = mdb.Schema({
    name: String,
    feedback:String
})
const feedback_schema = mdb.model("feedbacks",feedbackSchema)
module.exports = feedback_schema;