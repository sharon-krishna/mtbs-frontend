import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Movie } from '../models/movie.model';


@Injectable({
  providedIn: 'root',
})
export class MovieService {
    private api = `${environment.apiUrl}/movies/`;

    constructor(private http: HttpClient){}

  getAll(){
    return this.http.get<Movie[]>(this.api)
  }
  
  create(movie: Partial<Movie>){
    return this.http.post<Movie>(this.api, movie)
  }
}
