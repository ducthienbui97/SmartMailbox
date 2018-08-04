var router = require("express").Router();
var axios = require("axios");
var utility = require("./utility");
var multer = require("multer");
const imgurHeaders = {
    Authorization: "Client-ID " + process.env.IM_C
};

var upload = multer({
    storage: multer.memoryStorage()
});

router.post('/image', upload.single("image"), async (req, res, next) => {
    if (req.file) {
        let imageURL = (await axios.post(
            "https://api.imgur.com/3/image", {
                image: req.file.buffer.toString("base64")
            }, {
                headers: imgurHeaders
            }
        )).data.data.link;
        axios.post(process.env.OCR_URL, {
            "requests": [{
                "image": {
                    "content": imageURL
                },
                "features": [{
                    "type": "",
                    "maxResults": 1
                }]
            }]
        })
    };
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

module.exports = router;