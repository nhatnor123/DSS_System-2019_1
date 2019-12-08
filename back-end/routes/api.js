var express = require("express");
var router = express.Router();
let {
	dataBusInfo,
	dataBuses,
	dataStations
} = require("../controllers/ver1/test.js");

let {
	find_K_Route_Between_2_Location
} = require("../controllers/kShortestPath/main");

// let {dataBusInfo, } = require("../controllers/ver1/test")

router.get("/", (req, res, next) => {
	return res.send("/api ");
});

router.get("/getDataStation", function(req, res, next) {
	res.json(
		dataStations.map(item => {
			// if (item.StationID == 205){
			//     console.log(item)
			// }
			return {
				StationID: item.StationID,
				Name: item.Name
			};
		})
	);
});

router.post("/find_K_Route_Between_2_Location", (req, res, next) => {
	console.log(req.body);
	console.log(
		find_K_Route_Between_2_Location(
			req.body.fromStation,
			req.body.toStation,
			5
		)
	);
	res.send("ahhihi");
});

module.exports = router;
