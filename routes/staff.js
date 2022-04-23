const express = require('express');
const route = express.Router();
const staffController = require('../controllers/staffController');
const { isStaff } = require("../middle/auth");
const {isUser } = require("../middle/auth");
const upload = require('../middle/upload');

route.get('/staff',isStaff, staffController.getStaffPage);

route.get('/staff/staffProfile',isStaff, staffController.getStaffProfile)

route.get('/staff/traineeRegister',isStaff,staffController.getRegisterTrainee);

route.post('/staff/doAddTrainee',isStaff,staffController.postRegisterTrainee);

route.get('/staff/traineeEdit',isStaff,staffController.getEditTrainee);

route.post('/staff/traineeEdit/doEditTrainee',isStaff,upload.single('image'),staffController.postEditTrainee);

route.get('/staff/traineeProfile',isStaff,staffController.getTraineeProfile);

route.get('/staff/traineeManagement',isStaff,staffController.getTraineeManagement);

route.post('/staff/staffSearchTrainee',isStaff, staffController.searchTrainee);

route.post('/staff/doChangePassTrainee',isStaff, staffController.postChangePassTrainee);

route.get('/staff/traineeDelete',isStaff, staffController.getdeleteTrainee);

route.get('/staff/categoryManagement',isStaff,staffController.getCategoryManagement);

route.post('/staff/doAddCategory',isStaff,staffController.postAddCategory);

route.post('/staff/doEditCategory',isStaff, staffController.postEditCategory);

route.post('/staff/staffSearchCategory',isStaff, staffController.searchCategory);

route.get('/staff/courseManagement',isStaff,staffController.getCourseManagement);

route.get('/staff/courseAdd',isStaff,staffController.getAddCourse);

route.post('/staff/doAddCourse',isStaff,staffController.postAddCourse);

route.get('/staff/courseEdit',isStaff, staffController.getEditCourse);

route.post('/staff/courseEdit/doEditCourse',isStaff,staffController.postUpdateCourse);

route.get('/staff/classManagement',isStaff,staffController.getClassManagement);

route.get('/staff/classAdd',isStaff,staffController.getAddClass);

route.post('/staff/doAddClass',isStaff,staffController.postAddClass);

route.get('/staff/classDetail',isStaff,staffController.getClassDetail);

route.post('/staff/doAddTraineeforClass',isStaff,staffController.postAddTraineeforClass);

route.get('/staff/classDetail/doDeleteTraineefromClass',isStaff, staffController.getDeleteTraineefromClass);

route.get('/staff/classDetail/doDeleteCoursefromClass',isStaff, staffController.getDeleteCoursefromClass);

route.post('/staff/doAddCourseforClass',isStaff,staffController.postAddCourseforClass);

route.post('/staff/doChangePassTrainee',isStaff,staffController.postAddCourseforClass);
module.exports = route;