const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const traineeController = require('../controllers/traineeController');
const { isTrainee } = require("../middle/auth");
const {isUser } = require("../middle/auth");

route.get('/trainee', isTrainee, traineeController.getTraineePage);

route.get('/trainee/traineeProfile',isTrainee, traineeController.getTraineeProfile);

route.get('/trainee/traineeViewCourse',isTrainee, traineeController.getViewDetailClass);

route.get('/trainee/coursesCategories',isTrainee, traineeController.getCoursesCategory);


module.exports = route;