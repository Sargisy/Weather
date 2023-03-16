import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CurrentCondition, Location } from "../../models/Models";
import WeatherService from "../../services/WeatherService";

function CurrentConditions({ selectedLocation, showInCelsiuses }:
  {
    selectedLocation: Location | null;
    showInCelsiuses: boolean;
  }): JSX.Element {

  const [conditions, setConditions] = useState<CurrentCondition>();

  const getCurrentConditions = async () => {
    const responce = await WeatherService.getCurrentConditions(selectedLocation?.name);

    setConditions(responce)
  }

  useEffect(() => {
    if (!selectedLocation) return
    getCurrentConditions();
  }, [selectedLocation]);




  return <>
    {
      conditions &&
      <Grid container >

        <Grid container justifyContent='center'>
          <Typography variant="h4">{`${selectedLocation?.name}, ${selectedLocation?.country}`}</Typography>
        </Grid>

        <Grid container sx={{ marginTop: '20px' }} justifyContent='space-around' alignItems='center'>

          <Grid >
            <img loading="lazy" src={conditions?.iconSrc} alt='' height='100px' />
            <Typography sx={{ marginTop: '20px', textAlign: 'center' }}
              variant="h6">{conditions?.weather_description}</Typography>
          </Grid>

          <Grid>
            <Grid container>
              <Typography sx={{ textAlign: 'center' }}
                variant="h3">{showInCelsiuses ? conditions?.temperatureCelsius : conditions?.temperatureFahrenheit}</Typography>
              <Typography sx={{ marginBottom: '20px', marginLeft: '5px' }} variant="h6" >o</Typography>
              <Typography variant="h3">{showInCelsiuses ? 'C' : 'F'}</Typography>
            </Grid>
          </Grid>

          <Grid >
            <Typography sx={{ marginTop: '20px' }} variant="h6">{`Wind speed: ${conditions?.wind_speed} kmph`}</Typography>
            <Typography sx={{ marginTop: '20px' }} variant="h6">{`Humidity: ${conditions?.humidity}%`}</Typography>
          </Grid>

        </Grid>
      </Grid>
    }
  </>
}


export default CurrentConditions;