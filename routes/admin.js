const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const adminController = require('../controllers/adminController');
const { isAdmin } = require("../middle/auth");
const upload = require('../middle/upload');

 route.get('/admin', isAdmin,  adminController.getAdminPage);

route.get('/admin/adminProfile', isAdmin, adminController.getAdminProfile);

route.get('/admin/staffRegister', isAdmin, adminController.getStaffRegister);

route.get('/admin/trainerRegister', isAdmin, adminController.getTrainerRegister);

route.get('/admin/staffManagement', isAdmin, adminController.getStaffManagement);

//cofigure API
route.get('/getStaff', adminController.getStaff);

route.get('/admin/trainerManagement', isAdmin, adminController.getTrainerManagement)

route.post('/doAddStaff', isAdmin,adminController.postStaffRegister);

route.post('/doAddTrainer', isAdmin, adminController.postTrainerRegister);

route.get('/admin/staffEdit', isAdmin, adminController.getStaffEdit);

route.get('/admin/trainerEdit', isAdmin, adminController.getTraierEdit);

route.post('/admin/staffEdit/doEditStaff', isAdmin, upload.single('image'), adminController.postStaffUpdate);

route.post('/admin/trainerEdit/doEditTrainer', isAdmin, upload.single('image'), adminController.postTrainerUpdate);

route.get('/admin/staffDelete', isAdmin, adminController.deleteStaff);

route.get('/admin/trainerDelete', isAdmin, adminController.deleteTrainer);

route.post('/admin/adminSearchStaff', adminController.searchStaff);

route.post('/admin/adminSearchTrainer', adminController.searchTrainer);

route.get('/admin/changePwdStaff', isAdmin, adminController.getPwdStaff)

route.post('/admin/changePwdStaff/doPwdStaff', isAdmin, adminController.changePasswordStaff);

route.get('/admin/changePwdTrainer', isAdmin, adminController.getPwdTrainer)

route.post('/admin/changePwdTrainer/doPwdTrainer', isAdmin, adminController.changePasswordTrainer);

module.exports = route;