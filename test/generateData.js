const mongoose = require('mongoose');
require('dotenv').config();
const House = require('../models/house');

mongoose.connect(process.env.DB_URL);

mongoose.connection.on('open', function (req, res) {
  console.log('Connected to db');
});

House.create({
  cameraIds: [123,234],
  address: '7 Kelly Street',
  residents: [
    {
      email: 'aaazureee@gmail.com',
      firstName: 'Chi Hieu',
      lastName: 'Chu',
      mailTimeStamp: [{
        timeStamp: new Date(2018-02-03),
        sender: 'John Smith',
        imgLink: ''
      }],
      altNames: ['Chu Chi Hieu', 'Chi Hieu Chu', 'Chi Chu']
    },
    {
      email: 'minh123@gmail.com',
      firstName: 'Quang Minh',
      lastName: 'Nguyen',
      mail: [{
        timeStamp: new Date(2018-07-21),
        sender: 'Sam Elliot',
        imgLink: ''
        }
      ],
      
      altNames: ['Quang Minh Nguyen', 'Nguyen Quang Minh', 'Quang Nguyen', 'Minh Nguyen']
    }
  ]
}).then(function(doc){
  console.log('Added');
}).catch(function(err) {
  console.log(err);
});