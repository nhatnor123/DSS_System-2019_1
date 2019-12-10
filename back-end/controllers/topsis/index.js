let topsis = (originalNormalizedData, trongSoCuaCacThuocTinh) => {
	console.log("ahihiiiii");
	//tính giá trị theo trọng số
	let normalizedData = originalNormalizedData.map(item => {
		console.log(originalNormalizedData);
		console.log(trongSoCuaCacThuocTinh);
		return {
			...item,
			numberOfBusTransfers:
				item["numberOfBusTransfers"] * trongSoCuaCacThuocTinh[0],
			totalPrice: item["totalPrice"] * trongSoCuaCacThuocTinh[1],
			travelTime: item["travelTime"] * trongSoCuaCacThuocTinh[2],
			traveledDistance:
				item["traveledDistance"] * trongSoCuaCacThuocTinh[3],
			waitingTime: item["waitingTime"] * trongSoCuaCacThuocTinh[4]
		};
	});

	// phương án lí tưởng tốt và xấu
	let phuongAnLiTuongTot = [
		Math.max(...normalizedData.map(item => item["numberOfBusTransfers"])),
		Math.max(...normalizedData.map(item => item["totalPrice"])),
		Math.max(...normalizedData.map(item => item["travelTime"])),
		Math.max(...normalizedData.map(item => item["traveledDistance"])),
		Math.max(...normalizedData.map(item => item["waitingTime"]))
	];
	let phuongAnLiTuongXau = [
		Math.min(...normalizedData.map(item => item["numberOfBusTransfers"])),
		Math.min(...normalizedData.map(item => item["totalPrice"])),
		Math.min(...normalizedData.map(item => item["travelTime"])),
		Math.min(...normalizedData.map(item => item["traveledDistance"])),
		Math.min(...normalizedData.map(item => item["waitingTime"]))
	];

	console.log(phuongAnLiTuongTot);
	console.log(phuongAnLiTuongXau);

	// khoảng cách từng phương án tới p.án lí tưởng tốt và xấu
	let khoangCachToiLiTuongTot = normalizedData.map(item => {
		return Math.sqrt(
			Math.pow(item["numberOfBusTransfers"] - phuongAnLiTuongTot[0], 2) +
				Math.pow(item["totalPrice"] - phuongAnLiTuongTot[1], 2) +
				Math.pow(item["travelTime"] - phuongAnLiTuongTot[2], 2) +
				Math.pow(item["traveledDistance"] - phuongAnLiTuongTot[3], 2) +
				Math.pow(item["waitingTime"] - phuongAnLiTuongTot[4], 2)
		);
	});
	let khoangCachToiLiTuongXau = normalizedData.map(item => {
		return Math.sqrt(
			Math.pow(item["numberOfBusTransfers"] - phuongAnLiTuongXau[0], 2) +
				Math.pow(item["totalPrice"] - phuongAnLiTuongXau[1], 2) +
				Math.pow(item["travelTime"] - phuongAnLiTuongXau[2], 2) +
				Math.pow(item["traveledDistance"] - phuongAnLiTuongXau[3], 2) +
				Math.pow(item["waitingTime"] - phuongAnLiTuongXau[4], 2)
		);
	});

	console.log(khoangCachToiLiTuongTot);
	console.log(khoangCachToiLiTuongXau);

	// độ tương tự tới phương án lí tưởng
	let doTuongTuToiPhuongAnLiTuong = [];
	for (let index = 0; index < khoangCachToiLiTuongTot.length; index++) {
		let doTuongTuToiPALiTuong =
			khoangCachToiLiTuongXau[index] /
			(khoangCachToiLiTuongXau[index] + khoangCachToiLiTuongTot[index]);

		doTuongTuToiPhuongAnLiTuong.push(doTuongTuToiPALiTuong);
	}
	console.log(doTuongTuToiPhuongAnLiTuong);

	return doTuongTuToiPhuongAnLiTuong;
};

exports.topsis = topsis;
