import React, { Component } from "react";
import "./Body.css";
import axios from "axios";
import { IPServerAdress } from "../../config/IP_Server.js";

class Body extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataStations: [],
			fromStation: "",
			toStation: ""
		};

		this.selectFromStation = this.selectFromStation.bind(this);
		this.selectToStation = this.selectToStation.bind(this);
		this.searchKRouteBetweenFromAndToStation = this.searchKRouteBetweenFromAndToStation.bind(
			this
		);
		this.searchRouteBetween2Stations = this.searchRouteBetween2Stations.bind(
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
			toStation: resDataStation[0]["Name"]
		});
	}

	selectFromStation(event) {
		console.log(event.target.value);
		this.setState({
			fromStation: event.target.value
		});
	}
	selectToStation(event) {
		console.log(event.target.value);
		this.setState({
			toStation: event.target.value
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

	async searchRouteBetween2Stations() {
		let resData = (
			await axios.post(
				`${IPServerAdress}api/searchRouteBetween2Stations`,
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
			<div>
				<div>
					<div>From</div>
					<select onChange={this.selectFromStation}>
						{this.state.dataStations.map(item => (
							<option value={item.Name}>
								{item.StationID} : {item.Name}
							</option>
						))}
					</select>
				</div>
				<div>
					<div>To</div>
					<select onChange={this.selectToStation}>
						{this.state.dataStations.map(item => (
							<option value={item.Name}>
								{item.StationID} : {item.Name}
							</option>
						))}
					</select>
				</div>
				<div>
					<button onClick={this.searchKRouteBetweenFromAndToStation}>
						Search k shortest path
					</button>
				</div>
				<div>
					<button onClick={this.searchRouteBetween2Stations}>
						Search Route Between 2 Stations
					</button>
				</div>
			</div>
		);
	}
}

export default Body;
