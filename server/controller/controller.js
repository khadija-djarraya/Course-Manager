var Coursedb= require('../model/model');

//create and save new course
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"Content can not be empty."});
        return;
    }
    //new course
    const course=new Coursedb({
        coursecode:req.body.coursecode,
        name:req.body.name,
        description:req.body.description,
        cohort:req.body.cohort
    })
    //save course in the database
    course
        .save(course)
        .then(data=>{
            //res.send(data)
            res.redirect('/add_course');
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occured while creating this course. Issue: the create operation."
            })
        })
}

//return one or all courses
exports.find=(req,res)=>{

    if(req.query.id){
        const id=req.query.id;
        Coursedb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Not found user with id="+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving user with id"+id})
            })
    } else {
        Coursedb.find()
        .then(course=>{
            res.send(course)
        })
        .catch(err=>{
        res.status(500).send({message:err.message || "Some error occured while retrieving information of this course. Issue: the find operation."})
        })
    }

    
}

//update course using its _id
exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update can not be empty!"})
    }
    const id=req.params.id;
    Coursedb.findByIdAndUpdate(id, req.body)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Can not Update course with ${id}. Check if this course exists.`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error in Updating user information. Issue: the update operation"})
    })
}

//delete a course using its _id
exports.delete=(req,res)=>{
    const id=req.params.id;
    Coursedb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Delete id ${id}. Maybe the id is incorrect`})
        }else{
            res.send({
                message:"Course was deleted successfully!"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Could not delete course with id="+id
        });
    });
}
