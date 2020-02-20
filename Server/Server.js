const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require("mongoose");
require("dotenv").config({path:'config/config.env'});
const path = require('path');
const session = require('express-session');
const app = express();
const taskRouter = require('./Routes/Tasks');
const userRouter = require("./Routes/User");

app.use(bodyParser.json());
app.use(express.static("public"))

const port = process.env.PORT || 5000;
const dbURL = `mongodb+srv://${process.env.user}:${process.env.pass}@whatsnext-ide1y.mongodb.net/whatsNext?retryWrites=true&w=majority`


mongoose.connect(dbURL,{ useUnifiedTopology: true, useNewUrlParser: true })
    .then(()=>
    {
        console.log('Database Connected');
    })
    .catch(err=>
    {
        console.log(`Connection Error: ${err}`);
    }
)


app.use (
    session ({
       secret: "Key",
       saveUninitialized: false,       
       resave:false,
       rolling: true,
       cookie: { maxAge: 600000 }
    })
 );

 app.use((req,res,next)=>
 {
     //This is a global variable that can be accessed by templates
     res.locals.user = req.session.userInfo;
     next();
 })

app.get("/", (req,res)=>
{
    res.send("Test");
})

app.use("/tasks", taskRouter);
app.use("/users", userRouter);

app.listen(port, ()=>
{
    console.log(`Listening on ${port}`);
})