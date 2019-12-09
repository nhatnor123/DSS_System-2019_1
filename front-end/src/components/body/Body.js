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
			options: []
		};

		this.selectFromStation = this.selectFromStation.bind(this);
		this.selectToStation = this.selectToStation.bind(this);
		this.searchKRouteBetweenFromAndToStation = this.searchKRouteBetweenFromAndToStation.bind(
			this
		);
		this.getSuggestedTravelRoute = this.getSuggestedTravelRoute.bind(
			this
		);
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
			await axios.post(
				`${IPServerAdress}api/getSuggestedTravelRoute`,
				{
					fromStation: this.state.fromStation,
					toStation: this.state.toStation
				}
			)
		).data;
		console.log(resData);
	}

	render() {
		return (
			<div style={{ width: "80%" }}>
				<div>
					<div>From</div>
					<div style={{ width: "100%" }}>
						<Select
							// value={this.state.fromStation}
							onChange={this.selectFromStation}
							options={this.state.options}
						/>
					</div>
				</div>
				<div>
					<div>To</div>
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
			</div>
		);
	}
}

export default Body;
