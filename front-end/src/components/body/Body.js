import React, { Component } from "react";
import "./Body.css";
import axios from "axios";
import { IPServerAdress } from "../../config/IP_Server.js";

import Select from "react-select";

class Body extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataStations: [],
			fromStation: "",
			toStation: "",
			options: [],
			phuongAn: null
		};

		this.selectFromStation = this.selectFromStation.bind(this);
		this.selectToStation = this.selectToStation.bind(this);
		this.searchKRouteBetweenFromAndToStation = this.searchKRouteBetweenFromAndToStation.bind(
			this
		);
		this.getSuggestedTravelRoute = this.getSuggestedTravelRoute.bind(this);
		this.getNormalizedData = this.getNormalizedData.bind(this);
		this.getTOPSISData = this.getTOPSISData.bind(this);
		this.getTOPSISData2 = this.getTOPSISData2.bind(this)
	}

	async componentDidMount() {
		let resDataStation = (
			await axios.get(`${IPServerAdress}api/getDataStation`)
		).data;
		console.log(resDataStation);
		this.setState({
			...this.state,
			dataStations: resDataStation,
			fromStation: resDataStation[0]["Name"],
			toStation: resDataStation[0]["Name"],
			options: resDataStation.map(item => {
				return {
					value: item.Name,
					label: `${item.StationID} : ${item.Name}`
				};
			})
		});
	}

	selectFromStation(selectedOption) {
		console.log(selectedOption);
		this.setState({
			fromStation: selectedOption.value
		});
	}
	selectToStation(selectedOption) {
		console.log(selectedOption);
		this.setState({
			toStation: selectedOption.value
		});
	}

	async searchKRouteBetweenFromAndToStation() {
		let resData = (
			await axios.post(
				`${IPServerAdress}api/find_K_Route_Between_2_Location`,
				{
					fromStation: this.state.fromStation,
					toStation: this.state.toStation
				}
			)
		).data;
		console.log(resData);
	}

	async getSuggestedTravelRoute() {
		let resData = (
			await axios.post(`${IPServerAdress}api/getSuggestedTravelRoute`, {
				fromStation: this.state.fromStation,
				toStation: this.state.toStation
			})
		).data;
		console.log(resData);
	}

	async getNormalizedData() {
		let resData = (
			await axios.post(
				`${IPServerAdress}api/normalizeDataFromSearchPossibleTravelRoute`,
				{
					fromStation: this.state.fromStation,
					toStation: this.state.toStation
				}
			)
		).data;
		console.log(resData);
	}

	async getTOPSISData() {
		let resData = (
			await axios.post(`${IPServerAdress}api/topsis`, {
				fromStation: this.state.fromStation,
				toStation: this.state.toStation
			})
		).data;
		console.log(resData);
		this.setState({
			phuongAn: resData
		});
	}

	async getTOPSISData2(){
		let resData = (
			await axios.post(`${IPServerAdress}api/topsisVer2`, {
				fromStation: this.state.fromStation,
				toStation: this.state.toStation
			})
		).data;
		console.log(resData);
		this.setState({
			phuongAn: resData
		});
	}

	render() {
		return (
			<div style={{ width: "80%" }}>
				<div>
					<div style={{fontSize:"30px" ,marginTop:"10px"}}>From</div>
					<div style={{ width: "100%" }}>
						<Select
							// value={this.state.fromStation}
							onChange={this.selectFromStation}
							options={this.state.options}
						/>
					</div>
				</div>
				<div>
				<div style={{fontSize:"30px", marginTop:"10px"}}>To</div>
					<div style={{ width: "100%" }}>
						<Select
							// value={this.state.toStation}
							onChange={this.selectToStation}
							options={this.state.options}
						/>
					</div>
				</div>
				<div style={{ marginTop: "15px" }}>
					<button
						onClick={this.searchKRouteBetweenFromAndToStation}
						style={{ fontSize: "20px" }}
					>
						Search k shortest path
					</button>
				</div>
				<div style={{ marginTop: "15px" }}>
					<button
						onClick={this.getSuggestedTravelRoute}
						style={{ fontSize: "20px" }}
					>
						Get Suggested Travel Routes
					</button>
				</div>
				<div style={{ marginTop: "15px" }}>
					<button
						onClick={this.getNormalizedData}
						style={{ fontSize: "20px" }}
					>
						Get Normalized Data
					</button>
				</div>
				<div style={{ marginTop: "15px" }}>
					<button
						onClick={this.getTOPSISData}
						style={{ fontSize: "20px" }}
					>
						Get TOPSIS Data
					</button>
				</div>

				<div style={{ marginTop: "15px" }}>
					<button
						onClick={this.getTOPSISData}
						style={{ fontSize: "30px" }}
					>
						Search
					</button>
				</div>

				<div style={{ marginTop: "15px" }}>
					<button
						onClick={this.getTOPSISData2}
						style={{ fontSize: "30px" }}
					>
						SearchType2
					</button>
				</div>

				{this.state.phuongAn !== null && (
					<div style={{ marginTop: "20px" }}>
						<table>
							<thead>
								<tr>
									<th style={{ width: "5%" }}> STT </th>
									<th style={{ width: "50%" }}>Lộ trình</th>
									<th style={{ width: "8%" }}>
										Quãng đường di chuyển
									</th>
									<th style={{ width: "8%" }}>
										Thời gian đợi xe
									</th>
									<th style={{ width: "8%" }}>
										Thời gian di chuyển
									</th>
									<th style={{ width: "8%" }}>Tổng giá vé</th>
									<th style={{ width: "8%" }}>
										Số lần chuyển xe
									</th>
									<th style={{ width: "5%" }}>
										Độ tương tự tới phương án lí tưởng
									</th>
								</tr>
							</thead>

							<tbody>
								{this.state.phuongAn.possibleTravelRoute.map(
									item => {
										return (
											<tr>
												<td style={{ width: "5%" }}>
													{this.state.phuongAn.possibleTravelRoute.indexOf(
														item
													) + 1}
												</td>
												<td style={{ width: "50%" }}>
													<div
														style={{
															margin:
																"10px 5px 10px 12px"
														}}
													>
														{item["route"].map(
															itemRoute => (
																<div
																	style={{
																		textAlign:
																			"left"
																	}}
																>
																	{
																		itemRoute[
																			"from"
																		]
																	}{" "}
																	--->{" "}
																	{
																		itemRoute[
																			"to"
																		]
																	}
																	{" : "} xe
																	bus{" "}
																	{
																		itemRoute[
																			"busCode"
																		]
																	}{" "}
																	( chiều{" "}
																	{itemRoute[
																		"isGoRoute"
																	] && "đi"}
																	{!itemRoute[
																		"isGoRoute"
																	] && "về"}
																	), giá{" "}
																	{
																		itemRoute[
																			"price"
																		]
																	}{" "}
																	đồng
																</div>
															)
														)}
													</div>
												</td>
												<td style={{ width: "8%" }}>
													{item["traveledDistance"]} (
													km)
												</td>
												<td style={{ width: "8%" }}>
													{item["waitingTime"]}( phút)
												</td>
												<td style={{ width: "8%" }}>
													{item["travelTime"]} ( phút)
												</td>
												<td style={{ width: "8%" }}>
													{item["totalPrice"]} ( đồng)
												</td>
												<td style={{ width: "8%" }}>
													{
														item[
															"numberOfBusTransfers"
														]
													}{" "}
													( lần)
												</td>
												<td style={{ width: "5%" }}>
													{item["topsisData"].toFixed(
														4
													)}
												</td>
											</tr>
										);
									}
								)}
							</tbody>
						</table>
					</div>
				)}
			</div>
		);
	}
}

export default Body;
