import { useContext } from "react";
import { UserContext, type CityDetailType, type WeatherData } from "~/routes/home";
import WeatherDetail from "~/weatherdetail.tsx/WeatherDetail";
interface DashboardType {
    setShowCelsius: (value: boolean) => void;
    showCelsius: boolean
   
}
const Dashboard = ({ showCelsius, setShowCelsius}: DashboardType) => {
    const context = useContext(UserContext);
    if (!context) {
        return <p>Loading context...</p>;
    }
    const { weather, currentIndex, cityDetail } = context;

    const currentWeather = weather[currentIndex];
    return (
        <div className="md:p-8 p-2 text-purple-900   w-full flex flex-col justify-between ">
            <div className="flex justify-between items-center">
                <div>
                    {currentWeather ? (
                        <div>
                            {cityDetail && (
                                <div className="flex flex-col gap-2">
                                    <p className="md:text-7xl text-2xl font-bold">{cityDetail.name}</p>
                                    <div className="flex gap-2">
                                        <p>{cityDetail.region},</p>
                                        <p>{cityDetail.country}</p>
                                    </div>
                                    <p className="text-xl">
                                        {showCelsius ? `${currentWeather.avgtemp_c} °C` : `${currentWeather.avgtemp_f} °F`}
                                    </p>
                                    <div
                                        className="relative w-16 h-8 bg-gray-300 rounded-full flex items-center cursor-pointer"
                                        onClick={() => setShowCelsius(!showCelsius)}
                                    >
                                        <div
                                            className={`absolute w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${showCelsius ? 'translate-x-1' : 'translate-x-8'}`}
                                        />
                                        <span className="absolute left-2 text-xs text-black">°C</span>
                                        <span className="absolute right-2 text-xs text-black">°F</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                <img src={currentWeather.condition.icon} alt="Weather Icon" width={200} />
            </div>
            <div className="mt-4 bg-purple-900">
                <WeatherDetail />
            </div>
            <p className="text-center mt-5 text-lg">Stay informed about the weather, wherever you are <span className="loading loading-dots loading-md"></span></p>

        </div>
    );
};

export default Dashboard;
