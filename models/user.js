var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	password: String
}, { timestamps: true });

var userModel = module.exports = mongoose.model("user", userSchema);

userModel.register = (username, password, callback) => {
	userModel.findOne({ username: username }, (err, data) => {
		if (data) return callback(null, "Username already use");
		else {
			var newUser = new userModel({
				username: username,
				password: password
			});

			newUser.save(err => {
				if (err) callback(null, "Database error");
				else callback("New user registed", null);
			})
		}
	})
};

userModel.login = (username, password, callback) => {
	userModel.findOne({ username: username, password: password }, (err, data) => {
		if (err) return callback(null, "Database error");
		if (data) return callback("Login success", null);
		else return callback(null, "Username or password not correct");
	})
}