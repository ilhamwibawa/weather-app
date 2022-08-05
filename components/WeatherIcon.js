import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightCloudy,
  WiCloud,
  WiShowers,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

const WeatherIcon = ({ icon }) => {
  const iconMap = {
    "01d": <WiDaySunny />,
    "01n": <WiNightClear />,
    "02d": <WiDayCloudy />,
    "02n": <WiNightCloudy />,
    "03d": <WiCloud />,
    "03n": <WiCloud />,
    "04d": <WiCloud />,
    "04n": <WiCloud />,
    "09d": <WiShowers />,
    "09n": <WiShowers />,
    "10d": <WiRain />,
    "10n": <WiRain />,
    "11d": <WiThunderstorm />,
    "11n": <WiThunderstorm />,
    "13d": <WiSnow />,
    "13n": <WiSnow />,
    "50d": <WiFog />,
    "50n": <WiFog />,
  };

  return (
    <div className="flex items-center justify-center">
      <div className="text-gray-300 text-4xl">{iconMap[icon]}</div>
    </div>
  );
};

export default WeatherIcon;
