const cityData = require("all-the-cities")

const findCity = (name, country, data) => {
    // let lookupData = data || cityData
    let lookupData
    if (data) {
        lookupData = data
    } else {
        lookupData = cityData
    }

    const lookup = lookupData.find(city => {
        const cityName = city.name
        const countryName = city.country

        if(country){
            const isCorrectCity = cityName.toLowerCase() === name.toLowerCase()
            const isCorrectCountry = countryName.toLowerCase() === country.toLowerCase()
            return isCorrectCity && isCorrectCountry
        }else{
            const isCorrectCity = cityName.toLowerCase() === name.toLowerCase()
            return isCorrectCity            
        }

    })

    // console.log(lookup)
    return lookup
}

module.exports = findCity