// app/models/bookings.js
// grab the mongoose module
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
  day : {type : Date, required: true },
  username : {type: String, required: true }
});
// define our model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Bookings', schema);
