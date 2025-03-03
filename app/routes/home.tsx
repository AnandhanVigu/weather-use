import { createContext,useEffect, useState } from "react";
import Dashboard from "~/dashboard/Dashboard";
import ForeCastList from "~/forecastlist/ForeCastList";
import ForeCastListMb from "~/forecastlist_mb/ForeCastListMb";
import SearchBox from "~/searchbox/SearchBox";
import { ToastContainer, toast } from 'react-toastify';

export interface WeatherData {
  date: string;
  mintemp_c: number;
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  avghumidity: number;
  totalprecip_mm: number;
  condition: {
    text: string;
    icon: string;
  };
}


export interface CityDetailType {
  country: string,
  region: string,
  name: string
}
interface UserContextType {
  weather: WeatherData[];
  currentIndex: number;
  cityDetail: CityDetailType | undefined;
}
export const UserContext = createContext<UserContextType | null>(null);

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function Home() {
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cityDetail, setCityDetail] = useState<CityDetailType>();
  const [showCelsius, setShowCelsius] = useState(true);
  const [city, setCity] = useState('');
  const getWeatherDetail = async (city: string) => {
    try {
      if (city) {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        const currentCityData: CityDetailType = {
          country: data.location.country,
          region: data.location.region,
          name: data.location.name,
        };

        setCityDetail(currentCityData);

        const filteredData = data.forecast.forecastday.map((day: any) => ({
          date: day.date,
          mintemp_c: day.day.mintemp_c,
          maxtemp_c: day.day.maxtemp_c,
          maxtemp_f: day.day.maxtemp_f,
          mintemp_f: day.day.mintemp_f,
          avgtemp_c: day.day.avgtemp_c,
          avgtemp_f: day.day.avgtemp_f,
          maxwind_mph: day.day.maxwind_mph,
          maxwind_kph: day.day.maxwind_kph,
          avghumidity: day.day.avghumidity,
          totalprecip_mm: day.day.totalprecip_mm,
          condition: {
            text: day.day.condition.text,
            icon: day.day.condition.icon,
          },
        }));

        setWeather(filteredData);
      }
    } catch (err) {
      toast.error('Invalid City');
    } finally {
      setLoading(false);
      setCity('')
    }
  };

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        fetch(url).then(res => res.json()).then(data => setCity(data.address.city || data.address.county || data.address.state_district))
      })
    } catch (error) {
      console.error("Error in initial data fetch:", error);
    }
  }, []);

  useEffect(() => {
    try {
      getWeatherDetail(city);
    } catch (error) {
      console.error("Error fetching new city data:", error);
    }
  }, [city]);

  if (loading || weather.length === 0) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen text-purple-600">
        <p className="text-lg font-semibold">Please Turn On Your Location!!!</p>
        <div className="flex gap-5">
          <p className="text-lg font-semibold ">Loading weather data</p>
          <span className="loading loading-dots loading-xl"></span>
        </div>
      </div>
    );  }

  return (
    <div>
      <ToastContainer />
      <UserContext.Provider value={{ currentIndex, weather, cityDetail }}>

      <div className="h-screen p-4">
        <div className="flex h-full  w-full">
          <div className="md:w-4/6 w-full bg-white">
            <SearchBox setCity={setCity} />
            <Dashboard showCelsius={showCelsius} setShowCelsius={setShowCelsius} />
          </div>
          <div className="md:w-2/6 hidden md:block">
            <ForeCastList setCurrentIndex={setCurrentIndex} showCelsius={showCelsius}  />
          </div>
          <div className="md:hidden fixed bottom-5 right-5 bg-white shadow-md">
            <ForeCastListMb setCurrentIndex={setCurrentIndex} showCelsius={showCelsius} />
          </div>
        </div>
      </div>
      </UserContext.Provider>

    </div>

  );
}
