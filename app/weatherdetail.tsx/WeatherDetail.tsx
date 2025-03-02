import {  type WeatherData } from "~/routes/home";
import { WiHumidity, WiStrongWind, WiDayCloudy, WiRain } from "react-icons/wi";
interface WeatherDetailType {
    weather: WeatherData[]
    currentIndex: number
}
const WeatherDetail = ({ weather, currentIndex }: WeatherDetailType) => {
    const currentWeather = weather[currentIndex];
    return (
        <div className=" text-white w-full">
            {currentWeather?
            <div className="grid grid-cols-2 gap-8 bg-purple-200 p-4 rounded-lg text-gray-700">
                <div>
                    <p className="md:text-2xl text-xl font-semibold flex items-center ">
                        <WiHumidity className="mr-2" /> Humidity
                    </p>
                    <p className="md:text-xl text-md ml-8">{currentWeather.avghumidity} %</p>
                </div>
                <div>
                    <p className="md:text-2xl text-xl font-semibold flex items-center">
                        <WiStrongWind className="mr-2" /> Wind
                    </p>
                    <p className="md:text-xl text-md ml-8">{currentWeather.maxwind_kph} kph</p>
                </div>
                <div>
                    <p className="md:text-2xl text-xl font-semibold flex items-center">
                        <WiRain className="mr-2" /> Precipitation
                    </p>
                    <p className="md:text-xl text-md ml-8">{currentWeather.totalprecip_mm} mm</p>
                </div>
                <div>
                    <p className="md:text-2xl text-xl font-semibold flex items-center">
                        <WiDayCloudy className="mr-2" /> Condition
                    </p>
                    <p className="md:text-xl text-md ml-8">{currentWeather.condition.text}</p>
                </div>
            </div>:<p>No Weather data available</p>}
        </div>
    );
};

export default WeatherDetail;
