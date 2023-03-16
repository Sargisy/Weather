import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Forecast, Location } from "../../models/Models";
import WeatherService from "../../services/WeatherService";

function Forecastes({ selectedLocation, showInCelsiuses }:
  {
    selectedLocation: Location | null;
    showInCelsiuses: boolean;
  }): JSX.Element {

  const [forecastes, setForecastes] = useState<Forecast[]>([])

  const getForecasts = async () => {
    const responce = await WeatherService.getForecasts(selectedLocation?.locationKey);
    if (!responce) return;
    setForecastes(responce)
  }

  useEffect(() => {
    if (!selectedLocation) return
    getForecasts();
  }, [selectedLocation])


  const renderForcast = (forcast: Forecast, index: number): JSX.Element => {
    return (
      <Grid sx={{ marginTop: '30px' }} textAlign='center' key={`forcast-${index}`} >
        <Typography sx={{ marginTop: '10px', color: '#16394c' }} variant="h6">{forcast.day}</Typography>
        <Grid sx={{ marginTop: '10px', textAlign: 'center' }}>
          <img loading="lazy" src={forcast.iconSrc} alt='' height='30px' width='30px' />
        </Grid>
        <Grid container>
          <Typography sx={{ marginTop: '10px' }} variant="h6">{showInCelsiuses ? forcast.temperatureCelsius : forcast.temperatureFahrenheit}</Typography>

          <Typography sx={{ marginTop: '10px', fontSize: '10px', marginLeft: '5px' }}>o</Typography>

          <Typography sx={{ marginTop: '10px' }} variant="h6">{showInCelsiuses ? 'C' : 'F'}</Typography>

        </Grid>
      </Grid>
    );
  }

  return !forecastes?.length ? <></> :
    <Grid container justifyContent='space-around'>
      {forecastes.map((forecast: Forecast, index: number) => renderForcast(forecast, index))}
    </Grid>
}


export default Forecastes