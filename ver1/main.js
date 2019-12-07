const graphlig = require("graphlib");
const ksp = require("k-shortest-path");
let g = new graphlig.Graph();

let { dataBusInfo, dataBuses, dataStations } = require("./test.js");



for (key in dataBusInfo) {
	console.log(dataBusInfo[key]["BusCode"])

	// console.log("Cac diem trong Go Route");


	let numberOfGoRoute = dataBusInfo[key]["GoRoute"].length;
	let numberOfReRoute = dataBusInfo[key]["ReRoute"].length;
	let startStation, endStation, distance;


	// for (let i = 0; i < numberOfGoRoute; i++) {
	// 	for (let j = i + 1; j < numberOfGoRoute; j++) {
	// 		startStation = Object.keys(dataBusInfo[key]["GoRoute"][i])[0];
	// 		endStation = Object.keys(dataBusInfo[key]["GoRoute"][j])[0];
	// 		distance = parseFloat(
	// 			(
	// 				Object.values(
	// 					dataBusInfo[key]["GoRoute"].filter(item => {
	// 						return (
	// 							Object.keys(item)[0] ==
	// 							Object.keys(dataBusInfo[key]["GoRoute"][j])[0]
	// 						);
	// 					})[0]
	// 				)[0] -
	// 				Object.values(
	// 					dataBusInfo[key]["GoRoute"].filter(item => {
	// 						return (
	// 							Object.keys(item)[0] ==
	// 							Object.keys(dataBusInfo[key]["GoRoute"][i])[0]
	// 						);
	// 					})[0]
	// 				)[0]
	// 			).toFixed(1)
	// 		);

	// 		console.log(startStation + " : " + endStation + " : " + distance);
	// 		if (distance <= 0){
	// 			console.log(distance)
	// 		}
	// 		g.setEdge(startStation, endStation, distance);
	// 	}
	// }

	// for (let i = 0; i < numberOfReRoute; i++) {
	// 	for (let j = i + 1; j < numberOfReRoute; j++) {
	// 		startStation = Object.keys(dataBusInfo[key]["ReRoute"][i])[0];
	// 		endStation = Object.keys(dataBusInfo[key]["ReRoute"][j])[0];
	// 		distance = parseFloat(
	// 			(
	// 				Object.values(
	// 					dataBusInfo[key]["ReRoute"].filter(item => {
	// 						return (
	// 							Object.keys(item)[0] ==
	// 							Object.keys(dataBusInfo[key]["ReRoute"][j])[0]
	// 						);
	// 					})[0]
	// 				)[0] -
	// 				Object.values(
	// 					dataBusInfo[key]["ReRoute"].filter(item => {
	// 						return (
	// 							Object.keys(item)[0] ==
	// 							Object.keys(dataBusInfo[key]["ReRoute"][i])[0]
	// 						);
	// 					})[0]
	// 				)[0]
	// 			).toFixed(1)
	// 		);
	// 		console.log(startStation + " : " + endStation + " : " + distance);
	// 		if (distance <= 0){
	// 			console.log(distance)
	// 		}
	// 		g.setEdge(startStation, endStation, distance);
	// 	}
	// }



	console.log("GOROUTE-------------------------------------")
	for (let i = 0; i < numberOfGoRoute - 1; i++) {
		startStation = Object.keys(dataBusInfo[key]["GoRoute"][i])[0];
		endStation = Object.keys(dataBusInfo[key]["GoRoute"][i+1])[0];
		distance = parseFloat(
			(
				Object.values(
					dataBusInfo[key]["GoRoute"].filter(item => {
						return (
							Object.keys(item)[0] ==
							Object.keys(dataBusInfo[key]["GoRoute"][i+1])[0]
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
		console.log(startStation + " : " + endStation + " : " + distance);
		// if (distance <= 0) {
		// 	console.log(distance);
		// }
		g.setEdge(startStation, endStation, distance)
	}
	console.log("REROUTE-------------------------------------")
	for (let i = 0; i < numberOfReRoute - 1; i++) {
		startStation = Object.keys(dataBusInfo[key]["ReRoute"][i])[0];
		endStation = Object.keys(dataBusInfo[key]["ReRoute"][i+1])[0];
		distance = parseFloat(
			(
				Object.values(
					dataBusInfo[key]["ReRoute"].filter(item => {
						return (
							Object.keys(item)[0] ==
							Object.keys(dataBusInfo[key]["ReRoute"][i+1])[0]
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
		console.log(startStation + " : " + endStation + " : " + distance);
		// if (distance <= 0) {
		// 	console.log(distance);
		// }
		g.setEdge(startStation, endStation, distance)
	}

	// console.log(dataBusInfo[key]["GoRoute"].length+ " : "+ dataBusInfo[key]["ReRoute"].length)

	// console.log(
	// 	Object.values(
	// 		dataBusInfo[key]["ReRoute"].filter(item => {
	// 			return Object.keys(item)[0] == "Ba La";
	// 		})[0]
	// 	)[0]
	// );

	// let result = ksp.ksp(g, "Ba La", "Ngô Gia Khảm", 9);
	// console.log(result[0]["edges"]);
	// console.log(result[1]["edges"]);
	// console.log(result[0]["edges"])

	// break;
}


let result = ksp.ksp(g, "Trần Khánh Dư", "Trần Nhật Duật", 5)
console.log(result[0]["edges"])
console.log(result[1]["edges"])