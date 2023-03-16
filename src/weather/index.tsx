import { Autocomplete, debounce, Grid, TextField, Box, ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { Location } from "../models/Models";
import WeatherService from '../services/WeatherService'
import CurrentConditions from "./components/CurrentConditions";
import Forecastes from "./components/Forecastes";
import History from "./components/History";


export default function Weather(): JSX.Element {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showInCelsiuses, setShowInCelsiuses] = useState<boolean>(true);

  const getLocationByGeoposition = async (latitude: number, longitude: number) => {
    const responce = await WeatherService.getLocationByGeoposition(latitude, longitude);
    if (!responce) return;
    setSelectedLocation(responce);
  }

  useEffect(() => {
    if (!navigator || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(function (position) {
      if (!position.coords.latitude || !position.coords.longitude) return;
      getLocationByGeoposition(position.coords.latitude, position.coords.longitude)
    });
  }, [])


  const changeHandler = async (event: SyntheticEvent<Element, Event>, value?: string) => {
    if (!value?.length) return;
    const responce = await WeatherService.getLocationsList(value);
    if (responce) setLocations(responce);
  }

  const debouncedChangeHandler = useMemo(() => {
    return debounce(changeHandler, 400);
  }, []);

  const valueChangeHandler = async (event: SyntheticEvent<Element, Event>, value: Location | null) => {
    setSelectedLocation(value || null)
  }


  return <>
    <Box sx={{ width: '100%', height: '100%', marginTop: '50px', }}>

      <Grid container justifyContent="center" >

        <Grid container justifyContent="center">
          <Grid>
            <Autocomplete
              id="City-Autocomplete"
              sx={{ minWidth: '300px', maxWidth: '400px' }}
              open={!!locations.length}
              onChange={valueChangeHandler}
              popupIcon={null}
              isOptionEqualToValue={(option, value) => option.displayName === value.displayName}
              getOptionLabel={(location) => location.displayName}
              options={locations}
              onInputChange={(event, newValue) => debouncedChangeHandler(event, newValue)}
              value={selectedLocation}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  type={'text'}

                />
              )}
            />
            {!selectedLocation && <Typography sx={{ marginTop: '10px', fontSize: '12px', marginLeft: '5px' }}>Please enter a location name.</Typography>}
          </Grid>

        </Grid>

        {selectedLocation &&
          <Box sx={{
            margin: '50px', border: '3px solid #608094',
            borderRadius: '5px', width: 'calc(100% - 100px)', padding: '30px'
          }}>
            <ToggleButtonGroup
              color="primary"
              value={showInCelsiuses}
              exclusive
              onChange={(event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => setShowInCelsiuses(value)}
              aria-label="Platform"
              sx={{ height: '50px' }}
            >
              <ToggleButton value={true}>
                <Grid container alignContent='center'>
                  <Typography sx={{ marginTop: '10px', color: '#16394c', fontSize: '10px', marginLeft: '5px' }}>o</Typography>

                  <Typography sx={{ marginTop: '10px', color: '#16394c' }} variant="h6">C</Typography>
                </Grid>
              </ToggleButton>
              <ToggleButton value={false}>
                <Grid container>
                  <Typography sx={{ marginTop: '10px', color: '#16394c', fontSize: '10px', marginLeft: '5px' }}>o</Typography>

                  <Typography sx={{ marginTop: '10px', color: '#16394c' }} variant="h6">F</Typography>
                </Grid>
              </ToggleButton>
            </ToggleButtonGroup>

            <CurrentConditions selectedLocation={selectedLocation} showInCelsiuses={showInCelsiuses} />
            <Box sx={{ marginTop: '30px' }}>
              <Forecastes selectedLocation={selectedLocation} showInCelsiuses={showInCelsiuses} />
            </Box>
            <Box sx={{ marginTop: '30px' }}>
              <History selectedLocation={selectedLocation} showInCelsiuses={showInCelsiuses} />
            </Box>
          </Box>
        }

      </Grid>
    </Box>
  </>
}