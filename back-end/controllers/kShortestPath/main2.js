const graphlig = require("graphlib");
const ksp = require("k-shortest-path");
let g = new graphlig.Graph();

let { dataBusInfo, dataBuses, dataStations } = require("./test.js");

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

// console.log(dataBusBetween2Locations);

// hàm lấy k shortest path
let result = ksp.ksp(g, "Trần Khánh Dư", "Trần Nhật Duật", 5);
console.log(result);



// hàm so khớp, lấy lộ trình đầy đủ từ kết quả trong k shortest path 
for (let i = 0; i < result.length; i++) {
	// console.log(result[i].totalCost);
	let routeForEachResult = [];
	let finalRouteForEachResult = [];

	for (let j = 0; j < result[i]["edges"].length; j++) {
		// console.log(result[i]["edges"][j]);
		let tempData =
			dataBusBetween2Locations[result[i]["edges"][j]["fromNode"]][
				result[i]["edges"][j]["toNode"]
			];

		for (key in tempData) {
			if (tempData[key]["distance"] == result[i]["edges"][j]["weight"]) {
				// console.log(key);
				// console.log(tempData[key]);
				routeForEachResult.push({
					from: result[i]["edges"][j]["fromNode"],
					to: result[i]["edges"][j]["toNode"],
					busCode: key,
					distance: tempData[key]["distance"],
					isGoRoute: tempData[key]["isGoRoute"]
				});
			}
			// console.log(tempData[key]["distance"] == result[i]["edges"][j]["weight"])
		}
	}
	// console.log("BEFORE")
	// console.log(routeForEachResult);


	//hàm rút gọn các điểm trong mảng lộ trình
	for (let index = 0; index < routeForEachResult.length; index++) {
		if (index == 0) {
			finalRouteForEachResult.push({ ...routeForEachResult[index] });
		} else {
			if (
				routeForEachResult[index]["busCode"] ==
					finalRouteForEachResult[finalRouteForEachResult.length - 1][
						"busCode"
					] 
			) {
				
				finalRouteForEachResult[finalRouteForEachResult.length - 1] = {
					...finalRouteForEachResult[finalRouteForEachResult.length - 1],
					to: routeForEachResult[index]["to"],
					distance:
						routeForEachResult[index]["distance"] +
						finalRouteForEachResult[
							finalRouteForEachResult.length - 1
						]["distance"]
				};
			} else {
				finalRouteForEachResult.push({ ...routeForEachResult[index] });
			}
		}
	}

	// console.log("AFTER")
	console.log(finalRouteForEachResult); // kết quả cuối cùng
}
