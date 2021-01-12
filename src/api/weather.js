const axios = require('axios');

export const openweather = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
})