import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, signal } from '@angular/core';

import { MovieService } from '../../../../core/services/movie.service';
import { Movie } from '../../../../core/models/movie.model';


@Component({
  selector: 'app-movie-list',
  imports: [ReactiveFormsModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList {
  movies = signal<Movie[]>([]);
  
  form: FormGroup;
  
  constructor(private fb: FormBuilder,private movieService: MovieService) {
    this.form = this.fb.group({
    title: ['', Validators.required],
    duration_minutes: [0, Validators.required],
    language: ['', Validators.required],
  });
  
  this.load();
  }
  
  load() {
    this.movieService.getAll().subscribe(
      res => this.movies.set(res)
    );
  }
  
  create() {
    if (this.form.invalid) return;

    this.movieService.create(this.form.value).subscribe(() => {
      this.form.reset();
      this.load();
    });
  }
}
