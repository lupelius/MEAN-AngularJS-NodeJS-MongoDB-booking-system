// app/models/users.js
// grab the mongoose module
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    username : {type : 'String', required: true, unique: true, index: true},
    bookings: [{ type: 'String' }]
});
// define our model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Users', schema);
