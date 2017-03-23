/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/models              ->  index
 * POST    /api/models              ->  create
 * GET     /api/models/:id          ->  show
 * PUT     /api/models/:id          ->  upsert
 * PATCH   /api/models/:id          ->  patch
 * DELETE  /api/models/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Model from './model.model';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import config from '../../config/environment';
import AWS from 'aws-sdk';

global.appRoot = path.resolve(__dirname);

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Models
export function index(req, res) {
  return Model.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Model from the DB
export function show(req, res) {
  return Model.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Model in the DB
export function create(req, res) {
  return Model.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Model in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Model.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Model in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Model.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Model from the DB
export function destroy(req, res) {
  return Model.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// upload image
export function uploadImage(req, res) {
  var relativePath = '';
  var upload = multer(config.uploads.imgUpload).single('img');
  var imgUploadFileFilter = require(path.resolve('server/config/multer')).imgUploadFileFilter;
  var isStart = false;

  upload(req, res, function (err) {
    if(err) {
      return res.end("Error uploading file.");
    }
    else {
        
      config.uploads.imgUpload.dest.split('/').forEach(function(subStr) {
        if (subStr === 'uploads') {
          isStart = true;
        }
        if (isStart) {
          relativePath += '/';
          relativePath += subStr;
        }
      });
      var imgUrl = relativePath + req.file.filename;
      console.log(path.join(__dirname, '../..' + imgUrl));
      

      // res.end(photoUrl);
      AWS.config.update({accessKeyId: config.aws_access_key_id, secretAccessKey: config.aws_secret_access_key});
      console.log(appRoot);
      fs.readFile(path.join(__dirname, '../..' + imgUrl), (err,data) => {
          if(err) throw err;
          var s3 = new AWS.S3();
          var s3_param = {
             Bucket: 'icaportal',
             Key: req.file.filename,
             Expires: 60,
             ContentType: req.file.mimetype,
             ACL: 'public-read',
             Body: data
          };

          s3.putObject(s3_param, function(err, data){
             if(err){
                console.log(err);
             } else {
              var return_data = {
                 signed_request: data,
                 url: 'http://icaportal.s3-website-us-east-1.amazonaws.com/'+req.file.filename
              }; 
              console.log('return data - ////////// --------------');
              console.log(return_data.url);
              res.end(return_data.url);
               // return res.render('upload', {data : return_data, title : 'Upload Image : success', message : { type: 'success', messages : [ 'Uploaded Image']}});
             }
          });
      });
    }
  });
}
