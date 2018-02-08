const mongoose = require('mongoose');

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 6;

const TableSchema = new mongoose.Schema({
  max_players: Number,
  players_count: Number,
  name: String,
  owner_id: String,
});


const Table = mongoose.model('Table', TableSchema);

module.exports = Table;
