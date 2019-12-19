var express = require("express");
var router = express.Router();
let {
	dataBusInfo,
	dataBuses,
	dataStations
} = require("../controllers/ver3/fakeData.js");
let {
	dataBusBetween2Locations
} = require("../controllers/solutionNumberOfTranferBus/stationsGraph");
let {
	find_K_Route_Between_2_Location
} = require("../controllers/kShortestPath/main");

///
let {
	find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location
} = require("../controllers/solutionNumberOfTranferBus/main");

let {
	searchPossibleTravelRoute
} = require("../controllers/routeBetween2Stations/index");

let { normalizeData } = require("../controllers/normalizeData/index");

let { topsis } = require("../controllers/topsis/index");
///

// let {dataBusInfo, } = require("../controllers/ver1/test")

router.get("/", (req, res, next) => {
	return res.send("/api ");
});

router.get("/getDataStation", function(req, res, next) {
	res.json(
		dataStations.map(item => {
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
		4
	);
	// res.send({ kRoute, dataBusBetween2Locations });
	res.send(kRoute.slice(0, 30));
});

router.post("/getSuggestedTravelRoute", (req, res, next) => {
	console.log(req.body);
	let kRoute = find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location(
		req.body.fromStation,
		req.body.toStation,
		4
	);
	let possibleTravelRoute = searchPossibleTravelRoute(
		req.body.fromStation,
		req.body.toStation,
		kRoute.slice(0, 30)
	);

	res.send(possibleTravelRoute);
});

router.post("/normalizeDataFromSearchPossibleTravelRoute", (req, res, next) => {
	console.log(req.body);
	let kRoute = find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location(
		req.body.fromStation,
		req.body.toStation,
		4
	);
	let possibleTravelRoute = searchPossibleTravelRoute(
		req.body.fromStation,
		req.body.toStation,
		kRoute.slice(0, 30)
	);
	let normalizedData = normalizeData(possibleTravelRoute);

	res.send(normalizedData);
});

router.post("/topsis", (req, res, next) => {
	console.log(req.body);
	let kRoute = find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location(
		req.body.fromStation,
		req.body.toStation,
		4
	);
	let possibleTravelRoute = searchPossibleTravelRoute(
		req.body.fromStation,
		req.body.toStation,
		kRoute.slice(0, 30)
	);

	let boTrongSo;
	if (
		req.body["argumentValue"]["quangDuong"] == null ||
		req.body["argumentValue"]["thoiGianDoiXe"] == null ||
		req.body["argumentValue"]["thoiGianDiChuyen"] == null ||
		req.body["argumentValue"]["tongGiaVe"] == null ||
		req.body["argumentValue"]["soLanChuyenXe"] == null
	) {
		boTrongSo = [0.4, 0.3, 0.1, 0.1, 0.1];
	} else {
		boTrongSo = [
			parseFloat(req.body["argumentValue"]["soLanChuyenXe"]),
			parseFloat(req.body["argumentValue"]["tongGiaVe"]),
			parseFloat(req.body["argumentValue"]["thoiGianDiChuyen"]),
			parseFloat(req.body["argumentValue"]["quangDuong"]),
			parseFloat(req.body["argumentValue"]["thoiGianDoiXe"])
		];
	}
	console.log("boTrongSo");
	console.log(boTrongSo);

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

router.get("/dataBusBetween2Locations", (req, res, next) => {
	res.send(dataBusBetween2Locations);
});

module.exports = router;
