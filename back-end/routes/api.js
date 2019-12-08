var express = require("express");
var router = express.Router();
let {dataBusInfo, dataBuses, dataStations} = require("../controllers/ver1/test.js")

// let {dataBusInfo, } = require("../controllers/ver1/test")

router.get("/", (req, res, next) => {
    // console.log(dataBusInfo)
    console.log(dataStations)
    return res.send("/api ");
    // return dataBusInfo
});


router.get("/getDataStation", function(req, res, next) {
	res.json(dataStations.map(item=>{
        return {
            StationID:item.StationID,
            Name:item.Name
        }
    }))


});


module.exports = router;