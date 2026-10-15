import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdventureCamp } from '../domain/model/adventure-camp.entity';
import { AdventureCampAssembler } from './adventure-camp.assembler';
import { AdventureCampResource } from './adventure-camp.resource';

/** Retrieves adventure camps from the local json-server API. */
@Injectable({ providedIn: 'root' })
export class AdventureCampsApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiBaseUrl}/adventure-camps`;

  list(): Observable<AdventureCamp[]> {
    return this.http.get<AdventureCampResource[]>(this.endpoint).pipe(
      map(resources => resources.map(AdventureCampAssembler.toEntity)),
    );
  }
}
