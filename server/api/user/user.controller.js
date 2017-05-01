'use strict';

import User from './user.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

// var Mailgun = require('mailgun-js');
var nodemailer = require('nodemailer');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res) {
  var newUser = new User(req.body);
  // var mailgun = new Mailgun({
  //   apiKey: config.mailgun_api_key,
  //   domain: config.mailgun_domain
  // });
  // var data = {
  //   from: config.mailgun_from_who,
  //   to: 'rob.superlink@yandex.com',
  //   subject: 'test mail',
  //   html: 'this is test'
  // }

  // mailgun.messages().send(data, function (err, body) {
  //     //If there is an error, render the error page
  //     if (err) {
  //         res.render('error', { error : err});
  //         console.log("got an error: ", err);
  //     }
  //     //Else we can greet    and leave
  //     else {
  //         //Here "submitted.jade" is the view file for this landing page 
  //         //We pass the variable "email" from the url parameter in an object rendered by Jade
  //         res.render('submitted', { email : 'rob.superlink@yandex.com' });
  //         console.log(body);
  //     }
  // });
  
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'smartwebartisan@gmail.com', // Your email id
          pass: 'rangorango99' // Your password
      }
  });

  var mailOptions = {
      from: '"ryan lee" <jmslee1008@aol.com>', // sender address
      to: 'rob.superlink@yandex.com', // list of receivers
      subject: 'Email Example', // Subject line
      text: 'stress',
      html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);         
      }else{
          console.log('Message sent: ' + info.response);
      };
  });

  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
