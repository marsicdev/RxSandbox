import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Chart from "../components/chart";
import GoogleMap from "../components/google-map";

class WeatherList extends Component {
    renderWeather(cityData) {

        const temps = cityData.list.map(weather => weather.main.temp);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const humidities = cityData.list.map(weather => weather.main.humidity);

        const {lat, lon} = cityData.city.coord;

        return (
            <tr key={cityData.city.id}>
                <td><GoogleMap lat={lat} lon={lon} /></td>
                <td><Chart data={temps} color="orange" units="C" /></td>
                <td><Chart data={pressures} color="blue" units="hPa" /></td>
                <td><Chart data={humidities} color="black" units="%" /></td>
            </tr>
        );
    }

    render() {
        return (
            <table className='striped'>
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (C)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

// Parameter to this function is a state object
function mapStateToProps({ weather }) {
    return { weather }
}

// connect(mapStateToProps, mapDispatchToProps)(WeatherList)
//To connect we always pass state or actions or both
export default connect(mapStateToProps)(WeatherList);