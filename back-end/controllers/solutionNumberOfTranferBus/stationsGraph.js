const graphlig = require("graphlib");
let g = new graphlig.Graph();

let { dataBusInfo } = require("../ver3/fakeData.js");

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

	// console.log(
	// 	"numberOfGoRoute = " +
	// 		numberOfGoRoute +
	// 		" numberOfReRoute = " +
	// 		numberOfReRoute
	// );

	// console.log("GOROUTE-------------------------------------");
	for (let i = 0; i < numberOfGoRoute ; i++) {
		for (let j = i + 1; j < numberOfGoRoute ; j++) {
			// console.log("i = " + i + "   j =" + j);
			startStation = Object.keys(dataBusInfo[key]["GoRoute"][i])[0];
			endStation = Object.keys(dataBusInfo[key]["GoRoute"][j])[0];
			distance = parseFloat(
				(
					Object.values(
						dataBusInfo[key]["GoRoute"].filter(item => {
							return (
								Object.keys(item)[0] ==
								Object.keys(dataBusInfo[key]["GoRoute"][j])[0]
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
				).toFixed(2)
			);

			// console.log(startStation + " : " + endStation + " : " + distance);

			// g.setEdge(startStation, endStation, distance);

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
		// break;
	}
	// break;
	// console.log("REROUTE-------------------------------------");
	for (let i = 0; i < numberOfReRoute ; i++) {
		for (let j = i+1; j < numberOfReRoute ; j++) {
			// console.log("i = " + i + "   j =" + j);
			startStation = Object.keys(dataBusInfo[key]["ReRoute"][i])[0];
			endStation = Object.keys(dataBusInfo[key]["ReRoute"][j])[0];
			distance = parseFloat(
				(
					Object.values(
						dataBusInfo[key]["ReRoute"].filter(item => {
							return (
								Object.keys(item)[0] ==
								Object.keys(dataBusInfo[key]["ReRoute"][j])[0]
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
				).toFixed(2)
			);

			// console.log(startStation + " : " + endStation + " : " + distance);

			// g.setEdge(startStation, endStation, distance);

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
	// break;
}

//
for (let fromLocation in dataBusBetween2Locations) {
	for (let toLocation in dataBusBetween2Locations[fromLocation]) {
		let minDistance = Math.min(
			...Object.values(
				dataBusBetween2Locations[fromLocation][toLocation]
			).map(item => item.distance)
		);
		// console.log(minDistance);
		g.setEdge(fromLocation, toLocation, minDistance);
	}
}

exports.stationsGraph = g;
exports.dataBusBetween2Locations = dataBusBetween2Locations;
