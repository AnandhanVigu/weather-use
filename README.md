Setup Instructions
Prerequisites : 
Node.js and npm installed on your system.
A valid API key from WeatherAPI.

Installation :

1 . Clone the repository:

	git clone <repository-url>
            cd <project-folder>

2 . Install dependencies:

	npm install

3 . Create a .env file in the root directory and add:

	VITE_WEATHER_API_KEY=api_key_here

4 . Start the development server:

	npm run dev

API Integration Details : 

Weather API: Used to fetch 7-day forecast data based on the city.
OpenStreetMap (Nominatim API): Used to get the city name based on geolocation.

UI Libraries and Features :
1. React Icons
Used for incorporating various icons.


import { WiHumidity, WiStrongWind, WiDayCloudy, WiRain } from "react-icons/wi"

2. DaisyUI
Used for UI components and utility classes.
     
   <span className="loading loading-dots loading-xl"></span>




3. Tailwind CSS
Used for styling and responsive design.
      
<div className="flex gap-5 justify-center items-center h-screen text-purple-600">content</div>

4. Toastify Message
Used for notifications and alerts of error.


import { ToastContainer, toast } from 'react-toastify';
toast.error('Invalid City');

Add <ToastContainer /> in the root component.


Component Structure : 

Home.tsx (Main file for handling state and rendering UI components)
Dashboard.tsx (Displays current weather and city details)
ForeCastList.tsx (Forecast list for desktop view)
ForeCastListMb.tsx (Forecast list for mobile view)
SearchBox.tsx (Handles user search input)

Summary :
This project integrates WeatherAPI for weather data, OpenStreetMap for geolocation, and utilizes React, Tailwind CSS, DaisyUI, React Icons, and React Toastify for a dynamic and user-friendly experience . 














