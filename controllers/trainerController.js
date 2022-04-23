const trainer = require('../models/trainer');
const trainee = require('../models/trainee');
const course = require('../models/courses');
const classes = require('../models/class');
const category = require('../models/categories');
const user = require('../models/users');
const express = require('express');

async function getListClassForTrainer ( usernameSession){
    let profileTrainer= await trainer.findOne({username: usernameSession}).populate('classes');
     
    let listclassForTrainer = await classes.find({_id:{$in:profileTrainer.classes}}).populate('course');
        //let listclassForTrainee=profileTrainee.classes;

    for( var cl of listclassForTrainer){
        //  cl.listCourseForTrainee = await course.find({_id:cl.course}).populate('trainer');
        cl.listCourseForTrainer =await course.find({_id: {$in: cl.course},trainer:profileTrainer._id}).populate('trainer');   
        console.log(cl.name);
    }  
    return listclassForTrainer;
}
exports.getTrainerPage = async(req, res) => {
    const listclassForTrainer =await getListClassForTrainer(req.session.username);
    let profileTrainer= await trainer.findOne({username: req.session.username}).populate('classes');

    res.render('Trainer/trainerPage',{profileTrainer:profileTrainer,listclassForTrainer: listclassForTrainer});  
}
exports.getTrainerProfile = async(req, res) => {
    const listclassForTrainer =await getListClassForTrainer(req.session.username);
    let profileTrainer = await trainer.findOne({username: req.session.username});
    console.log(profileTrainer);
    // let profileUser = await user.findOne( {'username': profileStaff.username} );
    res.render('Trainer/trainerProfile', { profileTrainer: profileTrainer,listclassForTrainer: listclassForTrainer});
}
exports.postTrainerProfile = async (req, res) => {
    let profileTrainer = await trainer.findOne({username: req.session.username});

    profileTrainer.fullname = req.body.txtFullname;
    profileTrainer.email = req.body.txtEmail;
    profileTrainer.age = req.body.txtAge;
    profileTrainer.address = req.body.txtAddress;
    profileTrainer.specialty = req.body.txtSpecialty;

    profileTrainer = await profileTrainer.save();
    res.redirect('/trainer/trainerProfile');
}
exports.getViewDetailClass= async(req, res) => {
    
    let id = req.query.id;  
    let profileTrainer = await trainer.findOne({username: req.session.username});
    const listclassForTrainer =await getListClassForTrainer(req.session.username);
    let detailClass = await classes.findById(id).populate('course trainee');
    
    listTraineeInClass= await trainee.find({_id:{$in:detailClass.trainee}});
    res.render('Trainer/trainerViewCourse',{profileTrainer:profileTrainer,detailClass:detailClass, listTraineeInClass: listTraineeInClass,
        listclassForTrainer: listclassForTrainer});
}

exports.getPwdTrainer = async (req, res) => {
    const listclassForTrainer =await getListClassForTrainer(req.session.username);
    let profileTrainer = await trainer.findOne({username: req.session.username});
    let pwdTrainer = await trainer.findOne({username: req.session.username});
    console.log(pwdTrainer);
    res.render('Trainer/changePwdTrainer', {profileTrainer:profileTrainer,listclassForTrainer:listclassForTrainer, pwdTrainer: pwdTrainer });
}

exports.changePasswordTrainer = async (req, res) => {

    let pwdTrainer = await trainer.findOne({username: req.session.username});
    pwdTrainer.password = req.body.txtPassword;

    let pwdUser = await user.findOne({ 'username': pwdTrainer.username }).exec();
    pwdUser.password = req.body.txtPassword;

    pwdTrainer = await pwdTrainer.save();
    pwdUser = await pwdUser.save();
    res.redirect('/trainer/trainerProfile');

}

exports.getChangeAvatar = async(req, res) => {
    const listclassForTrainer =await getListClassForTrainer(req.session.username);
    let profileTrainer = await trainer.findOne({username: req.session.username});
    let trainerAvatar = await trainer.findOne({username: req.session.username});
    console.log(trainerAvatar);
    // let profileUser = await user.findOne( {'username': profileStaff.username} );
    res.render('Trainer/changeAvatar', {profileTrainer:profileTrainer,listclassForTrainer: listclassForTrainer, trainerAvatar: trainerAvatar});
}

exports.postChangeAvatar = async (req, res) => {
    let trainerAvatar = await trainer.findOne({username: req.session.username});
    trainerAvatar.image = req.file.path;
    trainerAvatar = await trainerAvatar.save();
    res.redirect('/trainer/trainerProfile');
}

exports.getCoursesCategory = async(req, res) => {
    const listclassForTrainer =await getListClassForTrainer(req.session.username);
    let profileTrainer = await trainer.findOne({username: req.session.username});
    let listCategory = await category.find();
    res.render('Trainer/coursesCategories', {profileTrainer:profileTrainer,listclassForTrainer: listclassForTrainer, listCategory: listCategory })
}