const ksp = require("k-shortest-path");
let { stationsGraph, dataBusBetween2Locations } = require("./stationsGraph");

let { dataBusInfo, dataStations } = require("../ver3/fakeData");

let find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location = (
	startStation,
	endStation,
	k
) => {
	console.log(startStation + " : " + endStation + " " + k);

	console.log(
		"tìm lộ trình phải di chuyển tối đa bằng 3 trạm xe bus qua 2 điểm start và end"
	);

	let rs = find3BusFromStartToEndStation(startStation, endStation);

	return rs;
};

//
let find1BusFromStartToEndStation = (startStation, endStation) => {
	if (
		dataBusBetween2Locations[startStation] === undefined ||
		dataBusBetween2Locations[startStation] === null ||
		dataBusBetween2Locations[startStation][endStation] === undefined ||
		dataBusBetween2Locations[startStation][endStation] === null
	) {
		// console.log(
		// 	"dont have route between 2 stations " +
		// 		startStation +
		// 		" : " +
		// 		endStation
		// );
		return [];
	} else {
		// console.log(dataBusBetween2Locations[startStation][endStation]);

		let result = [];
		for (key in dataBusBetween2Locations[startStation][endStation]) {
			result.push([
				{
					from: startStation,
					to: endStation,
					busCode: key,
					distance:
						dataBusBetween2Locations[startStation][endStation][key][
							"distance"
						],
					isGoRoute:
						dataBusBetween2Locations[startStation][endStation][key][
							"isGoRoute"
						]
				}
			]);
		}
		// console.log(result);

		return result;
	}
};

let find2BusFromStartToEndStation = (startStation, endStation) => {
	// console.log("ahi   2");

	// dataBusBetween2Locations[startStation]
	if (
		dataBusBetween2Locations[startStation] == undefined ||
		dataBusBetween2Locations[startStation] == null
	) {
		return [];
	}

	let arrayOfStationCanComeFromStartStation = Object.keys(
		dataBusBetween2Locations[startStation]
	);
	// console.log(arrayOfStationCanComeFromStartStation);

	let result_2_Bus = [];

	//xử lý trường hợp có luôn 1 xe bus đi thẳng từ  start tới end
	if (arrayOfStationCanComeFromStartStation.includes(endStation)) {
		for (busCode in dataBusBetween2Locations[startStation][endStation]) {
			result_2_Bus.push([
				{
					from: startStation,
					to: endStation,
					busCode,
					isGoRoute:
						dataBusBetween2Locations[startStation][endStation][
							busCode
						]["isGoRoute"],
					distance:
						dataBusBetween2Locations[startStation][endStation][
							busCode
						]["distance"]
				}
			]);
		}
	} else {
		// console.log("else");
	}

	for (
		let indexStationCanCome = 0;
		indexStationCanCome < arrayOfStationCanComeFromStartStation.length;
		indexStationCanCome++
	) {
		// trường hợp bến xe có thể đến khác bến đích
		if (
			arrayOfStationCanComeFromStartStation[indexStationCanCome] !==
			endStation
		) {
			// console.log("288");
			// //
			// console.log(
			// 	"arrayOfStationCanComeFromStartStation[indexStationCanCome]"
			// );
			// console.log(
			// 	arrayOfStationCanComeFromStartStation[indexStationCanCome]
			// );
			// console.log(endStation);
			let result_1_bus = find1BusFromStartToEndStation(
				arrayOfStationCanComeFromStartStation[indexStationCanCome],
				endStation
			);

			// console.log("result_1_bus");
			// console.log(result_1_bus);
			for (let index = 0; index < result_1_bus.length; index++) {
				// console.log(303);
				for (busCode in dataBusBetween2Locations[startStation][
					arrayOfStationCanComeFromStartStation[indexStationCanCome]
				]) {
					result_2_Bus.push([
						{
							from: startStation,
							to:
								arrayOfStationCanComeFromStartStation[
									indexStationCanCome
								],
							busCode,
							isGoRoute:
								dataBusBetween2Locations[startStation][
									arrayOfStationCanComeFromStartStation[
										indexStationCanCome
									]
								][busCode]["isGoRoute"],
							distance:
								dataBusBetween2Locations[startStation][
									arrayOfStationCanComeFromStartStation[
										indexStationCanCome
									]
								][busCode]["distance"]
						},
						...result_1_bus[index]
					]);
				}
			}
		} else {
			//
		}
	}
	// console.log("result_2_Bus");
	// console.log(result_2_Bus);
	return result_2_Bus;
};

let find3BusFromStartToEndStation = (startStation, endStation) => {
	// console.log("ahi   3");

	if (
		dataBusBetween2Locations[startStation] == undefined ||
		dataBusBetween2Locations[startStation] == null
	) {
		return [];
	}

	let arrayOfStationCanComeFromStartStation = Object.keys(
		dataBusBetween2Locations[startStation]
	);
	// console.log(arrayOfStationCanComeFromStartStation);

	let result_3_Bus = [];

	//xử lý trường hợp có luôn 1 xe bus đi thẳng từ  start tới end
	if (arrayOfStationCanComeFromStartStation.includes(endStation)) {
		for (busCode in dataBusBetween2Locations[startStation][endStation]) {
			result_3_Bus.push([
				{
					from: startStation,
					to: endStation,
					busCode,
					isGoRoute:
						dataBusBetween2Locations[startStation][endStation][
							busCode
						]["isGoRoute"],
					distance:
						dataBusBetween2Locations[startStation][endStation][
							busCode
						]["distance"]
				}
			]);
		}
	} else {
		// console.log("else");
	}

	for (
		let indexStationCanCome = 0;
		indexStationCanCome < arrayOfStationCanComeFromStartStation.length;
		indexStationCanCome++
	) {
		// trường hợp bến xe có thể đến khác bến đích
		if (
			arrayOfStationCanComeFromStartStation[indexStationCanCome] !==
			endStation
		) {
			// console.log("387");
			// //
			// console.log(
			// 	"arrayOfStationCanComeFromStartStation[indexStationCanCome]"
			// );
			// console.log(
			// 	arrayOfStationCanComeFromStartStation[indexStationCanCome]
			// );
			// console.log(endStation);
			let result_2_bus = find2BusFromStartToEndStation(
				arrayOfStationCanComeFromStartStation[indexStationCanCome],
				endStation
			);

			// console.log("result_2_bus");
			// console.log(result_2_bus);
			for (let index = 0; index < result_2_bus.length; index++) {
				// console.log(402);
				for (busCode in dataBusBetween2Locations[startStation][
					arrayOfStationCanComeFromStartStation[indexStationCanCome]
				]) {
					result_3_Bus.push([
						{
							from: startStation,
							to:
								arrayOfStationCanComeFromStartStation[
									indexStationCanCome
								],
							busCode,
							isGoRoute:
								dataBusBetween2Locations[startStation][
									arrayOfStationCanComeFromStartStation[
										indexStationCanCome
									]
								][busCode]["isGoRoute"],
							distance:
								dataBusBetween2Locations[startStation][
									arrayOfStationCanComeFromStartStation[
										indexStationCanCome
									]
								][busCode]["distance"]
						},
						...result_2_bus[index]
					]);
				}
			}
		} else {
			//
		}
	}
	// console.log("result_3_Bus");
	// console.log(result_3_Bus);
	return result_3_Bus;
};

let find4BusFromStartToEndStation = (startStation, endStation) => {
	// console.log("ahi   4");

	if (
		dataBusBetween2Locations[startStation] == undefined ||
		dataBusBetween2Locations[startStation] == null
	) {
		return [];
	}

	let arrayOfStationCanComeFromStartStation = Object.keys(
		dataBusBetween2Locations[startStation]
	);
	// console.log(arrayOfStationCanComeFromStartStation);

	let result_4_Bus = [];

	//xử lý trường hợp có luôn 1 xe bus đi thẳng từ  start tới end
	if (arrayOfStationCanComeFromStartStation.includes(endStation)) {
		for (busCode in dataBusBetween2Locations[startStation][endStation]) {
			result_4_Bus.push([
				{
					from: startStation,
					to: endStation,
					busCode,
					isGoRoute:
						dataBusBetween2Locations[startStation][endStation][
							busCode
						]["isGoRoute"],
					distance:
						dataBusBetween2Locations[startStation][endStation][
							busCode
						]["distance"]
				}
			]);
		}
	} else {
		// console.log("else");
	}

	for (
		let indexStationCanCome = 0;
		indexStationCanCome < arrayOfStationCanComeFromStartStation.length;
		indexStationCanCome++
	) {
		// trường hợp bến xe có thể đến khác bến đích
		if (
			arrayOfStationCanComeFromStartStation[indexStationCanCome] !==
			endStation
		) {
			// console.log("387");
			// //
			// console.log(
			// 	"arrayOfStationCanComeFromStartStation[indexStationCanCome]"
			// );
			// console.log(
			// 	arrayOfStationCanComeFromStartStation[indexStationCanCome]
			// );
			// console.log(endStation);
			let result_3_bus = find3BusFromStartToEndStation(
				arrayOfStationCanComeFromStartStation[indexStationCanCome],
				endStation
			);

			// console.log("result_3_bus");
			// console.log(result_3_bus);
			for (let index = 0; index < result_3_bus.length; index++) {
				// console.log(402);
				for (busCode in dataBusBetween2Locations[startStation][
					arrayOfStationCanComeFromStartStation[indexStationCanCome]
				]) {
					result_4_Bus.push([
						{
							from: startStation,
							to:
								arrayOfStationCanComeFromStartStation[
									indexStationCanCome
								],
							busCode,
							isGoRoute:
								dataBusBetween2Locations[startStation][
									arrayOfStationCanComeFromStartStation[
										indexStationCanCome
									]
								][busCode]["isGoRoute"],
							distance:
								dataBusBetween2Locations[startStation][
									arrayOfStationCanComeFromStartStation[
										indexStationCanCome
									]
								][busCode]["distance"]
						},
						...result_3_bus[index]
					]);
				}
			}
		} else {
			//
		}
	}
	// console.log("result_4_Bus");
	// console.log(result_4_Bus);
	return result_4_Bus;
};

exports.find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location = find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location;
