import React from 'react';
import {useGetWeatherData} from "@/queries/weather";
import Loader from "@/components/loader/Loader";

const WeatherCard = () => {
    const {data: weatherData} = useGetWeatherData({lat: '27.6922', lon: '85.3246'})

    if (!weatherData) return <Loader/>;

    const {
        name,
        main: {temp, humidity},
        weather,
        wind: {speed},
        clouds: {all: cloudiness},
    } = weatherData;

    return (
        <div className="absolute bottom-0 right-5 bg-white rounded-lg shadow-lg p-6 w-80 z-10">
            <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-semibold text-gray-800">{name}</div>
                <div className="text-red-500">High</div>
            </div>

            <div className="flex justify-center items-center mb-4">
                <h1 className="text-6xl font-bold text-gray-900">{Math.round(temp)}°C</h1>
                <p className="text-sm text-gray-600 ml-2 capitalize">{weather[0].description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Humidity</span>
                    <h3 className="text-lg font-semibold text-gray-800">{humidity}%</h3>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Wind Speed</span>
                    <h3 className="text-lg font-semibold text-gray-800">{speed} m/s</h3>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Cloudiness</span>
                    <h3 className="text-lg font-semibold text-gray-800">{cloudiness}%</h3>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
