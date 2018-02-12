const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 6;


const TableSchema = new Schema({
  max_players: Number,
  name: String,
  owner: Schema.Types.ObjectId,
  users: [Schema.Types.ObjectId],
  players: [Schema.Types.ObjectId],
});

TableSchema.virtual('owner_detail', {
  ref: 'User',
  localField: 'owner',
  foreignField: '_id',
  justOne: true,
});

TableSchema.virtual('users_detail', {
  ref: 'User',
  localField: 'users',
  foreignField: '_id',
});

TableSchema.virtual('players_detail', {
  ref: 'User',
  localField: 'players',
  foreignField: '_id',
});


TableSchema.statics.findAndPopulate = function (selector = {}) {
  return this.find(selector).populate({
    path: 'owner_detail users_detail players_detail',
    select: 'id name custom_photo avatar',
  });
}


TableSchema.set('toObject', {
  virtuals: true,
});

TableSchema.set('toJSON', {
  virtuals: true,
});

TableSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        ret.owner = doc.owner_detail;
        ret.users = doc.users_detail;
        ret.players = doc.players_detail;
        return ret;
    }
};

const Table = mongoose.model('Table', TableSchema);


module.exports = Table;
