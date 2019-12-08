const graphlig = require("graphlib");
let g = new graphlig.Graph();

let { dataBusInfo } = require("../getData/fakeData.js");

let dataBusBetween2Locations = {};

// hàm tạo các object lồng nhau, để làm cho gán các object dễ hơn
var createNestedObject = function(base, names) {
	for (var i = 0; i < names.length; i++) {
		base = base[names[i]] = base[names[i]] || {};
	}
};

// hàm tạo graph từ các điểm xe bus trong bus_info
for (key in dataBusInfo) {
	// console.loxg(dataBusInfo[key]["BusCode"]);

	let numberOfGoRoute = dataBusInfo[key]["GoRoute"].length;
	let numberOfReRoute = dataBusInfo[key]["ReRoute"].length;
	let startStation, endStation, distance;

	// console.log("GOROUTE-------------------------------------");
	for (let i = 0; i < numberOfGoRoute - 1; i++) {
		startStation = Object.keys(dataBusInfo[key]["GoRoute"][i])[0];
		endStation = Object.keys(dataBusInfo[key]["GoRoute"][i + 1])[0];
		distance = parseFloat(
			(
				Object.values(
					dataBusInfo[key]["GoRoute"].filter(item => {
						return (
							Object.keys(item)[0] ==
							Object.keys(dataBusInfo[key]["GoRoute"][i + 1])[0]
						);
					})[0]
				)[0] -
				Object.values(
					dataBusInfo[key]["GoRoute"].filter(item => {
						return (
							Object.keys(item)[0] ==
							Object.keys(dataBusInfo[key]["GoRoute"][i])[0]
						);
					})[0]
				)[0]
			).toFixed(1)
		);

		// console.log(startStation + " : " + endStation + " : " + distance);

		g.setEdge(startStation, endStation, distance);

		createNestedObject(dataBusBetween2Locations, [
			startStation,
			endStation,
			dataBusInfo[key]["BusCode"]
		]);

		dataBusBetween2Locations[startStation][endStation][
			dataBusInfo[key]["BusCode"]
		] = {
			distance: distance,
			isGoRoute: true
		};
	}
	// console.log("REROUTE-------------------------------------");
	for (let i = 0; i < numberOfReRoute - 1; i++) {
		startStation = Object.keys(dataBusInfo[key]["ReRoute"][i])[0];
		endStation = Object.keys(dataBusInfo[key]["ReRoute"][i + 1])[0];
		distance = parseFloat(
			(
				Object.values(
					dataBusInfo[key]["ReRoute"].filter(item => {
						return (
							Object.keys(item)[0] ==
							Object.keys(dataBusInfo[key]["ReRoute"][i + 1])[0]
						);
					})[0]
				)[0] -
				Object.values(
					dataBusInfo[key]["ReRoute"].filter(item => {
						return (
							Object.keys(item)[0] ==
							Object.keys(dataBusInfo[key]["ReRoute"][i])[0]
						);
					})[0]
				)[0]
			).toFixed(1)
		);

		// console.log(startStation + " : " + endStation + " : " + distance);

		g.setEdge(startStation, endStation, distance);

		createNestedObject(dataBusBetween2Locations, [
			startStation,
			endStation,
			dataBusInfo[key]["BusCode"]
		]);

		dataBusBetween2Locations[startStation][endStation][
			dataBusInfo[key]["BusCode"]
		] = {
			distance: distance,
			isGoRoute: false
		};
	}
}

exports.stationsGraph = g;
exports.dataBusBetween2Locations = dataBusBetween2Locations;
