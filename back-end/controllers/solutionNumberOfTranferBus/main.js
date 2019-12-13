const ksp = require("k-shortest-path");
let { stationsGraph, dataBusBetween2Locations } = require("./stationsGraph");

let { dataBusInfo, dataStations } = require("../ver3/fakeData");

// let { dataBusInfo, dataBuses, dataStations } = require("./test.js");

let find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location = (
	startStation,
	endStation,
	k
) => {
	console.log(startStation + " : " + endStation + " " + k);

	// tìm lộ trình chỉ có 1 trạm xe bus qua 2 điểm start và end
	console.log("tìm lộ trình chỉ có 1 trạm xe bus qua 2 điểm start và end");
	find1BusFromStartToEndStation(startStation, endStation);

	// tìm lộ trình chỉ có 2 trạm xe bus qua 2 điểm start và end
	// for (let  )

	console.log("START------------------------------");
	let xxx = findRouteFromStartToEndStationWithUnmore_K_TransferBus(
		startStation,
		endStation,
		10,
		[startStation],
		"StartBusCode===Zero"
	);
	console.log("xxx");
	console.log(xxx);

	return dataBusBetween2Locations;
};

//tìm lộ trình từ start đến end mà k lớn hơn k lần chuyển xe, ở đây coi k là số xe phải đi luôn :D
let findRouteFromStartToEndStationWithUnmore_K_TransferBus = (
	startStation,
	endStation,
	k,
	listVisitedStation,
	previousBus
) => {
	// find1BusFromStartToEndStation()
	console.log("start station = " + startStation);
	console.log("end Station  = " + endStation);
	console.log("k = " + k);
	console.log("listVisitedStation = ");
	console.log(listVisitedStation);
	console.log("previousBus = " + previousBus);

	if (k == 0) {
		return null;
	}

	let newRoute = [];

	let result_find1BusFromStartToEndStation = find1BusFromStartToEndStation(
		startStation,
		endStation
	);

	console.log("result_find1BusFromStartToEndStation");
	console.log(result_find1BusFromStartToEndStation);

	// check trường hợp có 1 bus đi thẳng từ start tới end
	if (result_find1BusFromStartToEndStation === null) {
		//
	} else {
		for (busCode in result_find1BusFromStartToEndStation) {
			newRoute.push([
				{
					from: startStation,
					to: endStation,
					busCode: busCode,
					isGoRoute:
						result_find1BusFromStartToEndStation[busCode][
							"isGoRoute"
						]
				}
			]);
		}
	}

	console.log("newRoute");
	console.log(newRoute);

	// console.log("dataBusBetween2Locations[startStation]");
	// console.log(dataBusBetween2Locations[startStation]);

	for (possibleStationCanGoFromStartStation in dataBusBetween2Locations[
		startStation
	]) {
		console.log("possibleStationCanGoFromStartStation");
		console.log(possibleStationCanGoFromStartStation);

		if (possibleStationCanGoFromStartStation === endStation) {
			//
			break;
		}
		if (listVisitedStation.includes(possibleStationCanGoFromStartStation)) {
			break;
		}

		console.log("dataBusBetween2Locations[startStation][possibleStationCanGoFromStartStation]");
		console.log(dataBusBetween2Locations[startStation][possibleStationCanGoFromStartStation]);

		for (busCodeFromStartStationToPossibleStationCanGoFromStartStation in dataBusBetween2Locations[
			startStation
		][possibleStationCanGoFromStartStation]) {
			console.log(
				"busCodeFromStartStationToPossibleStationCanGoFromStartStation"
			);
			console.log(
				busCodeFromStartStationToPossibleStationCanGoFromStartStation
			);

			if (
				busCodeFromStartStationToPossibleStationCanGoFromStartStation ==
				previousBus
			) {
				break;
			}

			let listRouteFromThisStationToEndStation = findRouteFromStartToEndStationWithUnmore_K_TransferBus(
				possibleStationCanGoFromStartStation,
				endStation,
				k - 1,
				// listVisitedStation.push(possibleStationCanGoFromStartStation),
				[...listVisitedStation, possibleStationCanGoFromStartStation],
				busCodeFromStartStationToPossibleStationCanGoFromStartStation
			);

			if (listRouteFromThisStationToEndStation.length == 0) {
				//
			} else {
				for (
					let index = 0;
					index < listRouteFromThisStationToEndStation.length;
					index++
				) {
					newRoute.push([
						{
							from: startStation,
							to: possibleStationCanGoFromStartStation,
							busCode: busCodeFromStartStationToPossibleStationCanGoFromStartStation,
							isGoRoute:
								dataBusBetween2Locations[startStation][
									possibleStationCanGoFromStartStation
								][
									busCodeFromStartStationToPossibleStationCanGoFromStartStation
								]["isGoRoute"]
						},
						...listRouteFromThisStationToEndStation[index]
					]);
				}
			}
		}
	}

	return newRoute;
};

//
let find1BusFromStartToEndStation = (startStation, endStation) => {
	if (
		dataBusBetween2Locations[startStation][endStation] === undefined ||
		dataBusBetween2Locations[startStation][endStation] === null
	) {
		console.log(
			"dont have route between 2 stations " +
				startStation +
				" : " +
				endStation
		);
		return null;
	} else {
		console.log(dataBusBetween2Locations[startStation][endStation]);
		return dataBusBetween2Locations[startStation][endStation];
	}
};

exports.find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location = find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location;
