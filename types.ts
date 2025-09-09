
export interface CurrentWeather {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface ForecastItem {
  day: string;
  temperature: number;
  condition: string;
  icon: string;
}

export interface WeatherData {
  city: string;
  country: string;
  currentWeather: CurrentWeather;
  forecast: ForecastItem[];
}
