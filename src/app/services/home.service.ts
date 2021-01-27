import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url = 'http://localhost:8000/'
  constructor( private http: HttpClient) { }
  getMoviesList(searchitem) {
    return this.http.post(this.url + 'movie_search', {searchitem} ).pipe(catchError(this.errorHandler));
  }

  getHallsList(movie_id) {
    return this.http.post(this.url + 'cinema_hall_list', {movie_id}).pipe(catchError(this.errorHandler))
  }

  getScreensList(cinema_halls_id, movie_id) {
    return this.http.post(this.url + 'cinema_hall_screens_list', {cinema_halls_id, movie_id}).pipe(catchError(this.errorHandler))
  }

  createBooking(email, first_name, last_name, phone, seats_booking, MovieScreenTime_id, movie_screens_id, screen_id) {
    return this.http.post(this.url + 'booking', {email, first_name, last_name, phone, seats_booking, MovieScreenTime_id, movie_screens_id, screen_id}).pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error.error.message || 'Server not responding')
  }
}
