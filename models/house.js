const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const residentSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  mail: [{
    timeStamp: Date,
    sender: String,
    imgLink: String
  }],
  altNames: [String],
});

const houseSchema = new Schema({
  cameraIds: [String],
  address: String,
  residents: [residentSchema], 
});

const House = mongoose.model('House', houseSchema);

module.exports = House;