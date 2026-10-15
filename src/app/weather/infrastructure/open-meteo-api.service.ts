import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdventureCamp } from '../../adventure-camps/domain/model/adventure-camp.entity';
import { OpenMeteoResponse } from '../domain/model/current-weather.entity';

/** Retrieves the current temperature of a camp from Open-Meteo. */
@Injectable({ providedIn: 'root' })
export class OpenMeteoApiService {
  private readonly http = inject(HttpClient);

  currentTemperature(camp: AdventureCamp): Observable<number> {
    const params = new HttpParams()
      .set('latitude', String(camp.latitude))
      .set('longitude', String(camp.longitude))
      .set('current', 'temperature_2m');

    return this.http.get<OpenMeteoResponse>(environment.weatherApiUrl, { params }).pipe(
      map(response => {
        const temperature = response.current?.temperature_2m;
        if (typeof temperature !== 'number' || !Number.isFinite(temperature)) {
          throw new Error('Current temperature is not available');
        }
        return temperature;
      }),
    );
  }
}
