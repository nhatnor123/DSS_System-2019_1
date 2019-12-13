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
	// find1BusFromStartToEndStation(startStation, endStation);

	// tìm lộ trình chỉ có 2 trạm xe bus qua 2 điểm start và end
	// for (let  )
	console.log("tìm lộ trình chỉ có 2 trạm xe bus qua 2 điểm start và end");
	// find2BusFromStartToEndStation(startStation, endStation);

	console.log("tìm lộ trình chỉ có 3 trạm xe bus qua 2 điểm start và end");
	// find3BusFromStartToEndStation(startStation, endStation);

	let rs = find2BusFromStartToEndStation(startStation, endStation);

	console.log("START------------------------------");
	// let xxx = findRouteFromStartToEndStationWithUnmore_K_TransferBus(
	// 	startStation,
	// 	endStation,
	// 	8,
	// 	[startStation],
	// 	"StartBusCode===Zero"
	// );
	// console.log("xxx");
	// console.log(xxx);

	return rs;
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
	// console.log(listVisitedStation);
	console.log("previousBus = " + previousBus);

	if (k == 0) {
		return [];
	}

	let newRoute = []; // sửa lại đoạn này :v, null thì k chạy đc

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

	loop1: for (possibleStationCanGoFromStartStation in dataBusBetween2Locations[
		startStation
	]) {
		console.log("possibleStationCanGoFromStartStation");
		console.log(possibleStationCanGoFromStartStation);

		if (possibleStationCanGoFromStartStation === endStation) {
			//
			break loop1;
		}
		if (listVisitedStation.includes(possibleStationCanGoFromStartStation)) {
			break loop1;
		} else {
			console.log("list Visited Station");
			console.log(listVisitedStation);
		}

		console.log(
			"dataBusBetween2Locations[startStation][possibleStationCanGoFromStartStation]"
		);
		console.log(
			dataBusBetween2Locations[startStation][
				possibleStationCanGoFromStartStation
			]
		);

		loop2: for (busCodeFromStartStationToPossibleStationCanGoFromStartStation in dataBusBetween2Locations[
			startStation
		][possibleStationCanGoFromStartStation]) {
			console.log(
				"bus Code From Start Station To Possible Station Can Go From Start Station"
			);
			console.log(
				busCodeFromStartStationToPossibleStationCanGoFromStartStation
			);

			if (
				busCodeFromStartStationToPossibleStationCanGoFromStartStation ==
				previousBus
			) {
				console.log("break vì trùng xe vs xe vừa đi");
				break loop2; // ? nghi vấn lỗi ở đây ?
			} else {
				console.log("khong break");
			}
			console.log("Bắt đầu gọi đệ quy ------------------" + k);
			let listRouteFromThisStationToEndStation = findRouteFromStartToEndStationWithUnmore_K_TransferBus(
				possibleStationCanGoFromStartStation,
				endStation,
				k - 1,
				// listVisitedStation.push(possibleStationCanGoFromStartStation),
				[...listVisitedStation, possibleStationCanGoFromStartStation],
				busCodeFromStartStationToPossibleStationCanGoFromStartStation
			);
			console.log("Kết thúc  gọi đệ quy ------------------" + k);
			console.log("list Route From This Station To End Station");
			// console.log(listRouteFromThisStationToEndStation);
			if (listRouteFromThisStationToEndStation.length == 0) {
				//
				console.log("Đệ quy k tìm đc lộ trình nào");
			} else {
				console.log(
					" Bắt đầu  gán vào newRoute các lộ trình  tìm  đc trong đệ quy"
				);
				for (
					let index = 0;
					index < listRouteFromThisStationToEndStation.length;
					index++
				) {
					console.log({
						from: startStation,
						to: possibleStationCanGoFromStartStation,
						busCode: busCodeFromStartStationToPossibleStationCanGoFromStartStation
						// isGoRoute:
						// 	dataBusBetween2Locations[startStation][
						// 		possibleStationCanGoFromStartStation
						// 	][
						// 		busCodeFromStartStationToPossibleStationCanGoFromStartStation
						// 	]["isGoRoute"]
					});
					console.log(listRouteFromThisStationToEndStation[index]);
					console.log(
						dataBusBetween2Locations[startStation][
							possibleStationCanGoFromStartStation
						]
					);
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
				console.log("end ");
			}
			console.log("list Visited Station after last of for loop");
			// console.log(listVisitedStation);
			console.log("newRoute last of for loop");
			console.log(newRoute);
		}
	}

	return newRoute;
};

//
let find1BusFromStartToEndStation = (startStation, endStation) => {
	if (
		dataBusBetween2Locations[startStation] === undefined ||
		dataBusBetween2Locations[startStation] === null ||
		dataBusBetween2Locations[startStation][endStation] === undefined ||
		dataBusBetween2Locations[startStation][endStation] === null
	) {
		console.log(
			"dont have route between 2 stations " +
				startStation +
				" : " +
				endStation
		);
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
		console.log(result);

		return result;
	}
};

let find2BusFromStartToEndStation = (startStation, endStation) => {
	console.log("ahi   2");

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
		console.log("else");
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
			console.log("288");
			//
			console.log(
				"arrayOfStationCanComeFromStartStation[indexStationCanCome]"
			);
			console.log(
				arrayOfStationCanComeFromStartStation[indexStationCanCome]
			);
			console.log(endStation);
			let result_1_bus = find1BusFromStartToEndStation(
				arrayOfStationCanComeFromStartStation[indexStationCanCome],
				endStation
			);

			console.log("result_1_bus");
			console.log(result_1_bus);
			for (let index = 0; index < result_1_bus.length; index++) {
				console.log(303);
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
	console.log("result_2_Bus");
	console.log(result_2_Bus);
	return result_2_Bus;
};

let find3BusFromStartToEndStation = (startStation, endStation) => {
	console.log("ahi   3");

	if (
		dataBusBetween2Locations[startStation] == undefined ||
		dataBusBetween2Locations[startStation] == null
	) {
		return [];
	}

	let arrayOfStationCanComeFromStartStation = Object.keys(
		dataBusBetween2Locations[startStation]
	);
	console.log(arrayOfStationCanComeFromStartStation);

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
		console.log("else");
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
			console.log("387");
			//
			console.log(
				"arrayOfStationCanComeFromStartStation[indexStationCanCome]"
			);
			console.log(
				arrayOfStationCanComeFromStartStation[indexStationCanCome]
			);
			console.log(endStation);
			let result_2_bus = find2BusFromStartToEndStation(
				arrayOfStationCanComeFromStartStation[indexStationCanCome],
				endStation
			);

			console.log("result_2_bus");
			console.log(result_2_bus);
			for (let index = 0; index < result_2_bus.length; index++) {
				console.log(402);
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
	console.log("result_3_Bus");
	console.log(result_3_Bus);
	return result_3_Bus;
};

let find4BusFromStartToEndStation = (startStation, endStation) => {
	console.log("ahi   4");

	if (
		dataBusBetween2Locations[startStation] == undefined ||
		dataBusBetween2Locations[startStation] == null
	) {
		return [];
	}

	let arrayOfStationCanComeFromStartStation = Object.keys(
		dataBusBetween2Locations[startStation]
	);
	console.log(arrayOfStationCanComeFromStartStation);

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
		console.log("else");
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
			console.log("387");
			//
			console.log(
				"arrayOfStationCanComeFromStartStation[indexStationCanCome]"
			);
			console.log(
				arrayOfStationCanComeFromStartStation[indexStationCanCome]
			);
			console.log(endStation);
			let result_3_bus = find3BusFromStartToEndStation(
				arrayOfStationCanComeFromStartStation[indexStationCanCome],
				endStation
			);

			console.log("result_3_bus");
			console.log(result_3_bus);
			for (let index = 0; index < result_3_bus.length; index++) {
				console.log(402);
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
	console.log("result_4_Bus");
	console.log(result_4_Bus);
	return result_4_Bus;
};


let find5BusFromStartToEndStation = (startStation, endStation) => {
	console.log("ahi   5");

	if (
		dataBusBetween2Locations[startStation] == undefined ||
		dataBusBetween2Locations[startStation] == null
	) {
		return [];
	}

	let arrayOfStationCanComeFromStartStation = Object.keys(
		dataBusBetween2Locations[startStation]
	);
	console.log(arrayOfStationCanComeFromStartStation);

	let result_5_Bus = [];

	//xử lý trường hợp có luôn 1 xe bus đi thẳng từ  start tới end
	if (arrayOfStationCanComeFromStartStation.includes(endStation)) {
		for (busCode in dataBusBetween2Locations[startStation][endStation]) {
			result_5_Bus.push([
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
		console.log("else");
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
			console.log("387");
			//
			console.log(
				"arrayOfStationCanComeFromStartStation[indexStationCanCome]"
			);
			console.log(
				arrayOfStationCanComeFromStartStation[indexStationCanCome]
			);
			console.log(endStation);
			let result_4_bus = find4BusFromStartToEndStation(
				arrayOfStationCanComeFromStartStation[indexStationCanCome],
				endStation
			);

			console.log("result_4_bus");
			console.log(result_4_bus);
			for (let index = 0; index < result_4_bus.length; index++) {
				console.log(402);
				for (busCode in dataBusBetween2Locations[startStation][
					arrayOfStationCanComeFromStartStation[indexStationCanCome]
				]) {
					result_5_Bus.push([
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
						...result_4_bus[index]
					]);
				}
			}
		} else {
			//
		}
	}
	console.log("result_5_Bus");
	console.log(result_5_Bus);
	return result_5_Bus;
};

// find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location("BX Giáp Bát","Trương Định",4)

exports.find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location = find_Routes_Have_k_Max_Transfer_Bus_Between_2_Location;
