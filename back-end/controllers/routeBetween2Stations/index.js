let { dataBusBetween2Locations } = require("../kShortestPath/stationsGraph.js");

let searchRouteBetween2Stations = (fromStation, toStation) => {
    console.log(fromStation, toStation);
    console.log(dataBusBetween2Locations[fromStation][toStation])
	return dataBusBetween2Locations;
};

exports.searchRouteBetween2Stations = searchRouteBetween2Stations;
