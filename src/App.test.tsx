import { render } from '@testing-library/react';
import Weather from './weather'
import WeatherService from './services/WeatherService'

describe('renders Weather component', () => {
  it('renders City-Autocomplete', () => {
    render(<Weather />);
  })

  it('getLocationByGeoposition() should return value', () => {
    expect(WeatherService.getLocationByGeoposition(40.1793153, 44.5199719)).not.toBeUndefined();
  });

  it('getLocationsList() should return value', () => {
    expect(WeatherService.getLocationsList('Yerevan')).not.toBeUndefined();
  });

  it('getCurrentConditions() should return value', () => {
    expect(WeatherService.getLocationsList('Yerevan')).not.toBeUndefined();
  });

  it('getForecasts() should return value', () => {
    expect(WeatherService.getForecasts('16890')).not.toBeUndefined();
  });

  it('getHistoryList() should return value', () => {
    expect(WeatherService.getHistoryList('16890')).not.toBeUndefined();
  });
})


