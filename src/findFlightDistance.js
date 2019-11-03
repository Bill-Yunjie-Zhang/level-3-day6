const airportsData = require("airport-data")
const citiesData = require("all-the-cities")
const _ = require("lodash")

const distance = (lat1, lon1, lat2, lon2, unit) => {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

const checkAirports = (city) => {
    const city1 = citiesData.find(e => e.name.toLowerCase() === city.toLowerCase())

    const distances = airportsData.map((o) => {
        let d = {
            name: o.name,
            lat: o.latitude,
            lon: o.longitude,
            distance: distance(o.latitude, o.longitude, city1.lat, city1.lon, "K")
        }
        return d
    })

    let sorted = _.sortBy(distances, "distance")

    return sorted[0]
}

const findFlightDistance = (city1, city2) => {
    const city1Data = checkAirports(city1)
    const city2Data = checkAirports(city2)
    return distance(city1Data.lat, city1Data.lon, city2Data.lat, city2Data.lon)
}

module.exports = findFlightDistance