import Head from "next/head";
import { BsSearch } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { useState, useEffect } from "react";
import useSWR from "swr";
import moment from "moment";
import ForecastList from "../components/ForecastList";
import WeatherIcon from "../components/WeatherIcon";
import Image from "next/image";

export default function Home() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const [backgroundImage, setBackgroundImage] = useState("");
  const [imageQuery, setImageQuery] = useState("Jakarta");
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [currentLocation, setCurrentLocation] = useState({});
  const [forecast, setForecast] = useState([]);

  // Get data from OpenWeather API
  const { data: searchData } = useSWR(
    `/api/geo/search?query=${searchQuery}`,
    fetcher
  );

  const { data: currentWeatherData } = useSWR(
    `/api/weather/current?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}`,
    fetcher
  );

  const { data: forecastWeatherData } = useSWR(
    `/api/weather/forecast?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}`,
    fetcher
  );

  const { data: images } = useSWR(
    `/api/images/search?query=${imageQuery}`,
    fetcher
  );

  // Get user's location
  useEffect(() => {
    // if navigator.geolocation is available and allowed, get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      });

      // if navigator.geolocation is not available, get the default location
      // (San Francisco, CA)
      setCurrentLocation({ latitude: 37.7749, longitude: -122.4194 });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (images) {
      if (images.results.length > 0) {
        setBackgroundImage(
          images.results[Math.floor(Math.random() * 10)].urls.regular
        );
      }
    }
  }, [images, currentLocation]);

  useEffect(() => {
    if (currentWeatherData) {
      setCurrentWeather(currentWeatherData);
      setImageQuery(currentWeatherData.name);
    }
  }, [currentWeatherData]);

  useEffect(() => {
    if (forecastWeatherData) {
      const groupedForecast = forecastWeatherData.list.reduce((acc, cur) => {
        const date = moment(cur.dt_txt).format("YYYY-MM-DD");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(cur);
        return acc;
      }, {});
      setForecast(Object.values(groupedForecast));
    }
  }, [forecastWeatherData, currentLocation]);

  useEffect(() => {
    if (searchData) {
      setSearchResults(searchData);
    }

    if (searchQuery === "") {
      setSearchResults([]);
    }
  }, [searchQuery, searchData]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <Head>
        <title>Weather App</title>
      </Head>
      <div
        className="bg-gray-800 h-screen flex flex-col justify-between bg-no-repeat bg-cover bg-scroll overflow-y-scroll bg-center relative before:fixed before:w-full before:h-full before:bg-[rgba(0,0,0,0.4)]   bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="container px-5 my-5 md:px-0 mx-auto z-10 h-full flex items-center">
          {currentWeather && (
            <div className="text-white">
              <div className="flex items-center ">
                <div className="">
                  <h1 className="text-3xl md:text-8xl">
                    {currentWeather.name}
                  </h1>
                </div>
                <div className="">
                  <WeatherIcon
                    icon={
                      currentWeather.weather && currentWeather.weather[0].icon
                    }
                    className="w-64 h-64"
                  />
                </div>
              </div>
              <div className="flex items-end text-left">
                <h1 className="md:text-6xl">{moment().format("HH:mm")}</h1>
                <span className="md:text-xl">{moment().format("A")}</span>
              </div>
              <p className="">{moment().format("dddd, MMMM Do YYYY")}</p>
            </div>
          )}

          {/* Search button */}
          <div className="absolute top-0 right-0 z-30">
            <button
              className="bg-orange-500 text-white p-10 hover:bg-orange-600"
              onClick={() => setOpenSearch(!openSearch)}
            >
              {openSearch ? (
                <CgClose className="text-2xl" />
              ) : (
                <BsSearch className="text-2xl" />
              )}
            </button>
          </div>
          <div
            className={`absolute w-full h-full top-0 right-0 max-w-lg bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg p-5 z-20 ${
              !openSearch && "hidden"
            }`}
          >
            <h1 className="text-white text-4xl py-4 font-light">Search</h1>

            <div className="mt-5">
              <form>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="w-full py-3 border border-gray-300 bg-transparent appereance-none outline-0 border-0 border-b border-b-gray-200 text-white placeholder:text-gray-200"
                    value={searchQuery}
                    placeholder="Search"
                    onChange={handleSearch}
                  />
                </div>
              </form>

              <div className="mt-5">
                {searchResults &&
                  searchResults.map((location, index) => (
                    <div
                      className="text-white hover:bg-[rgba(255,255,255,0.3)] cursor-pointer p-2"
                      key={index}
                      onClick={() => {
                        setCurrentLocation({
                          latitude: location.lat,
                          longitude: location.lon,
                        });
                        setOpenSearch(false);
                      }}
                    >
                      {location.name && `${location.name}, `}
                      {location.state && `${location.state}, `}
                      {location.country && `${location.country}`}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="text-right text-sm">
          <a
            href="https://openweathermap.org"
            className="text-white hover:text-orange-500"
          >
            <Image
              width={100}
              height={30}
              src="/ow_logo.png"
              className=" object-contain"
            />
          </a>
          {/* unsplash */}
          <a
            href="https://unsplash.com"
            className="text-white hover:text-orange-500"
          >
            <Image
              width={100}
              height={30}
              src="/unsplash_logo.svg"
              className=" object-contain"
            />
          </a>
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg ">
          <div className="px-5 md:px-0 container mx-auto">
            <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-5 py-5">
              {forecast && <ForecastList forecast={forecast} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
