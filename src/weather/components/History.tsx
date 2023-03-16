import { useEffect, useState } from "react";
import { History, Location } from "../../models/Models";
import { AreaChart, XAxis, YAxis, CartesianGrid, Area, ResponsiveContainer } from 'recharts'
import WeatherService from "../../services/WeatherService";

function HistoryChart({ selectedLocation, showInCelsiuses }:
  {
    selectedLocation: Location | null;
    showInCelsiuses: boolean;
  }): JSX.Element {

  const [historyList, setHistoryList] = useState<History[]>([])

  const getForecasts = async () => {
    const responce = await WeatherService.getHistoryList(selectedLocation?.locationKey);
    if (!responce) return;
    setHistoryList(responce)
  }

  useEffect(() => {
    if (!selectedLocation) return
    getForecasts();
  }, [selectedLocation])

  return <ResponsiveContainer width="100%" height={200}>
    <AreaChart data={historyList}>
      <Area dataKey={showInCelsiuses ? 'temperatureCelsius' : 'temperatureFahrenheit'} stroke="#002882" fill="#2451B7" opacity={0.5} />

      <CartesianGrid opacity={0.3} vertical={false} />
      <XAxis
        dataKey="time"
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tickCount={8}
        dataKey={showInCelsiuses ? 'temperatureCelsius' : 'temperatureFahrenheit'}
      />
    </AreaChart>
  </ResponsiveContainer >
}


export default HistoryChart