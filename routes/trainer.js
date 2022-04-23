const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const trainerController = require('../controllers/trainerController');
const { isTrainer } = require("../middle/auth");
const upload = require('../middle/upload');

route.get('/trainer',isTrainer, trainerController.getTrainerPage);

route.get('/trainer/trainerProfile',isTrainer, trainerController.getTrainerProfile);

route.post('/trainer/trainerProfile/doTrainerProfile', isTrainer, trainerController.postTrainerProfile)

route.get('/trainer/trainerViewCourse',isTrainer,  trainerController.getViewDetailClass);

route.get('/trainer/changePwdTrainer', isTrainer, trainerController.getPwdTrainer)
route.post('/trainer/changePwdTrainer/doPwdTrainer', isTrainer, trainerController.changePasswordTrainer);

route.get('/trainer/changeAvatar', isTrainer, trainerController.getChangeAvatar);
route.post('/trainer/changeAvatar/doChangeAvatar', upload.single('image'), isTrainer, trainerController.postChangeAvatar);

route.get('/trainer/coursesCategories',isTrainer, trainerController.getCoursesCategory);

module.exports = route;