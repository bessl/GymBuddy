import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { GYMBUDDY_API_CONGIG } from './secrets';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  authToken = new BehaviorSubject('');

  constructor(private http: HttpClient) {
  }

  refreshToken() {
      this.http.post<{ access_token: string }>(GYMBUDDY_API_CONGIG.authUrl, {
            client_id: GYMBUDDY_API_CONGIG.clientId,
            client_secret: GYMBUDDY_API_CONGIG.clientSecret,
            audience: GYMBUDDY_API_CONGIG.audience,
            grant_type: GYMBUDDY_API_CONGIG.grantType
          }
          , {headers: new HttpHeaders().set('content-type', 'application/json')}
      ).subscribe(d => {
        this.authToken.next(d.access_token);
      });
  }

}
