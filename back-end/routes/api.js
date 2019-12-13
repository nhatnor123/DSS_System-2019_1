var express = require("express");
var router = express.Router();
let {
	dataBusInfo,
	dataBuses,
	dataStations
} = require("../controllers/ver3/fakeData.js");

let {
	find_K_Route_Between_2_Location
} = require("../controllers/kShortestPath/main");

let {
	searchPossibleTravelRoute
} = require("../controllers/routeBetween2Stations/index");

let { normalizeData } = require("../controllers/normalizeData/index");

let { topsis } = require("../controllers/topsis/index");

let {
	dataBusBetween2Locations
} = require("../controllers/solutionNumberOfTranferBus/stationsGraph");

let {
	find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location
} = require("../controllers/solutionNumberOfTranferBus/main");

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
	let kRoute = find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location(
		req.body.fromStation,
		req.body.toStation,
		10
	);
	// res.send({ kRoute, dataBusBetween2Locations });
	res.send(kRoute)
});

router.post("/getSuggestedTravelRoute", (req, res, next) => {
	console.log(req.body);
	let kRoute = find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location(
		req.body.fromStation,
		req.body.toStation,
		10
	);
	let possibleTravelRoute = searchPossibleTravelRoute(
		req.body.fromStation,
		req.body.toStation,
		kRoute
	);

	res.send(possibleTravelRoute);
});

router.post("/normalizeDataFromSearchPossibleTravelRoute", (req, res, next) => {
	console.log(req.body);
	let kRoute = find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location(
		req.body.fromStation,
		req.body.toStation,
		10
	);
	let possibleTravelRoute = searchPossibleTravelRoute(
		req.body.fromStation,
		req.body.toStation,
		kRoute
	);
	let normalizedData = normalizeData(possibleTravelRoute);

	res.send(normalizedData);
});

router.post("/topsis", (req, res, next) => {
	console.log(req.body);
	let kRoute = find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location(
		req.body.fromStation,
		req.body.toStation,
		10
	);
	let possibleTravelRoute = searchPossibleTravelRoute(
		req.body.fromStation,
		req.body.toStation,
		kRoute
	);
	let boTrongSo = [0.4, 0.3, 0.1, 0.1, 0.1];
	let normalizedData = normalizeData(possibleTravelRoute);
	let topsisData = topsis(normalizedData, boTrongSo);

	for (let index = 0; index < possibleTravelRoute.length; index++) {
		possibleTravelRoute[index]["topsisData"] = topsisData[index];
	}

	// sort các phương án theo điểm TOPSIS
	possibleTravelRoute.sort((x, y) => {
		return -x["topsisData"] + y["topsisData"];
	});

	res.send({ possibleTravelRoute });
});

router.post("/topsisVer2", (req, res, next) => {
	console.log(req.body);
	let kRoute = find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location(
		req.body.fromStation,
		req.body.toStation,
		4
	);
	let possibleTravelRoute = searchPossibleTravelRoute(
		req.body.fromStation,
		req.body.toStation,
		kRoute.slice(0,30)
	);
	let boTrongSo = [0.4, 0.3, 0.1, 0.1, 0.1];
	let normalizedData = normalizeData(possibleTravelRoute);
	let topsisData = topsis(normalizedData, boTrongSo);

	for (let index = 0; index < possibleTravelRoute.length; index++) {
		possibleTravelRoute[index]["topsisData"] = topsisData[index];
	}

	// sort các phương án theo điểm TOPSIS
	possibleTravelRoute.sort((x, y) => {
		return -x["topsisData"] + y["topsisData"];
	});

	res.send({ possibleTravelRoute });
});

module.exports = router;
