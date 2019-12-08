const ksp = require("k-shortest-path");
let { stationsGraph, dataBusBetween2Locations } = require("./stationsGraph");

// let { dataBusInfo, dataBuses, dataStations } = require("./test.js");

let find_K_Route_Between_2_Location = (startStation, endStation, k) => {
    console.log("ahihi")
    // hàm lấy k shortest path
    console.log(startStation, endStation, k)
	let result = ksp.ksp(stationsGraph, startStation, endStation, k);
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
				if (
					tempData[key]["distance"] == result[i]["edges"][j]["weight"]
				) {
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
					finalRouteForEachResult[
						finalRouteForEachResult.length - 1
					] = {
						...finalRouteForEachResult[
							finalRouteForEachResult.length - 1
						],
						to: routeForEachResult[index]["to"],
						distance:
							routeForEachResult[index]["distance"] +
							finalRouteForEachResult[
								finalRouteForEachResult.length - 1
							]["distance"]
					};
				} else {
					finalRouteForEachResult.push({
						...routeForEachResult[index]
					});
				}
			}
		}

		// console.log("AFTER")
		console.log(finalRouteForEachResult); // kết quả cuối cùng
	}
};

exports.find_K_Route_Between_2_Location = find_K_Route_Between_2_Location;
