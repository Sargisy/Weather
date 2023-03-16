import { CurrentCondition, Forecast, History, Location } from "../models/Models";
import { DailyForecast, ForecastsDTO, HistoryDTOType, LocationDTO } from "../models/types";

const dataserviceApikey = 'rPY7xIEeNWSMUUNBitoxA3YgZu4WaWTy';
const weatherstackApikey = 'c690452c4eccc48776c4c0cddbc7fe89';

export abstract class ComposedError {
  readonly message!: string | Error;
  readonly error!: Error;
  abstract handleGlobally(): void;
  abstract getError(): Error;
  abstract getStatusCode(): number | null | undefined;
}


class WeatherService {

  static async getLocationByGeoposition(
    latitude: number,
    longitude: number,
  ): Promise<Location | undefined> {
    try {
      const res = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${dataserviceApikey}&q=${latitude},${longitude}`);
      if (!res.ok) return;

      const data = await res.json();
      return new Location(data);

    } catch (error) {
      alert('Something went wrong. Please try again');

      return;
    }
  }

  static async getLocationsList(
    search?: string,
  ): Promise<Location[] | undefined> {
    try {
      const res = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${dataserviceApikey}&q=${search}`
      );
      if (!res.ok) return;


      const data = await res.json();
      return data?.map((item: LocationDTO) => new Location(item))

    } catch (error) {
      alert('Something went wrong. Please try again');

      return;
    }
  }



  static async getCurrentConditions(
    location?: string,
  ): Promise<CurrentCondition | undefined> {
    try {

      const res = await fetch(`http://api.weatherstack.com/current?access_key=${weatherstackApikey}&query=${location}`);
      if (!res.ok) {
        alert('Something went wrong. Please try again');
        return
      };


      const data = await res.json();
      if (!data) return
      return new CurrentCondition(data.current);


    } catch (error) {
      alert('Something went wrong. Please try again');

      return;
    }
  }



  static async getForecasts(
    locationKey?: string,
  ): Promise<Forecast[] | undefined> {
    try {

      const res = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${dataserviceApikey}`);

      if (!res.ok) return;


      const data: ForecastsDTO = await res.json();
      return data?.DailyForecasts?.map((item: DailyForecast) => new Forecast(item))

    } catch (error) {
      alert('Something went wrong. Please try again');
      return;
    }
  }

  static async getHistoryList(
    locationKey?: string,
  ): Promise<History[] | undefined> {
    try {

      const res = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}/historical/24?apikey=${dataserviceApikey}`);
      if (!res.ok) return;


      const data: HistoryDTOType[] = await res.json();
      if (!data.length) return
      return data?.map((item: HistoryDTOType) => new History(item))


    } catch (error) {
      alert('Something went wrong. Please try again');

      return;
    }
  }
}

export default WeatherService

