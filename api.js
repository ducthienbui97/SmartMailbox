var router = require("express").Router();
var axios = require("axios");
var utility = require("./utility");
var multer = require("multer");
const imgurHeaders = {
    Authorization: "Client-ID " + process.env.IM_C
};
const onesignalHeaders = {
    Authorization: "Basic " + process.env.OC
}
var upload = multer({
    storage: multer.memoryStorage()
})

router.post('/image', upload.single("image"), async (req, res, next) => {
    let imageURL = (await axios.post(
        "https://api.imgur.com/3/image", {
            image: req.file.buffer.toString("base64")
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

    axios.post(process.env.OCR_URL, {
        "requests": [{
            "features": [{
                "type": "TEXT_DETECTION"
            }],
            "image": {
                "source": {
                    "imageUri": imageURL
                }
            }
        }]
    }).then(result => {
        let text = result.data.responses[0].textAnnotations[0].description;
        console.log(text);
        let toBeSend = [];
        let sender = text.split("\n")[0];
        house.residents.forEach(resident => {
            altNames = resident.altNames
            if (altNames.find(name => text.indexOf(name) >= 0)) {
                toBeSend.push(resident);
            }
        })
        let promises = [];
        toBeSend.forEach(resident => {
            resident.mail.push({
                "timeStamp": new Date(),
                "sender": sender,
                "imgLink": imageURL
            });
            promises.push(axios.post("https://onesignal.com/api/v1/notifications", {
                data: resident.mail[resident.mail.length - 1],
                url: "/private-mails",
                contents: {
                    en: "You have received a mail from " + sender
                }
            }, {
                headers: onesignalHeaders
            }))
        });

        res.send(imageURL);
        house.save()
    }).catch((err) => {
        console.log(err);
        res.send(err);
    })

});

router.post('/login', (req, res, next) => {
    utility.findHouseByEmail(req.body.email).then(house => {
        house.residents = house.residents.map(resident => {
            if (resident.email == req.body.email)
                return resident;
            else
                return {
                    firstName: resident.firstName,
                    lastName: resident.lastName
                }
        })
        res.json(house);
    });
})

router.post('/mark-as-read', async (req, res, next) => {
    console.log(req.body);
    let house = await utility.findHouseByEmail(req.body.email);
    let resident = house.residents.find(resident => resident.email === req.body.email);
    resident.mail.forEach(mail => mail.mailRead = true);
    house.save();
    res.send("OK");
});

router.post('/setNotificationIds', (req, res, next) => {
    let house = utility.findResidentByEmail(req.body.email).then(house => {
        let resident = house.residents.find(resident => resident.email === req.body.email);
        if (resident.notificationIds.indexOf(req.notificationId) < 0) {
            resident.notificationIds.push(req.notificationId);
            house.save();
        }
    })
})

router.post('/removeNotificationIds', (req, res, next) => {
    let house = utility.findResidentByEmail(req.body.email).then(house => {
        let resident = house.residents.find(resident => resident.email === req.body.email);
        let id = resident.notificationIds.indexOf(req.notificationId);
        if (id > 0) {
            resident.notificationIds.splice(id, 1);
            house.save();
        }
    })
})
module.exports = router;