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

const Resident = mongoose.model('Resident', residentSchema);

module.exports = Resident;