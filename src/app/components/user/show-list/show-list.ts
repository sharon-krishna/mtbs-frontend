import { ActivatedRoute, Router } from '@angular/router';
import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ShowService } from '../../../core/services/show.service';
import { Show } from '../../../core/models/show.model';


@Component({
  selector: 'app-show-list',
  imports: [DatePipe],
  templateUrl: './show-list.html',
  styleUrl: './show-list.css',
})
export class ShowList {
shows = signal<Show[]>([]);
  movieId!: number;

  constructor(
    private route: ActivatedRoute,
    private showService: ShowService,
    private router: Router
  ) {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadShows();
  }

  loadShows() {
    this.showService.getShowsByMovie(this.movieId).subscribe(res => {
      this.shows.set(res);
    });
  }

  selectSeats(showId: number) {
    this.router.navigate(['/shows', showId, 'seats']);
  }
}
