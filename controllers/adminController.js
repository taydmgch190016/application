const user = require('../models/users');
const staff = require('../models/staff');
const trainer = require('../models/trainer');
const util = require('./util');

exports.getAdminPage = async (req, res) => {
    res.render('Admin/adminPage');
}

exports.getAdminProfile = async (req, res) => {
    let profileAdmin = await user.findOne({ username: req.session.username });
    console.log(profileAdmin);
    res.render('Admin/adminProfile', { profileAdmin: profileAdmin });
}

//create new staff
exports.postStaffRegister = async (req, res) => {
    let error = [];
    let flag = true;
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const usernameInput = req.body.txtUsername;
    const passwordInput = req.body.txtPassword;
    const ageInput = req.body.txtAge;
    const addressInput = req.body.txtAddress;
    let newStaff = new staff({
        fullname: nameInput,
        email: emailInput,
        username: usernameInput,
        password: passwordInput,
        age: ageInput,
        address: addressInput
    });
    let newUser = new user({
        username: usernameInput,
        password: passwordInput,
        role: "Staff"
    })
    if(nameInput.length < 10) {
        error["fullname"] = 'Full name must include first name and family name'
        flag = false
    }
    if(usernameInput.length < 6) {
        error["username"] = 'Username have to from 6 characters'
        flag = false
    }
    if(passwordInput.length < 6) {
        error["password"] = 'Password need strong'
        flag = false
    }
    if(flag == false) {
        res.render('Admin/staffRegister', {error: error})
    }
    else {
        newStaff = await newStaff.save();
        newUser = await newUser.save();
        res.redirect('/admin/staffManagement')
    }
}

exports.getStaffRegister = async (req, res) => {
    res.render('Admin/staffRegister');
}

exports.getStaff = async (req, res, next) => {
       const PAGE_SIZE = 2;
       var page = req.query.page;
       if(page) {
            page = parseInt(page)
            if(page < 1) {
                page = 1;
            }
            var skip = (page - 1) * PAGE_SIZE;

            staff.find({})
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(data=>{
                staff.countDocuments({}).then((total)=>{
                    console.log(total);
                    var totalPage = Math.ceil(total / PAGE_SIZE);
                    
                    res.json({
                        total: total,
                        totalPage: totalPage,
                        data: data
                    });
                })
            })
       }else{
            staff.find({})
            .then(data=> {
                res.json(data);
            })
            .catch (err=> {
                res.status(500).json('server error')
        })
    }     
}

exports.getStaffManagement = async (req, res) => {
    let listStaff = await staff.find();
    res.render('Admin/staffManagement', {listStaff: listStaff});
}


exports.getStaffEdit = async (req, res) => {
    let id = req.query.id;
    let editStaff = await staff.findById(id);
    res.render('Admin/staffEdit', { editStaff: editStaff })
}

exports.postStaffUpdate = async (req, res) => {
    let id = req.body.id;
    console.log(id);
    let editStaff = await staff.findById(id);
    editStaff.fullname = req.body.txtName;
    editStaff.email = req.body.txtEmail;
    editStaff.age = req.body.txtAge;
    editStaff.address = req.body.txtAddress;
    editStaff.image = req.file.path;
    editStaff = await editStaff.save();

    res.redirect('/admin/staffManagement');
}

exports.deleteStaff = async (req, res) => {
    let id = req.query.id;
    let deleteStaff = await staff.findById(id);
    let username = deleteStaff.username;
    user.deleteOne({ 'username': username }, (err) => {
        if (err) {
            throw err;
        } else {
            console.log('Staff is deleted');
        }
    })
    staff.findByIdAndDelete(id).then(data = {});
    res.redirect('/admin/staffManagement');
}

exports.searchStaff = async (req, res) => {
    const keyword = req.body.keyword;
    console.log(req.body.keyword);
    let listStaff;
    let checkAlphabet = util.checkName(keyword);
    const searchFullname = new RegExp(keyword, 'i');

    if (checkAlphabet) {
        listStaff = await staff.find({ fullname: searchFullname });
    }
    res.render('Admin/staffManagement', { listStaff: listStaff });
}

exports.getPwdStaff = async (req, res) => {
    let id = req.query.id;
    console.log(id);
    let pwdStaff = await staff.findById(id);
    console.log(pwdStaff);
    res.render('Admin/changePwdStaff', { pwdStaff: pwdStaff });
}

exports.changePasswordStaff = async (req, res) => {
    let id = req.body.id;
    let pwdStaff = await staff.findById(id);
    pwdStaff.password = req.body.newPassword;

    let pwdUser = await user.findOne({ 'username': pwdStaff.username }).exec();
    pwdUser.password = req.body.newPassword;


    pwdStaff = await pwdStaff.save();
    pwdUser = await pwdUser.save();
    res.redirect('/admin/staffManagement');

}

//create new trainer
exports.postTrainerRegister = async (req, res) => {
    let error = [];
    let flag = true;
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const usernameInput = req.body.txtUsername;
    const passwordInput = req.body.txtPassword;
    const ageInput = req.body.txtAge;
    const addressInput = req.body.txtAddress;
    const specialtyInput = req.body.txtSpecialty;
    let account =await user.findOne({username: usernameInput})

    let newTrainer = new trainer({
        fullname: nameInput,
        email: emailInput,
        username: usernameInput,
        password: passwordInput,
        age: ageInput,
        address: addressInput,
        specialty: specialtyInput
    });
    
    let newUser = new user({
        username: usernameInput,
        password: passwordInput,
        role: "Trainer"
    })
    if(nameInput.length < 10) {
        error["fullname"] = 'Full name must include first name and family name'
        flag = false
    }
    if(usernameInput.length < 6) {
        error["username"] = 'Username have to from 6 characters'
        flag = false
    }
    if(passwordInput.length < 6) {
        error["password"] = 'Password need strong'
        flag = false
    }
    if(flag == false) {
        res.render('Admin/trainerRegister', {error: error})
    }
    else {
        newTrainer = await newTrainer.save();
        newUser = await newUser.save();
        res.redirect('/admin/trainerManagement');
    }
}

exports.getTrainerRegister = async (req, res) => {
    res.render('Admin/trainerRegister');
}

exports.getTrainerManagement = async (req, res) => {
    let listTrainer = await trainer.find();
    res.render('Admin/trainerManagement', { listTrainer: listTrainer })
}

exports.getTraierEdit = async (req, res) => {
    let id = req.query.id;
    let editTrainer = await trainer.findById(id);
    res.render('Admin/trainerEdit', { editTrainer: editTrainer })
}

exports.postTrainerUpdate = async (req, res) => {
    let id = req.body.id;
    console.log(id);
    let editTrainer = await trainer.findById(id);
    editTrainer.fullname = req.body.txtName;
    editTrainer.email = req.body.txtEmail;
    editTrainer.age = req.body.txtAge;
    editTrainer.address = req.body.txtAddress;
    editTrainer.specialty = req.body.txtSpecialty;
    editTrainer.image = req.file.path;

    editTrainer = await editTrainer.save();
    res.redirect('/admin/trainerManagement');
}

exports.deleteTrainer = async (req, res) => {
    let id = req.query.id;
    let deleteTrainer = await trainer.findById(id);
    let username = deleteTrainer.username;
    user.deleteOne({ 'username': username }, (err) => {
        if (err) {
            throw err;
        } else {
            console.log('Trainer is deleted');
        }
    })
    trainer.findByIdAndDelete(id).then(data = {});
    res.redirect('/admin/trainerManagement');
}

exports.searchTrainer = async (req, res) => {
    const keyword = req.body.keyword;
    console.log(req.body.keyword);
    let listTrainer;
    let checkAlphabet = util.checkName(keyword);
    const searchFullname = new RegExp(keyword, 'i');

    if (checkAlphabet) {
        listTrainer = await trainer.find({ fullname: searchFullname });
    }
    res.render('Admin/trainerManagement', { listTrainer: listTrainer });
}

exports.getPwdTrainer = async (req, res) => {
    let id = req.query.id;
    console.log(id);
    let pwdTrainer = await trainer.findById(id);
    console.log(pwdTrainer);
    res.render('Admin/changePwdTrainer', { pwdTrainer: pwdTrainer });
}

exports.changePasswordTrainer = async (req, res) => {
    let id = req.body.id;
    let pwdTrainer = await trainer.findById(id);
    pwdTrainer.password = req.body.newPassword;

    let pwdUser = await user.findOne({ 'username': pwdTrainer.username }).exec();
    pwdUser.password = req.body.newPassword;

    pwdTrainer = await pwdTrainer.save();
    pwdUser = await pwdUser.save();
    res.redirect('/admin/TrainerManagement');

}
