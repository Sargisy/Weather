export type LocationDTO = {
  AdministrativeArea: { ID: string, LocalizedName: string };
  Country: { ID: string, LocalizedName: string };
  Key: string;
  LocalizedName: string;
  Rank: number;
  Type: string;
  Version: number;
}

export type DailyForecast = {
  Date: Date;
  Day: { HasPrecipitation: boolean, Icon: number, IconPhrase: string };
  EpochDate: number;
  Link: string;
  MobileLink: string;
  Night: { HasPrecipitation: boolean, Icon: number, IconPhrase: string };
  Sources: string[];
  Temperature: { Maximum: { Value: number, Unit: string, UnitType: number }, Minimum: { Value: number, Unit: string, UnitType: number } };
}

export type Headline = {
  Category: string;
  EffectiveDate: Date;
  EffectiveEpochDate: number;
  EndDate: Date;
  EndEpochDate: number;
  Link: string;
  MobileLink: string
  Severity: number
  Text: string
}



export type ForecastsDTO = {
  DailyForecasts: DailyForecast[];
  Headline: Headline;
}


export type CurrentConditionType = {
  cloudcover: number;
  feelslike: number;
  humidity: number;
  is_day: string;
  observation_time: string;
  precip: number;
  pressure: number;
  temperature: number;
  uv_index: number;
  visibility: number;
  weather_code: number;
  weather_descriptions: string[];
  weather_icons: string[];
  wind_degree: number;
  wind_dir: string;
  wind_speed: number;
}


export type HistoryDTOType = {
  EpochTime: number;
  HasPrecipitation: boolean;
  IsDayTime: boolean;
  Link: string;
  LocalObservationDateTime: string;
  MobileLink: string;
  Temperature: { Imperial: { Value: number, Unit: string, UnitType: number }, Metric: { Value: number, Unit: string, UnitType: number } };
  WeatherText: string;
}

export type StringMapType = {
  [key: string]: string;
};