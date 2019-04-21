import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  apiKey = environment.apiKey;
  apiUrl = environment.apiUrl;
  url = `/top-headlines?country=ar&apiKey=${this.apiKey}`;
  headers = new HttpHeaders();
  headlLinesPage = 0;
  categoriaActual = 'business';
  constructor( private http: HttpClient ) {}

  private getQuery ( query?: string ) {
    return this.http
    .get<RespuestaTopHeadlines>( `${this.apiUrl}${this.url}${query ? ('&category=' + query) : '' }&page=${this.headlLinesPage}`);
  }

  getTopHeadLines() {
    this.headlLinesPage++;
    return this.getQuery( );
  }

  getTopHeadLinesCategoria( categoria: string ) {
    if ( categoria === this.categoriaActual ) {
      this.headlLinesPage++;
      return this.getQuery(`${categoria}`);

    } else {
      this.headlLinesPage = 0;
      this.categoriaActual = categoria;
      return this.getQuery(`${categoria}`);
    }
  }
}
