const mongoose =  require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema =  mongoose.Schema;

const newTaskSchema = new Schema
({
    title:
    {
        type:String,
        required : true,
    },
    description:
    {
        type: String
    },
    eventDate:
    {
        type:Date,
        required : true
    },
    eventTime:
    {
        type: Date,
        required: true,
    },
    owner :
    {
        type:String
    },
    timeStamp:
    {
        type : Date,
        default : Date.now()
    }
})

const TaskSchema = mongoose.model("Tasks", newTaskSchema);

module.exports = TaskSchema;