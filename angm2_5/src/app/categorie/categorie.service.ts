import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Categorie } from './categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  static URL = 'http://127.0.0.1:5000/categories';
  httpOption = {
    headers: new HttpHeaders({ accept: 'application/json'})
  };

  constructor(
    // tslint:disable-next-line:variable-name
    private _http: HttpClient
  ) { }

  getCategories(): Observable<any> {
    return this._http.get<any>(CategorieService.URL);
  }

  getCategorieById(id: number): Observable<any> {
    return this._http.get<any>(`${CategorieService.URL}/${id}`);
  }

  addCategorie(categorie: Categorie): Observable<any> {
    return this._http.post<any>(CategorieService.URL, {
      nomCategorie: categorie.nomCategorie
    });
  }

  editCategorie(id: number, categorie: Categorie): Observable<any> {
    return this._http.put<any>(`${CategorieService.URL}/${id}`, {
      nomCategorie: categorie.nomCategorie
    });
  }

  deleteCategorie(id: number): Observable<any> {
    return this._http.delete<any>(`${CategorieService.URL}/${id}`);
  }

  /*getAnnoncesByCategorie(id: number): Observable<any> {
    return this._http.get<any>(`${CategorieService.URL}/${id}/`);
  }*/
}
