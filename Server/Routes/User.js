const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require("mongoose");
const router = express.Router();
const User = require('../Models/User');

createUser = (data) =>
{
    return new Promise((resolve, reject) =>
    {
        let newUser = new User(data);

        newUser.save((err)=>
        {
            if(err)
                reject(err);
            else
                resolve('User Added!')
        });

    });
};
login = (data) =>
{
   let user = User.findOne({email:data.id})
        .then(user=>
            {                
                if(user == null)
                {
                    return ({message:"user not found"})
                }
                else
                {                          
                    return user;
                }
            })
            .catch(err => console.log(err));
            return(user);
}

router.get("/test", (req,res)=>
{
    res.send("test")
})

router.post("/register", async (req,res)=>
{
    console.log("test");
    await createUser(req.body);
    res.send({message: "user added"})
})

router.get("/login/:id", async (req,res)=>
{
    console.log(req.params)
    let user = await  login(req.params);
    if(user)
    {
        console.log(user)
        res.send({message:"login sucessful", user:user})
    }
    else
    {
        res.send({message:"user not found"})
    }
    
})

module.exports = router;