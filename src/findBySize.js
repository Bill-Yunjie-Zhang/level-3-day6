const cityData = require('all-the-cities')

const findBySize = (population) => cityData.filter(e => e.population > population)

module.exports = findBySize