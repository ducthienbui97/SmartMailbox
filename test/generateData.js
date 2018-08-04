const mongoose = require('mongoose');
require('dotenv').config();
const House = require('../models/house');

mongoose.connect(process.env.DB_URL);

mongoose.connection.on('open', function (req, res) {
  console.log('Connected to db');
});

House.create({
  cameraIds: [123, 234],
  address: '7 Kelly Street',
  residents: [{
      email: 'aaazureee@gmail.com',
      firstName: 'Chi Hieu',
      lastName: 'Chu',
      mail: [
        {
          timeStamp: new Date(),
          sender: 'Sam',
          imgLink: 'https://i.imgur.com/u155T9A.jpg',
          public: false,
          mailRead: false
        }
      ],
      altNames: ['Chu Chi Hieu', 'Chi Hieu Chu', 'Chi Chu'],
      notificationIds: []
      
    },
    {
      email: 'qanh123@gmail.com',
      firstName: 'Quynh Anh',
      lastName: 'Nguyen',
      mail: [
        {
          timeStamp: new Date(),
          sender: 'Sam',
          imgLink: 'https://i.imgur.com/u155T9A.jpg',
          public: false,
          mailRead: false
        },
        {
          timeStamp: new Date(),
          sender: 'Sam',
          imgLink: 'https://i.imgur.com/u155T9A.jpg',
          public: false,
          mailRead: false
        },
        {
          timeStamp: new Date(),
          sender: 'Sam',
          imgLink: 'https://i.imgur.com/u155T9A.jpg',
          public: false,
          mailRead: false
        },
        {
          timeStamp: new Date(),
          sender: 'Sam',
          imgLink: 'https://i.imgur.com/u155T9A.jpg',
          public: false,
          mailRead: false
        }
          
      ],

      altNames: ['Quynh Anh Nguyen', 'Nguyen Quynh Anh', 'Quynh Nguyen'],
      notificationIds: []
      
    }
  ]
}).then(function (doc) {
  console.log('Added');
}).catch(function (err) {
  console.log(err);
});
