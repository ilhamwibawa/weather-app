import moment from "moment";
import React from "react";
import WeatherIcon from "./WeatherIcon";

function ForecastItem({ data }) {
  return (
    <div className="flex items-center gap-5 justify-between hover:bg-[rgba(255,255,255,0.2)] cursor-pointer p-2 px-3">
      <div className="text-gray-300 text-sm">
        <WeatherIcon icon={data.weather[0].icon} />
        {moment(data.dt_txt).format("HH:mm")}
      </div>
      <div className=" w-full">
        <span className="text-gray-200 text-sm">{data.weather[0].main}</span>
        <span className="block text-xs text-gray-300">
          {data.weather[0].description}
        </span>
      </div>

      <div className="text-gray-300 text-sm">
        {Math.round(data.main.temp)}°C
      </div>
    </div>
  );
}

export default ForecastItem;
