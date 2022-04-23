const user = require('../models/users');
const staff = require('../models/staff')
const trainee = require('../models/trainee');
const trainer = require('../models/trainer');
const course = require('../models/courses');
const classes = require('../models/class');
const category = require('../models/categories');
const util = require('./util');
const hbs = require('hbs');

exports.getStaffPage = async(req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});
    res.render('Staff/staffPage',{profileStaff: profileStaff});
}

exports.getStaffProfile = async(req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});
    console.log(profileStaff);
    res.render('Staff/staffProfile', {profileStaff: profileStaff});
}

//Trainee functions
exports.getRegisterTrainee = async(req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});
    res.render('Staff/traineeRegister',{profileStaff: profileStaff});
}

exports.postRegisterTrainee = async(req, res) => {
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const usernameInput = req.body.txtUsername;
    const passwordInput = req.body.txtPassword;
    const ageInput = req.body.txtAge;
    const addressInput = req.body.txtAddress;
    const educationInput = req.body.txtEducation;
    let account =await user.findOne({username: usernameInput})

    console.log(account);   
    let newTrainee = new trainee ({
        fullname: nameInput,
        email: emailInput,
        username: usernameInput,
        password: passwordInput,
        age: ageInput,
        address: addressInput,
        education: educationInput
        
    });
    if(account == null) {
    newTrainee = await newTrainee.save();
    
        let newUser = new user({
            username:usernameInput,
            password:passwordInput,
            role: "Trainee"
        })
        newUser = await newUser.save();
    }
    else{
       
    }
    res.redirect('/staff/traineeManagement')
}


exports.getEditTrainee = async (req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});
    let id = req.query.id;   
    let edittrainee = await trainee.findById(id);
    res.render('Staff/traineeEdit', {profileStaff: profileStaff, editTrainee: edittrainee, loginName : req.session.username })
}
exports.getTraineeProfile = async(req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});
    let id = req.query.id;
    let profileTrainee = await trainee.findOne({_id: id});
    console.log(req.session.username);
   
    res.render('Staff/staffViewTranieeProfile', {profileStaff: profileStaff,profileTrainee: profileTrainee});
}

exports.postEditTrainee = async (req, res) => {
    let id = req.body.id;
    let profileTrainee = await trainee.findOne({_id: id});
     
    profileTrainee.fullname = req.body.txtName;
    profileTrainee.age = req.body.txtAge;
    profileTrainee.address = req.body.txtAddress;
    profileTrainee.education = req.body.txtEducation;
    profileTrainee.image = req.file.path;
    console.log(profileTrainee.image);
    profileTrainee = await profileTrainee.save();

    res.redirect('/staff/traineeProfile?id='+profileTrainee._id);
}


exports.getdeleteTrainee = async (req, res) => {
    let id = req.query.id;
    let deleteTrainee = await trainee.findById(id);
    let username = deleteTrainee.username;
    await trainee.deleteOne({ 'username': username });
    await user.deleteOne({ 'username': username });
    
    trainee.findByIdAndRemove(id).then(data = {});
    res.redirect('/staff/traineeManagement');
}

exports.searchTrainee= async (req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});
    const keyword = req.body.keyword;
    console.log(req.body.keyword);
    let listTrainee;
    let checkAlphabet = util.checkName(keyword);
    const searchFullname = new RegExp(keyword, 'i');

    if (checkAlphabet) {
        listTrainee = await trainee.find({ fullname: searchFullname });
    }
    res.render('Staff/traineeManagement', {profileStaff: profileStaff, listTrainee: listTrainee });
}
exports.postChangePassTrainee = async (req, res) => {

    let id = req.body.id;
    let traineePass = await trainee.findOne({_id: id});
    console.log(traineePass);
    let userPass = await user.findOne({username: traineePass.username});
    
    let oldPassword =req.body.txtOldPass;
    let newPassword =req.body.txtNewPass;
    let confirmPassword =req.body.txtConfirmPass;
    
    if(oldPassword ==traineePass.password)
    {     
        if(newPassword == confirmPassword){
            traineePass.password =req.body.txtConfirmPass;
            userPass.password =req.body.txtConfirmPass;

            userPass = await userPass.save();
            traineePass = await traineePass.save();
           
            console.log("Update password successfully")
            console.log(traineePass.password);
        }
    }
    else {
        console.log("Update password failed")
    }
    res.redirect('/staff/traineeProfile?id='+id);
}
exports.getTraineeManagement = async(req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});
    let listTrainee = await trainee.find();
    res.render('Staff/traineeManagement', {profileStaff: profileStaff,listTrainee: listTrainee})
}
//Category functions
exports.postAddCategory = async(req, res) => {
    const nameInput = req.body.txtName;

    let newCategory= new category ({
        name: nameInput
    });
    newCategory = await newCategory.save();
    res.redirect('/staff/categoryManagement')
}
// exports.getAddCategory = async(req, res) => {
//     res.render('categoryAdd');
// }
exports.postEditCategory = async(req, res) => {
    let id = req.body.id;
    console.log(id);
    let editCategory = await category.findById(id);
    editCategory.name = req.body.txtName;
    console.log(editCategory.name);
    editCategory = await editCategory.save();

    res.redirect('/staff/categoryManagement');
}
exports.searchCategory = async(req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});
    const keyword = req.body.keyword;
    console.log(req.body.keyword);
    let listCategory;
    let checkAlphabet = util.checkName(keyword);
    const searchName = new RegExp(keyword, 'i');

    if (checkAlphabet) {
        listCategory = await category.find({ name: searchName });
    }
    res.render('Staff/categoryManagement', {profileStaff: profileStaff, listCategory: listCategory });
}
exports.getCategoryManagement = async(req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});
    let listCategory = await category.find();
    res.render('Staff/categoryManagement', {profileStaff: profileStaff,listCategory: listCategory})
}

//course Functions
exports.getAddCourse = async(req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});
    var listCategory= await category.find();
    var listTrainer = await trainer.find();
    res.render('Staff/courseAdd',{profileStaff: profileStaff,listCategory:listCategory,listTrainer:listTrainer});
}
exports.getEditCourse = async (req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});
    let id = req.query.id; 
    let editCourse = await course.findById(id)
    let listCategory = await category.find();
    let listTrainer = await trainer.find();
    res.render('Staff/courseEdit', {profileStaff: profileStaff,editCourse: editCourse, listCategory: listCategory, listTrainer: listTrainer});
}

exports.postUpdateCourse = async (req, res) => {
    let id = req.body.id;
    console.log(req.body);
    console.log(id);
    let editCourse = await course.findById(id);
    editCourse.name = req.body.txtName;
    editCourse.category = req.body.txtCategory;
    editCourse.trainer = req.body.txtTrainer;
    editCourse.description = req.body.txtDescription;
    try {
        editCourse = await editCourse.save();
        res.redirect('/staff/courseManagement');   
    } catch (error) {
        throw new Error
    }
}
exports.getCourseManagement = async(req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});

    let listCourse = await course.find({}).populate('trainer category');
    
    for( var c of listCourse){
        // let categoryDetail = await category.findOne({_id:c.category});
        // c.categoryName = categoryDetail.name;
        // let trainerName = await trainer.findOne({_id:c.trainer});
        
        console.log(c.category.name);
        
        // c.trainerName = c.trainer;
        c.categoryName= c.category.name;
    }

    // console.log(listCourse.categoryID);
    res.render('Staff/courseManagement', {profileStaff: profileStaff,listCourse: listCourse})
}

exports.postAddCourse = async(req, res) => {
    const codeInput = req.body.txtCode;
    const nameInput = req.body.txtName;
    const categoryInput = req.body.txtCategory;
    const trainerInput = req.body.txtTrainer;
    const descriptionInput = req.body.txtDescription;
    console.log(" categoryInput: " + categoryInput);
    let newCourse = new course ({
        code: codeInput,
        name: nameInput,
        category : categoryInput,
        trainer: trainerInput,
        description: descriptionInput
    });

    newCourse = await newCourse.save();
    res.redirect('/staff/courseManagement')
}
//Class functions

exports.getAddClass = async(req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});
    var listCourse= await course.find({}).populate('trainer');;
    for( var c of listCourse){
        c.trainerName=c.trainer.fullname;
    }

    res.render('Staff/classAdd',{profileStaff: profileStaff,listCourse:listCourse});
}
exports.getClassManagement = async(req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});

    let listClass = await classes.find({}).populate('course trainee');
    
    for( var cl of listClass){
        let detailCourse = await course.findOne({_id:cl.course}).populate('trainer');
        cl.listCourseInClass =await course.find({_id: {$in: cl.course}}).populate('trainer');   
    }
    res.render('Staff/classManagement', {profileStaff: profileStaff,listClass: listClass})
}
exports.postAddClass = async(req, res) => {
    const nameInput = req.body.txtName;
    const courseInput = req.body.txtCourse;
    let newCLass = new classes ({
        name: nameInput,
        course : courseInput,
    });
    newCLass = await newCLass.save();
    res.redirect('/staff/classManagement')
}
let classID;
exports.getClassDetail = async(req, res) => {
    let profileStaff = await staff.findOne({username: req.session.username});
    let id = req.query.id;
    classID = id;
    var listTraineeInClass;
    var listTraineeForAdd;
    var listCourseForAdd;
    var listCourseInClass;

    let detailClass = await classes.findById(id).populate('course trainee');
    let listTrainee = await trainee.find({});
    let listCourse = await course.find({});

    if(detailClass.trainee.length==0){
        listTraineeForAdd = listTrainee;
    }
    else {   
        listTraineeInClass= await trainee.find({_id:{$in:detailClass.trainee}});

        listTraineeForAdd = await trainee.find({_id: {$nin: detailClass.trainee}});
    }

    if(detailClass.course.length==0){
        listCourseForAdd = listCourse;
    }   
    else{    
        listCourseInClass =await course.find({_id: {$in: detailClass.course}}).populate('trainer');
        listCourseForAdd =await course.find({_id: {$nin: detailClass.course}}).populate('trainer');
    }
    
    res.render('Staff/classDetail', {profileStaff: profileStaff,detailClass: detailClass,listTraineeForAdd:listTraineeForAdd,listTraineeInClass : listTraineeInClass,
        listCourseInClass:listCourseInClass,listCourseForAdd:listCourseForAdd
    })
}
exports.postAddTraineeforClass = async(req, res) => {
    let id = req.query.id;
    const traineeIDInput = req.body.txtTraineeID;
    console.log(traineeIDInput);
    // let newCLass = new classes ({
    //     name: nameInput,
    // });
    await classes.findByIdAndUpdate(id,
        {$push :{trainee:traineeIDInput}},
        { new: true, useFindAndModify: false }) 
    //  newCLass = await newCLass.save();
    
    await trainee.findByIdAndUpdate(traineeIDInput,
        {$push :{classes:id}},
        { new: true, useFindAndModify: false }) 
    res.redirect('/staff/classDetail?id='+id)
}

exports.postAddCourseforClass = async(req, res) => {
     let id = req.query.id;
    const courseIDInput = req.body.txtCourseID;

    let courseDetail = await course.findOne({_id: courseIDInput}).populate('trainer');
    // console.log(traineeIDInput);
    // let newCLass = new classes ({
    //     name: nameInput,
    // });
    await classes.findByIdAndUpdate(id,
        {$push :{course:courseIDInput}},
        { new: true, useFindAndModify: false }) 
    //  newCLass = await newCLass.save();
    await trainer.findByIdAndUpdate(courseDetail.trainer,
        {$push :{classes:id}},
        { new: true, useFindAndModify: false }) 
    res.redirect('/staff/classDetail?id='+id)
}
exports.getDeleteTraineefromClass = async(req, res) => { 
    let id = req.query.id;
    console.log("CLass ID: "+classID);
    console.log("ID: "+id);  
    var detailClass = await classes.findOne({_id:classID}).populate('trainee');
    
    await classes.updateOne({_id: classID},{ $pull: {trainee: id}},{ new: true} )
      console.log(detailClass);
    await trainee.updateOne({ _id: id }, { $pull: {classes: classID}},{ new: true})
    res.redirect('/staff/classDetail?id='+classID)
}

exports.getDeleteCoursefromClass = async(req, res) => { 
    let id = req.query.id;
    console.log("CLass ID: "+classID);
    console.log("ID: "+id);  
    var detailClass = await classes.findOne({_id:classID}).populate('course');
     
    await classes.updateOne({_id: classID},{ $pull: {course: id}},{ new: true} )
      console.log(detailClass);

    await trainer.updateOne({ _id: id }, { $pull: {classes: classID}},{ new: true})
    res.redirect('/staff/classDetail?id='+classID)
}



