let { dataBusBetween2Locations } = require("../kShortestPath/stationsGraph.js");
let { dataBusInfo, dataBuses, dataStations } = require("../ver2/fakeData");

let searchPossibleTravelRoute = (fromStation, toStation, kShortestPath) => {
	let possibleTravelRoute = [];

	for (let index = 0; index < kShortestPath.length; index++) {
		let totalPrice = 0;
		let traveledDistance = 0;
		let travelTime = 0;
		let waitingTime = 0;
		let firstStepComingBus = null;

		for (step in kShortestPath[index]) {
			let stepBusComing = [];
			if (step == 0) {
				// lấy firstStepComingBus
				let busComing = dataStations.filter(
					item => item["Name"] === kShortestPath[index][step]["from"]
				)[0]["ComingBus"];

				stepBusComing = busComing.filter(
					item =>
						item["BusCode"] ===
							kShortestPath[index][step]["busCode"] &&
						item["IsGoRouter"] ===
							kShortestPath[index][step]["isGoRoute"]
				);

				if (stepBusComing.length != 0) {
					firstStepComingBus = stepBusComing[0];
				} else {
					// tìm xe gần đến đích nhất của tuyến ngược lại
					let lastStationInCounterRoute;
					if (!kShortestPath[index][step]["isGoRoute"]) {
						let goRoute = dataBusInfo.filter(
							item =>
								item["BusCode"] ===
								kShortestPath[index][step]["busCode"]
						)[0]["GoRoute"];
						lastStationInCounterRoute = Object.keys(
							goRoute[goRoute.length - 1]
						)[0];
					} else {
						let reRoute = dataBusInfo.filter(
							item =>
								item["BusCode"] ===
								kShortestPath[index][step]["busCode"]
						)[0]["ReRoute"];

						lastStationInCounterRoute = Object.keys(
							reRoute[reRoute.length - 1]
						)[0];
					}

					let comingBusInEndStationOfCounterRoute = dataStations.filter(
						item => item["Name"] === lastStationInCounterRoute
					)[0]["ComingBus"];

					let willComingBuses = comingBusInEndStationOfCounterRoute.filter(
						item =>
							item["BusCode"] ===
								kShortestPath[index][step]["busCode"] &&
							item["IsGoRouter"] !==
								kShortestPath[index][step]["isGoRoute"]
					);
					let minMinutesComing = Math.min(
						...willComingBuses.map(item => item["time"])
					);

					let finalComingBus = willComingBuses.filter(
						item => item["time"] === minMinutesComing
					)[0];

					let distanceFromStartStationToThisStation;
					if (kShortestPath[index][step]["isGoRoute"]) {
						distanceFromStartStationToThisStation = Object.values(
							dataBusInfo
								.filter(
									item =>
										item["BusCode"] ===
										kShortestPath[index][step]["busCode"]
								)[0]
								["GoRoute"].filter(
									item =>
										Object.keys(item)[0] ===
										kShortestPath[index][step]["from"]
								)
						)[0];
					} else {
						distanceFromStartStationToThisStation = Object.values(
							dataBusInfo
								.filter(
									item =>
										item["BusCode"] ===
										kShortestPath[index][step]["busCode"]
								)[0]
								["ReRoute"].filter(
									item =>
										Object.keys(item)[0] ===
										kShortestPath[index][step]["from"]
								)
						)[0];
					}

					distanceFromStartStationToThisStation = Object.values(
						distanceFromStartStationToThisStation
					)[0];

					finalComingBus = {
						...finalComingBus,
						distance:
							finalComingBus["distance"] +
							distanceFromStartStationToThisStation,
						time: parseInt(
							finalComingBus["time"] +
								(finalComingBus["distance"] +
									distanceFromStartStationToThisStation) /
									(Math.random() * 10 + 30)
						)
					};

					stepBusComing = [finalComingBus];
					firstStepComingBus = stepBusComing[0];
				}
			} else {
			}

			//thời gian đợi xe
			if (stepBusComing.length !== 0) {
				waitingTime += stepBusComing[0]["time"];
			} else {
				waitingTime += parseInt((Math.random() * 10 + 5).toFixed(2));
			}

			// giá vé
			let ticketPrice = dataBusInfo.filter(
				item =>
					item["BusCode"] === kShortestPath[index][step]["busCode"]
			)[0]["TicketPrice"];

			// gán giá vé cho mỗi step
			kShortestPath[index][step]["price"] = ticketPrice;
			totalPrice += ticketPrice;
			// thời gian di chuyển

			travelTime += parseInt(
				(
					kShortestPath[index][step]["distance"] /
						(Math.random() * 10 + 30) +
					1
				).toFixed(2)
			); // do thời gian tạm dừng và bắt đầu đi khi đến trạm bus nên +1 phút
			// khoảng cách di chuyển

			traveledDistance += kShortestPath[index][step]["distance"];
		}

		// chuyển k shortest path về các phương án và tham số của mỗi p/án
		possibleTravelRoute.push({
			route: kShortestPath[index],
			traveledDistance: parseFloat(traveledDistance.toFixed(2)),
			travelTime: travelTime,
			waitingTime: waitingTime,
			totalPrice: totalPrice,
			firstStepComingBus: firstStepComingBus,
			numberOfBusTransfers: kShortestPath[index].length - 1
		});

		// break;
	}

	return possibleTravelRoute;
};

exports.searchPossibleTravelRoute = searchPossibleTravelRoute;
