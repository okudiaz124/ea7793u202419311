import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdventureCamp } from '../domain/model/adventure-camp.entity';

/** Retrieves adventure camps from the local json-server API. */
@Injectable({ providedIn: 'root' })
export class AdventureCampsApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiBaseUrl}/adventure-camps`;

  list(): Observable<AdventureCamp[]> {
    return this.http.get<AdventureCamp[]>(this.endpoint);
  }
}
