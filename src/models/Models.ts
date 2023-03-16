import moment from "moment-timezone";
import { CelsiusToFahrenheitConverter, FahrenheitToCelsiusConverter } from "../weather/utils";
import { CurrentConditionType, DailyForecast, HistoryDTOType, LocationDTO, StringMapType } from "./types";

const iconSrcMap: StringMapType = {
  Sunny: 'https://cdn-icons-png.flaticon.com/512/4814/4814268.png',
  Showers: 'https://cdn-icons-png.flaticon.com/512/4088/4088981.png',
  Cloudy: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png',
  'Partly sunny': 'https://cdn-icons-png.flaticon.com/512/1163/1163763.png',
  'Intermittent clouds': 'https://cdn-icons-png.flaticon.com/512/1163/1163763.png',
  Thunderstorms: 'https://cdn-icons-png.flaticon.com/512/2864/2864448.png',
}

export class Location {
  id: string;
  name: string;
  locationKey: string;
  displayName: string;
  country: string;
  constructor(data: LocationDTO) {
    this.id = data?.AdministrativeArea?.ID;
    this.name = data?.LocalizedName;
    this.locationKey = data?.Key;
    this.displayName = `${data?.LocalizedName} (${data?.Country?.LocalizedName})`;
    this.country = data?.Country?.LocalizedName;
  }
}

export class CurrentCondition {
  temperatureFahrenheit: number | null;
  temperatureCelsius: number | null;
  humidity: number;
  wind_speed: number;
  weather_description: string;
  iconSrc: string;
  constructor(data?: CurrentConditionType) {
    this.temperatureCelsius = data?.temperature || null;
    this.temperatureFahrenheit = CelsiusToFahrenheitConverter(data?.temperature);
    this.humidity = data?.humidity || 0;
    this.wind_speed = data?.wind_speed || 0;
    this.weather_description = data?.weather_descriptions[0] || '';
    this.iconSrc = iconSrcMap[this.weather_description] ||
      'https://cdn-icons-png.flaticon.com/512/4814/4814268.png';
  }
}

export class Forecast {
  day: string;
  temperatureFahrenheit: number | null;
  temperatureCelsius: number | null;
  iconSrc: string;
  constructor(data: DailyForecast) {
    this.day = moment(data?.Date).format('ddd') || '';
    this.temperatureFahrenheit = data?.Temperature?.Maximum?.Value || null;
    this.temperatureCelsius = FahrenheitToCelsiusConverter(data?.Temperature?.Maximum?.Value);
    this.iconSrc = iconSrcMap[data?.Day?.IconPhrase] ||
      'https://cdn-icons-png.flaticon.com/512/4814/4814268.png';
  }
}


export class History {
  time: string;
  temperatureFahrenheit: number;
  temperatureCelsius: number;
  constructor(data: HistoryDTOType) {
    this.temperatureCelsius = data?.Temperature.Metric.Value;
    this.temperatureFahrenheit = data?.Temperature.Imperial.Value;
    this.time = data?.LocalObservationDateTime.substring(11, 16);;

  }
}

