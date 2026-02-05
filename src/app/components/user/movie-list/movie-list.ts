import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

import { MovieService } from '../../../core/services/movie.service';
import { Movie } from '../../../core/models/movie.model';


@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList {
movies = signal<Movie[]>([]);

constructor(private movieService: MovieService,private router: Router) {
    this.loadMovies();
  }
loadMovies() {
    this.movieService.getAll().subscribe(res => {
      this.movies.set(res.filter(m => m.status === 'ACTIVE'));
    });
  }

  viewShows(movieId: number) {
    this.router.navigate(['/movies', movieId, 'shows']);
  }
}
