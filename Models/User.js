const mongoose =  require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema =  mongoose.Schema;
const bcrypt = require("bcryptjs");


const newUserSchema = new Schema
({
    email :
    {
        type : String,
        required : true
    },
    password : 
    {
        type : String,
        required : true
    },
    timestampe :
    {
        type : Date,
        default : Date.now()
    }
})
const UserSchema = mongoose.model("Users", newUserSchema);


newUserSchema.pre("save",function(next)
{
    bcrypt.genSalt(10)
        .then(salt =>
            {
                bcrypt.hash(this.password,salt)
                    .then(hash=>
                        {       
                            this.password=hash

                            next();
                        })
            })
})


module.exports = UserSchema;