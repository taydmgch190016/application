const User = require('../models/users');
const trainee = require('../models/trainee');
const course = require('../models/courses');
const classes = require('../models/class');

exports.handleLogin = async (req, res) => {
    const username = req.body.txtUsername;
    const password = req.body.txtPassword;
    try{      
        let ac= await User.findOne({username: username});
        if(ac.password ==password){
            if(ac.role == 'Admin'){              
                req.session.user = ac;
                req.session.username = username;
                req.session.admin = true;
                console.log(req.session.admin);
                res.redirect('/admin');
            }
            else if(ac.role == 'Staff'){
                console.log(username);
                req.session.user = ac;
                req.session.username = username;
                req.session.staff = true;
                console.log(req.session.staff);
                res.redirect('/staff');
            }           
            else if(ac.role == 'Trainer'){
                req.session.user = ac;
                req.session.username = username;
                req.session.trainer = true;
                res.redirect('/trainer');
            }
            else{
                req.session.user = ac;
                req.session.username = username;
                req.session.trainee = true;
                res.redirect('/trainee');
            }
        }else{
            res.render('home');
        }
    }catch (error) {
        console.log(error);
        res.render('home');
    }
};
exports.getLogin = async (req, res)=>{
    res.render('login');
}
exports.handleLogout = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
}