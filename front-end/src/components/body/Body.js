import React, { Component } from "react";
import "./Body.css";
import axios from "axios";
import IPServerAdress from "../../config/IP_Server.js";

class Body extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataStations: []
		};
	}

	async componentDidMount() {
		let resDataStation = (
			await axios.get("http://0.0.0.0:3012/api/getDataStation")
		).data;
		console.log(resDataStation);
		this.setState({
			...this.state,
			dataStations: resDataStation
		});
	}

	render() {
		return (
			<div>
				<div>
					<div>
						<div>From</div>
						<select>
							{this.state.dataStations.map(item => (
								<option>
									{item.StationID} : {item.Name}
								</option>
							))}
						</select>
					</div>
					<div>
						<div>To</div>
						<select>
							{this.state.dataStations.map(item => (
								<option>
									{item.StationID} : {item.Name}
								</option>
							))}
						</select>
					</div>
					<div></div>
				</div>
			</div>
		);
	}
}

export default Body;
