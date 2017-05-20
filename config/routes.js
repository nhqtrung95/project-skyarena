var Router = require('express').Router;
var controllers = require('../app/controllers');
const multipart = require('connect-multiparty');
const passport = require('../config/passport');
const Authentication = require('../config/authencation');
const multipartMiddleware = multipart();

module.exports = function (app) {

    var indexRouter = Router().get('/', controllers.index.index);
    var userRouter = Router()
        .get('/login', controllers.user.loadLogin)
        .get('/register', controllers.user.loadRegister)
        .post('/register', multipartMiddleware, controllers.user.register)
        .post('/login', passport.authenticate('local', {
            failureRedirect: '/user/login',
            failureFlash: true
        }), controllers.user.login)
        .post('/logout', controllers.user.logout)
        .get('/login/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), controllers.user.loginFacebook)
        .get('/login/facebook', passport.authenticate('facebook'));
    app.use('/user', userRouter);
    var aboutRouter = Router().get('/', controllers.about.index);
    var friendRouter = Router()
        .get('/add', controllers.friend.addFriend)
        .get('/remove', controllers.friend.removeFriend)
        .get('/get', controllers.friend.getFriend)
        .get('/accept', controllers.friend.acceptFriend)
        .get('/', controllers.friend.index);

    app.use('/', indexRouter);
    app.use('/user', userRouter);
    app.use('/about', Authentication, aboutRouter);
    app.use('/friend', Authentication, friendRouter);
};