const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Resident = require('./resident');

const houseSchema = new Schema({
  cameraIds: [String],
  address: String,
  residents: [Resident], 
});

const House = mongoose.model('House', houseSchema);

module.exports = House;