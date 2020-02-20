const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require("mongoose");
const router = express.Router();
const Task = require('../Models/Task');

getAllTasks =(id) =>
{
    return new Promise((resolve, reject)=>
    {
        Task.find({owner : id})
            .then(tasks =>
                {
                    resolve(tasks)
                })
            .catch(err=> reject(err));
    });
};
addtask = ( data ) =>
{
    return new Promise((resolve,reject)=>
    {
        let newTask =  new Task(data);

        newTask.save((err)=>
        {
            if(err)
                reject(err);
            else
                resolve(`New Task Added!`);
        });
    });
};

router.get("/tasks/:id", async (req,res)=>
{
    let owner = req.params.id;
    let tasks = await getAllTasks(owner);
    res.json(tasks);
})

router.post("/tasks", async (req,res) =>
{
    await addtask(req.body);
    res.send({message:'Task Added!'});
})

module.exports = router;