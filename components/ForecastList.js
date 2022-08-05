import moment from "moment";
import React from "react";
import ForecastItem from "./ForecastItem";

function ForecastList({ forecast }) {
  return (
    <>
      {forecast.map((day, index) => (
        <div key={index} className="">
          <div className="flex flex-col">
            <div className="text-gray-300 text-lg pb-2">
              {moment(day[0].dt_txt).format("dddd DD")}
            </div>
            <div className="flex flex-col h-[250px] overflow-hidden overflow-y-scroll scrollbar scrollbar-none scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {day.map((hour, index) => (
                <ForecastItem data={hour} key={index} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ForecastList;
