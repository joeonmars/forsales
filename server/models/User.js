const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  gender: String,
  email: String,
  login_id: String,
  login_type: String,
  custom_photo: String,
  avatar: String,
});

UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true,
});

UserSchema.statics.findByIdList = function (id_list) {
	const id_arr = id_list.map(id => new mongoose.Types.ObjectId(id));
	const user_fields = 'id name gender custom_photo avatar';

	return this.find({
		'_id': { $in: id_arr }
	}, user_fields);
}


const User = mongoose.model('User', UserSchema);

module.exports = User;
