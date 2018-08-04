function route(io) {
    var router = require('express').Router();
    var axios = require('axios');
    var utility = require('./utility');
    var multer = require('multer');

    const imgurHeaders = {
        Authorization: 'Client-ID ' + process.env.IM_C
    };

    const onesignalHeaders = {
        Authorization: "Basic " + process.env.OS
    }
    var upload = multer({
        storage: multer.memoryStorage()
    });

    router.post('/image', upload.single('image'), async (req, res, next) => {
        let imageURL = (await axios.post(
            'https://api.imgur.com/3/image', {
                image: req.file.buffer.toString('base64')
            }, {
                headers: imgurHeaders
            }
        )).data.data.link;
        let house;
        if (req.body.email) {
            house = await utility.findHouseByEmail(req.body.email);
        } else {
            house = await utility.findHouseByCameraId(req.body.camId);
        }

        axios
            .post(process.env.OCR_URL, {
                requests: [{
                    features: [{
                        type: 'TEXT_DETECTION'
                    }],
                    image: {
                        source: {
                            imageUri: imageURL
                        }
                    }
                }]
            }).then(result => {
                let text = result.data.responses[0].textAnnotations[0].description.toLowerCase();
                console.log(text);
                let toBeSend = [];
                let blackList = ["postal", "post", "auspost", "paid", "australia"];
                house.residents.forEach(resident => {
                    altNames = resident.altNames
                    if (altNames.find(name => text.indexOf(name.toLowerCase()) >= 0)) {
                        toBeSend.push(resident);
                        blackList = blackList.concat(altNames);
                    }
                });
                console.log(blackList);
                let sender = text.split("\n").find(text => {
                    if (blackList.find(non => text.indexOf(non) >= 0))
                        return false;
                    return true;
                });
                console.log(sender);
                let promises = [];
                toBeSend.forEach(resident => {
                    const newMail = {
                        "timeStamp": new Date(),
                        "sender": sender,
                        "imgLink": imageURL
                    }
                    resident.mail.push(newMail);
                    axios.post("https://onesignal.com/api/v1/notifications", {
                        app_id: process.env.APP_ID,
                        data: newMail,
                        url: "/private-mails",
                        contents: {
                            en: "You have received a mail from " + sender
                        },
                        include_player_ids: resident.notificationIds
                    }, {
                        headers: onesignalHeaders
                    }).then(() => console.log(resident.email)).catch(err => console.log(err));
                    io.emit(`${resident.email}-mail-added`, newMail);
                });

                res.send(imageURL);
                house.save()

            }).catch((err) => {
                console.log(err);
                res.json(err);
            });
    });

    router.post('/login', (req, res, next) => {
        utility.findHouseByEmail(req.body.email).then(house => {
            house.residents = house.residents.map(resident => {
                if (resident.email == req.body.email) return resident;
                else
                    return {
                        firstName: resident.firstName,
                        lastName: resident.lastName
                    };
            });
            res.json(house);
        });
    });

    router.post('/mail', (req, res) => {
        const {
            email
        } = req.body;
        utility.findResidentByEmail(email).then(resident => res.json(resident));
    });

    router.post('/mark-as-read', async (req, res, next) => {
        let house = await utility.findHouseByEmail(req.body.email);
        let resident = house.residents.find(
            resident => resident.email === req.body.email
        );
        resident.mail.forEach(mail => (mail.mailRead = true));
        house.save();
        res.send('OK');
    });


    router.post('/setNotificationIds', (req, res, next) => {
        let house = utility.findHouseByEmail(req.body.email).then(house => {
            console.log(req.body.email, req.body.notificationId);
            let resident = house.residents.find(resident => resident.email === req.body.email);
            if (resident.notificationIds.indexOf(req.body.notificationId) < 0) {
                resident.notificationIds.push(req.body.notificationId);
                house.save();
            }
            res.send("ok");
        })
    })

    router.post('/removeNotificationIds', (req, res, next) => {
        let house = utility.findHouseByEmail(req.body.email).then(house => {
            let resident = house.residents.find(resident => resident.email === req.body.email);
            let id = resident.notificationIds.indexOf(req.body.notificationId);
            if (id >= 0) {
                resident.notificationIds.splice(id, 1);
                house.save();
            }
            res.send("ok");
        })
    })

    return router;
}
module.exports = route;