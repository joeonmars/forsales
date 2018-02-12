const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  gender: String,
  email: String,
  login_id: String,
  login_type: String,
  custom_photo: String,
  avatar: String,
});

UserSchema.set('toJSON', {
    virtuals: true,
});

UserSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

UserSchema.statics.findByIdList = function (id_list) {
	const id_arr = id_list.map(id => new mongoose.Types.ObjectId(id));
	const user_fields = 'id name gender custom_photo avatar';

	return this.find({
		'_id': { $in: id_arr }
	}, user_fields);
}


const User = mongoose.model('User', UserSchema);

module.exports = User;
