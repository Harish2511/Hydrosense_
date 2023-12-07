// Arima.js

import ARIMA from 'arima';

export const forecastArima = (data, selectedDate) => {
  // Extract relevant data for the selected date
  const selectedDateData = data.filter(
    (item) => item.Date === selectedDate.toISOString().split('T')[0]
  );

  // Perform ARIMA-based time series analysis
  // For demonstration purposes, let's use a basic ARIMA model
  const arimaData = selectedDateData.map((item, index) => ({
    time: item.Time,
    value: tankHeight - item.Distance, // Adjusted for tank height
  }));

  const arimaModel = new ARIMA(arimaData.map((item) => item.value));
  const forecast = arimaModel.predictNext();

  // Map the forecast results back to the original time slots
  const arimaForecast = arimaData.map((item, index) => ({
    time: item.time,
    forecast: index < arimaData.length - 1 ? forecast[index] : null,
  }));

  return arimaForecast;
};
