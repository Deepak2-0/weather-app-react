import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Card from "./Card";
import PaginationComponent from "./PaginationComponent";
import cities from "./../data/cities";
import Keys from "./../Keys";

const API_KEY =Keys();

const Home = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    citiesPerPage: 5,
  });

  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [showCities, setShowCities] = useState(true);
  const [searchedCityData, setSearchedCityData] = useState("");
  const [count,setCount] = useState(0); //to fix the bug which occurs when show is false and clicked again, useState is not
  //is not again fetching the weather happens when user first try with a wrong spelling of a place and then
  //try to modify it but not prior to this first had to empty the search and then type the place

  const { citiesPerPage } = pagination;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(cities.length / citiesPerPage); i++) {
    pageNumbers.push(i);
  }

  const fetchWeather = async () => {
    const weatherOf5Cities = [];
    try {
      setLoading(true);

      for (let i = 0; i < city.length; i++) {
        const url = `https://api.openweathermap.org/data/2.5/find?q=${city[i]}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        const newCurrentWeather = await response.json();
        //console.log(newCurrentWeather);
        weatherOf5Cities.push(newCurrentWeather);
      }
      setLoading(false);
      setWeather(weatherOf5Cities);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const fetchWeatherOfSingleCity = async (searchCity) => {
    const url = `https://api.openweathermap.org/data/2.5/find?q=${searchCity}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const newCurrentWeather = await response.json();
    setSearchedCityData(newCurrentWeather.list[0]);
  };

  useEffect(() => {
    const { currentPage, citiesPerPage } = pagination;
    const indexOfLastCity = currentPage * citiesPerPage;
    const indexOfFirstCity = indexOfLastCity - citiesPerPage;
    const currentCities = cities.slice(indexOfFirstCity, indexOfLastCity);
    setCity(currentCities);
  }, [pagination]);

  useEffect(() => {
    fetchWeather();
  }, [city]);

  useEffect(() => {
    if (!showCities) {
      fetchWeatherOfSingleCity(searchCity);
    }
  }, [showCities,count]);

  const handleSearchCity = (event) => {
    //console.log("searching");

    if (event.target.value < 1) setShowCities(true);
    setSearchCity(() => {
      return event.target.value;
    });
  };

  const findWeatherOfSearchedCity = (event) => {
    event.preventDefault();
    if(searchCity.length === 0){
      setSearchedCityData(true);
      return;
    }
    setShowCities(false);
    setCount(count+1);
  };

  const handlePageNumber = (event) => {
    let pageNumber = Number(event.target.id);

    if (pageNumber === pagination.currentPage) return;
    setPagination((prevValues) => {
      return {
        ...prevValues,
        currentPage: pageNumber,
      };
    });
  };

  return (
    <>
      <div className="container">
        <header className="mt-2">
          <div className="title">
            <h2 className="underline">Weather App</h2>
          </div>
        </header>
        <main>
          <section className="col-md-12">
            <form className="d-flex justify-content-center form-group">
              <input
                type="text"
                className="form-control"
                onChange={handleSearchCity}
                value={searchCity}
                placeholder="Enter city"
              />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={findWeatherOfSearchedCity}
              >
                Enter
              </button>
            </form>
          </section>

          {!showCities ? (
            <section className="row m-0">
              <div className="col-md-6 cities-weather">
                <Card data={searchedCityData} />
              </div>
            </section>
          ) : loading ? (
            <section>
              <Loading />
            </section>
          ) : (
            <section className="row m-0">
              <div className="col-md-6 cities-weather">
                {weather.map((data, index) => (
                  <Card key={index} data={data.list[0]} />
                ))}
              </div>
            </section>
          )}
        </main>
        {showCities && (
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <PaginationComponent
                key={number}
                number={number}
                handlePageNumber={handlePageNumber}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Home;
