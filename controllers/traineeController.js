const express = require('express');
const trainee = require('../models/trainee');
const course = require('../models/courses');
const classes = require('../models/class');
const fs = require('fs');
const category = require('../models/categories');

async function getListClassForTrainee ( usernameSession){
    let profileTrainee= await trainee.findOne({username: usernameSession}).populate('classes');
    
    let listclassForTrainee = await classes.find({_id:{$in:profileTrainee.classes}}).populate('course');
        //let listclassForTrainee=profileTrainee.classes;
    
    for( var cl of listclassForTrainee){
        //  cl.listCourseForTrainee = await course.find({_id:cl.course}).populate('trainer');
        cl.listCourseForTrainee = await course.find({_id: {$in: cl.course},trainee:profileTrainee._id}).populate('trainer');   
        console.log(cl.name);
    }  
    return listclassForTrainee;
}
exports.getTraineePage = async(req, res) => {
    const listclassForTrainee = await getListClassForTrainee(req.session.username);
    let profileTrainee= await trainee.findOne({username: req.session.username}).populate('classes');
    console.log(listclassForTrainee);
    res.render('Trainee/traineePage',{profileTrainee:profileTrainee,listclassForTrainee: listclassForTrainee});   
}

exports.getTraineeProfile = async(req, res) => {
    
    const listclassForTrainee = await getListClassForTrainee(req.session.username);
    let profileTrainee= await trainee.findOne({username: req.session.username});
    console.log(req.session.username);
    res.render('Trainee/traineeProfile', {profileTrainee: profileTrainee,listclassForTrainee: listclassForTrainee});
}
exports.getTraineeCourse = async(req, res) => {
    
    const listclassForTrainee = await getListClassForTrainee(req.session.username);
    let profileTrainee = await trainee.findOne({username: req.session.username}).populate('classes');
   
    console.log(req.session.username);
    
    for( var cl of profileTrainee.classes){
        //  cl.listCourseForTrainee = await course.find({_id:cl.course}).populate('trainer');
        cl.listCourseForTrainee = await course.find({_id: {$in: cl.course}}).populate('trainee');   
    }
    res.render('Trainee/traineeProfile', {profileTrainee: profileTrainee,listclassForTrainee: listclassForTrainee});
}

exports.getViewDetailClass= async(req, res) => {
    
    let id = req.query.id;
    let profileTrainee= await trainee.findOne({username: req.session.username});
    const listclassForTrainee =await getListClassForTrainee(req.session.username);
    let detailClass = await classes.findById(id).populate('course trainee');
    
    listTraineeInClass= await trainee.find({_id:{$in:detailClass.trainee}});
    res.render('Trainee/traineeViewCourse',{profileTrainee:profileTrainee,detailClass:detailClass, listTraineeInClass: listTraineeInClass,
        listclassForTrainee: listclassForTrainee});

}
    exports.getCoursesCategory = async(req, res) => {
    let profileTrainee = await trainee.findOne({username: req.session.username});
    let listCategory = await category.find();
    const listclassForTrainee = await getListClassForTrainee(req.session.username);
    
    res.render('Trainee/coursesCategories', {profileTrainee:profileTrainee, listCategory: listCategory, listclassForTrainee: listclassForTrainee })

}

