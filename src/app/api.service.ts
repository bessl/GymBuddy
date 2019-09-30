import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {GYMBUDDY_API_CONGIG} from './secrets';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  authToken = new BehaviorSubject('');

  constructor(private http: HttpClient) {
  }

  refreshToken() {
    const timeNow = new Date().getTime();
    const ApiLocaleStore = localStorage.getItem('apiAccessToken');

    if (!ApiLocaleStore || JSON.parse(ApiLocaleStore).expiresAt < timeNow) {
      this.http.post<{ access_token: string, expires_in: number }>(GYMBUDDY_API_CONGIG.authUrl, {
        client_id: GYMBUDDY_API_CONGIG.clientId,
        client_secret: GYMBUDDY_API_CONGIG.clientSecret,
        audience: GYMBUDDY_API_CONGIG.audience,
        grant_type: GYMBUDDY_API_CONGIG.grantType
      }
      , {headers: new HttpHeaders().set('content-type', 'application/json')}
      ).subscribe(d => {
        localStorage.setItem('apiAccessToken', JSON.stringify({
          expiresAt: timeNow + d.expires_in * 100,
          accessToken: d.access_token
        }));
        this.authToken.next(d.access_token);
      });
    } else {
      this.authToken.next(JSON.parse(ApiLocaleStore).accessToken);
    }
  }

}
