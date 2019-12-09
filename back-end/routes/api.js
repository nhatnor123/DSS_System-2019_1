var express = require("express");
var router = express.Router();
let {
	dataBusInfo,
	dataBuses,
	dataStations
} = require("../controllers/ver2/fakeData.js");

let {
	find_K_Route_Between_2_Location
} = require("../controllers/kShortestPath/main");
let {
	searchPossibleTravelRoute
} = require("../controllers/routeBetween2Stations/index");

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
	let kRoute = find_K_Route_Between_2_Location(
		req.body.fromStation,
		req.body.toStation,
		5
	);
	res.send(kRoute);
});

router.post("/getSuggestedTravelRoute", (req, res, next) => {
	console.log(req.body);
	let kRoute = find_K_Route_Between_2_Location(
		req.body.fromStation,
		req.body.toStation,
		5
	);
	let possibleTravelRoute = searchPossibleTravelRoute(
		req.body.fromStation,
		req.body.toStation,
		kRoute
	);

	res.send(possibleTravelRoute);
});

module.exports = router;
