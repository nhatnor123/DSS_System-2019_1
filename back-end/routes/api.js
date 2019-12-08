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
let {
	searchRouteBetween2Stations
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

// sai vì k tạo đc nhiều cạnh (>= 1 cạnh chiều thuận và ngược) giữa 2 node trong đồ thị có hướng
router.post("/find_K_Route_Between_2_Location", (req, res, next) => {
	console.log(req.body);
	let kRoute = find_K_Route_Between_2_Location(
		req.body.fromStation,
		req.body.toStation,
		5
	);
	res.send(kRoute);
});

router.post("/searchRouteBetween2Stations", (req, res, next) => {
	let routeResult = searchRouteBetween2Stations(
		req.body.fromStation,
		req.body.toStation
	);
	res.send(routeResult);
});

module.exports = router;
