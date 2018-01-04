// app/routes.js

// grab the models
var Users = require('./models/users'),
  Bookings = require('./models/bookings');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = function(app) {

   // server routes ===========================================================
   // handle things like api calls
   // authentication routes

   // get users api route
   app.get('/api/users', function(req, res) {
       console.log("get all users request:" + JSON.stringify(req.body));
       // use mongoose to get all users in the database
       Users.find({},function(err, users) {
           // if there is an error retrieving, send the error.
          // nothing after res.send(err) will execute
           if (err)
               res.send(err);
           res.json(users); // return all users in JSON format
       });
   });

   // get user by username api route
   app.get('/api/user/:username', function(req, res) {
      var username = req.params.username;
      // use mongoose to get one user in the database
      Users.find({ username },function(err, user) {
         // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
         if (err)
             res.send(err);
         res.json(user); // return all users in JSON format
      });
   });

   // get user by id api route
   app.get('/api/users/:id', function(req, res) {
      var _id = req.params.id;
      // use mongoose to get one user in the database
      Users.find({ _id },function(err, user) {
         // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
         if (err)
             res.send(err);
         res.json(user); // return all users in JSON format
      });
   });

   // get bookings api route
   app.get('/api/bookings', function(req, res) {
      // use mongoose to get all bookings in the database
      Bookings.find(function(err, bookings) {
         // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
         if (err)
             res.send(err);
         res.json(bookings); // return all bookings in JSON format
      });
   });

   // routes to handle creating goes here (app.post)
   // create new users api route
   app.post('/api/users', function(req, res, next) {
      console.log("SERDAR api post:" + JSON.stringify(req.body));
       // create new instance for a user
      var user = new Users({
        username: req.body.params.username
      });
      console.log("saving user: " + JSON.stringify(user));
      // save user to db
      user.save(function (err, user) {
        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
        console.log("savng to db... " + user);
        if (err) {
          console.log("db error: "+ err);
          return next(err);
        }
        // return new user object, with a 201 code
        res.json(201, user)
      });
   });

   // update user's booking
   app.post('/api/bookings', function(req, res, next) {
     console.log("Booking being updated: " + JSON.stringify(req.body));
     var _id = req.body.params._id;
     console.log("id val: " + JSON.stringify(_id));
     var bookings = req.body.params.bookings;
     console.log("bookings val: " + JSON.stringify(bookings));
     return Users.update({ _id: ObjectId(_id) }, { $addToSet: {bookings:bookings.toString()} }, {'new':true}).exec();
   });

   // route to handle delete goes here (app.delete) - not necessary yet

   // frontend routes =========================================================
   // route to handle all angular requests
   app.get('*', function(req, res) {
       res.sendfile('./public/views/index.html'); // load our public/index.html file
   });

};
