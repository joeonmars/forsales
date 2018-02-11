const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 6;


const TableSchema = new Schema({
  max_players: Number,
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

TableSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

TableSchema.set('toJSON', {
  virtuals: true,
});


const Table = mongoose.model('Table', TableSchema);


module.exports = Table;
