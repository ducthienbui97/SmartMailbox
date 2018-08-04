const mongoose = require('mongoose');
require('dotenv').config();
const House = require('./models/house');


async function findResidentByEmail(residentEmail) {
  let result = await House.findOne({
    "residents.email": residentEmail
  }).select({
    residents: {
      $elemMatch: {
        email: residentEmail
      }
    }
  });
  return result.residents[0];
}

async function findHouseByEmail(residentEmail) {
  let result = await House.findOne({
    "residents.email": residentEmail
  });
  return result;
}

module.exports = {
  findHouseByEmail,
  findResidentByEmail
}