var mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1/node_club');

var UserSchema = new mongoose.Schema({
    username: String,
    pass: String,
    email: String,
});


UserSchema.statics.getUserBySignupInfo = function(username, email, callback){
    var cond = ['$or', {username: username}, {email: email}];
    this.find(cond, callback);
};

UserSchema.statics.addUser = function(user, callback){
    this.create(user, callback);
};

UserSchema.statics.getUser = function(username, pass, callback){
    this.findOne({username: username, pass: pass}, callback);
};

module.exports = mongoose.model('User', UserSchema);
