import React from 'react';
import {useGetWeatherData} from "@/queries/weather";
import Loader from "@/components/loader/Loader";

interface WeatherInfoProps {
    latitude?: number;
    longitude?: number;
}

const WeatherCard = ({latitude, longitude}: WeatherInfoProps) => {
    const {data: weatherData} = useGetWeatherData({
        latitude: latitude ?? 0,
        longitude: longitude ?? 0
    });

    if (!weatherData) return <Loader/>;

    const {
        current: {temperature_2m: temp, wind_speed_10m: speed},
        current_units: {temperature_2m: tempUnit, wind_speed_10m: speedUnit},
        hourly: {relative_humidity_2m: humidity, cloudcover}
    } = weatherData;

    return (
        <div className="absolute top-0 bg-white rounded-lg shadow-lg p-6 w-80 z-10">
            <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-semibold text-gray-800">Weather Info</div>
            </div>

            <div className="flex justify-center items-center mb-4">
                <h1 className="text-6xl font-bold text-gray-900">{Math.round(temp)}{tempUnit}</h1>
                <p className="text-sm text-gray-600 ml-2 capitalize">Current Temperature</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Humidity</span>
                    <h3 className="text-lg font-semibold text-gray-800">{humidity[0]}%</h3>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Wind Speed</span>
                    <h3 className="text-lg font-semibold text-gray-800">{speed} {speedUnit}</h3>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Cloudiness</span>
                    <h3 className="text-lg font-semibold text-gray-800">{cloudcover[0]}%</h3>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;