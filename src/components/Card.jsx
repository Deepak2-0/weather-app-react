import React from "react";
import NotFoundCity from "./NotFoundCity";

const Card = ({ data }) => {
  try {
    let { main, sys, weather, wind } = data;

    let name = data.name;
    let icon = weather[0].icon;
    let temp = main.temp;
    let temp_max = main.temp_max;
    let temp_min = main.temp_min;
    let feelLike = main.feels_like;
    let humidity = main.humidity;
    let pressure = main.pressure;
    let description = weather[0].description;
    let country = sys.country;
    let speed = wind.speed;

    return (
      <div className="card">
        <h5 className="card-title">
          {name}, {country}
        </h5>
        <div className="d-flex justify-content-center">
          <img
            className="img-responsive"
            style={{ width: 100, height: 100 }}
            alt={name}
            src={`https://openweathermap.org/img/w/${icon}.png`}
          />
          <div className="temperature">
            <span>{temp}</span>
            {"\xB0C"}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="description">{description}</div>
            <div>Wind: {speed}m/s</div>
            <div>Humidity: {humidity}%</div>
            <div>Pressure: {pressure}Pa</div>
          </div>
          <div className="col-md-6">
            <div>
              Feels like: {feelLike}
              {"\xB0C"}
            </div>
            <div>
              Max: {temp_max}
              {"\xB0C"}
            </div>
            <div>
              Min: {temp_min}
              {"\xB0C"}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return <NotFoundCity />;
  }
};

export default Card;
