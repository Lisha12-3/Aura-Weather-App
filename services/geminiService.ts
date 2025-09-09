
import { GoogleGenAI, Type } from "@google/genai";
import type { WeatherData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const weatherSchema = {
  type: Type.OBJECT,
  properties: {
    city: { type: Type.STRING, description: "The name of the city." },
    country: { type: Type.STRING, description: "The country of the city." },
    currentWeather: {
      type: Type.OBJECT,
      properties: {
        temperature: { type: Type.NUMBER, description: "Current temperature in Celsius." },
        condition: { type: Type.STRING, description: "Brief weather condition, e.g., 'Sunny', 'Cloudy', 'Rainy'." },
        humidity: { type: Type.NUMBER, description: "Humidity percentage." },
        windSpeed: { type: Type.NUMBER, description: "Wind speed in km/h." },
        icon: { type: Type.STRING, description: "An icon name from this list: 'SUNNY', 'CLOUDY', 'RAINY', 'SNOWY', 'WINDY', 'PARTLY_CLOUDY', 'THUNDERSTORM'." }
      },
      required: ["temperature", "condition", "humidity", "windSpeed", "icon"]
    },
    forecast: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING, description: "Day of the week." },
          temperature: { type: Type.NUMBER, description: "Forecasted average temperature in Celsius." },
          condition: { type: Type.STRING, description: "Forecasted weather condition." },
          icon: { type: Type.STRING, description: "An icon name from this list: 'SUNNY', 'CLOUDY', 'RAINY', 'SNOWY', 'WINDY', 'PARTLY_CLOUDY', 'THUNDERSTORM'." }
        },
        required: ["day", "temperature", "condition", "icon"]
      }
    }
  },
  required: ["city", "country", "currentWeather", "forecast"]
};

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const prompt = `You are a weather data provider. For the city "${city}", provide the current weather and a 5-day forecast. Respond ONLY with a JSON object that adheres to the provided schema. The forecast should start from tomorrow. Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: weatherSchema,
      },
    });

    const jsonString = response.text.trim();
    const weatherData: WeatherData = JSON.parse(jsonString);
    return weatherData;

  } catch (error) {
    console.error("Error fetching weather data:", error);
    if (error instanceof Error && error.message.includes('429')) {
      throw new Error("API rate limit exceeded. Please try again later.");
    }
    throw new Error("Could not fetch weather data. Please check the city name and try again.");
  }
};
