/** Open-Meteo current weather response containing the measured temperature. */
export interface OpenMeteoResponse {
  current?: {
    temperature_2m?: number;
  };
}
