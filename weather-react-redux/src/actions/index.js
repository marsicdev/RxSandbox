import axios from 'axios';

const API_KEY = '2933c2951c2f1a42ab1005cbec540dab';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(cityName) {
    const url = `${ROOT_URL}&q=${cityName}&units=metric`;
    const request = axios.get(url);

    return {
        type: FETCH_WEATHER,
        payload: request
    };
}
