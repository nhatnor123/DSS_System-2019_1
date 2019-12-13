let normalizeData = possibleTravelRoute => {
	
	// chuẩn hóa theo tuyến tính với giá trị nhỏ nhất thì là 1
	let minNumberOfBusTransfers = Math.min(
		...possibleTravelRoute.map(item => item["numberOfBusTransfers"] + 1)
	);
	
	let minTotalPrice = Math.min(
		...possibleTravelRoute.map(item => item["totalPrice"])
	);
	let minTravelTime = Math.min(
		...possibleTravelRoute.map(item => item["travelTime"])
	);
	let minTraveledDistance = Math.min(
		...possibleTravelRoute.map(item => item["traveledDistance"])
	);
	let minWaitingTime = Math.min(
		...possibleTravelRoute.map(item => item["waitingTime"])
	);

	let normalizeData = possibleTravelRoute.map(item => {
		return {
			...item,
			numberOfBusTransfers:
				minNumberOfBusTransfers / (item["numberOfBusTransfers"] + 1),
			totalPrice: minTotalPrice / item["totalPrice"],
			travelTime: minTravelTime / item["travelTime"],
			traveledDistance: minTraveledDistance / item["traveledDistance"],
			waitingTime: minWaitingTime / item["waitingTime"]
		};
	});

	return normalizeData;
};

exports.normalizeData = normalizeData;
