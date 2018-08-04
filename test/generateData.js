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
      mail: [{
        timeStamp: new Date('2018-02-03'),
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
        timeStamp: new Date('2018-07-21'),
        sender: 'Sam Elliot',
        imgLink: ''
      }],

      altNames: ['Quang Minh Nguyen', 'Nguyen Quang Minh', 'Quang Nguyen', 'Minh Nguyen']
    },
    {
      email: 'qanh123@gmail.com',
      firstName: 'Quynh Anh',
      lastName: 'Nguyen',
      mail: [{
          timeStamp: new Date('2018-07-25'),
          sender: 'Sam Elliot',
          imgLink: ''
        },
        {
          timeStamp: new Date('2018-07-26'),
          sender: 'Sam Smith',
          imgLink: ''
        },
        {
          timeStamp: new Date('2018-07-27'),
          sender: 'Sam Kelly',
          imgLink: ''
        },
        {
          timeStamp: new Date('2018-07-28'),
          sender: 'Sam Klarkson',
          imgLink: ''
        },
        {
          timeStamp: new Date('2018-07-29'),
          sender: 'Sam Kim',
          imgLink: ''
        },
        {
          timeStamp: new Date('2018-07-30'),
          sender: 'Sam Kardashian',
          imgLink: ''
        },
        {
          timeStamp: new Date('2018-07-31'),
          sender: 'Sam Torres',
          imgLink: ''
        },
        {
          timeStamp: new Date('2018-08-01'),
          sender: 'Sam Fernando',
          imgLink: ''
        }
      ],

      altNames: ['Quynh Anh Nguyen', 'Nguyen Quynh Anh', 'Quynh Nguyen']
    },
    {
      email: 'hello456123@gmail.com',
      firstName: 'John',
      lastName: 'Wick',
      mail: [{
        timeStamp: new Date('2018-08-01'),
        sender: 'Achilles',
        imgLink: ''
      }],

      altNames: ['Wick John', 'J Wick', 'John W']
    }
  ]
}).then(function (doc) {
  console.log('Added');
}).catch(function (err) {
  console.log(err);
});
