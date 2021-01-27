import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from '../services/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  error: boolean = false;
  errorText: string = ""
  data: any;
  cinemaHalls: any;
  cinemaHallScreens: any;
  constructor(
    private homeService: HomeService,
    public formBuilder: FormBuilder

  ) { 
    this.form = this.formBuilder.group({
      search: [''],
      time: ['']
    })
  }

  ngOnInit(): void {
  }

  // search function
  submitForm() {
      if (!this.form.value.search) {  
          this.error = true;
          this.errorText = "Please enter a movie name"
          setTimeout( ()  => {
            this.error = false;
          }, 2000)
          return false        
      }
      this.homeService.getMoviesList(this.form.get('search').value).subscribe(response => {
        this.data = response["search"]
        console.log(this.data)
      }, error => {

      })
      console.log(this.form.get('search').value)
    }

    // get halls list for movie
    getHalls(id) {
      console.log(id)
      this.homeService.getHallsList(id).subscribe(response => {
        this.cinemaHalls = response
        console.log(this.cinemaHalls)
      }, error => {

      })
    }

    getScreens(hall_id, movie_id) {
      console.log(hall_id, movie_id)
      this.homeService.getScreensList(hall_id, movie_id).subscribe(response => {
        this.cinemaHallScreens = response["response"]
        console.log(this.cinemaHallScreens)
      }, error => {

      })
    }

    bookingDetails(MovieScreenTime_id, movie_screens_id, screen_id) {
      localStorage.setItem('movieScreenTimeId', MovieScreenTime_id)
      localStorage.setItem('movieScreensId', movie_screens_id)
      localStorage.setItem('screenId', screen_id)
    }
}
