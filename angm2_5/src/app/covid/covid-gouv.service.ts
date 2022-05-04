import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidGouvService {

  static URL = 'https://coronavirusapi-france.now.sh/FranceLiveGlobalData';

  constructor(private _http: HttpClient) { }

  getCovid(): Observable<any> {
    return this._http.get<any>(CovidGouvService.URL);
  }
}
