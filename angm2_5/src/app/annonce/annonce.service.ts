import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Annonce } from './annonce';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  static URL = 'http://127.0.0.1:5000/annonces';

  httpOption = {
    headers: new HttpHeaders({ accept: 'application/json'})
    };

  constructor(
    // tslint:disable-next-line:variable-name
    private _http: HttpClient
  ) {

  }

  getAnnonces(): Observable<any> {
    return this._http.get<any>(AnnonceService.URL);
  }

  getAnnonceById(id: number): Observable<any> {
    return this._http.get<any>(`${AnnonceService.URL}/${id}`);
  }

  addAnnonce(annonce: Annonce): Observable<any> {
    return this._http.post<any>(AnnonceService.URL, {
      nomProduit: annonce.nomProduit,
      description: annonce.description,
      prix: annonce.prix,
      categorie: annonce.categorie? annonce.categorie.id : null
    });
  }

  editAnnonce(id: number, annonce: Annonce): Observable<any> {
    return this._http.put<any>(`${AnnonceService.URL}/${id}`, {
      nomProduit: annonce.nomProduit,
      description: annonce.description,
      prix: annonce.prix,
      categorie: annonce.categorie? annonce.categorie.id : null
    });
  }

  deleteAnnonce(id: number): Observable<any> {
    return this._http.delete<any>(`${AnnonceService.URL}/${id}`);
  }

}
