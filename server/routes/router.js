const express=require('express');
const route=express.Router();
const controller=require('../controller/controller');

const axios=require('axios');

//welcome page
route.get('/',(req,res)=>{
    //make a get request to api/users
    axios.get('http://localhost:3000/api/courses')
        .then(function(response){
            res.render("index.ejs",{courses:response.data});
        })
        .catch(err=>{
            res.send(err);
        })
    
});

//add courses page
route.get('/add_course',(req,res)=>{
    res.render("add_course.ejs");
});

//update courses page
route.get('/update_course',(req,res)=>{
    axios.get('http://localhost:3000/api/courses',{params:{id:req.query.id}})
    .then(function(coursedata){
        res.render("update_course",{course:coursedata.data})
    })
    .catch(err=>{
        res.send(err);
    })
});

//API
route.post('/api/courses',controller.create);//create new course
route.get('/api/courses',controller.find); 
route.put('/api/courses/:id',controller.update);//modify a course
route.delete('/api/courses/:id',controller.delete);//delete a course

module.exports=route;
