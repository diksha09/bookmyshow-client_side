import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  form: FormGroup;
  emailError: boolean = false;
  emailErrorText: string = "";
  firstNameError: boolean = false;
  firstNameErrorText: string = "";
  lastNameError: boolean = false;
  lastNameErrorText: string = "";
  phoneNumberError: boolean = false;
  phoneNumberErrorText: string = "";
  seatsError: boolean = false;
  seatsErrorText: string = "";
  success: boolean = false;
  error: boolean = false;
  errorText: string = "";
  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService
  ) { 
    this.form = this.formBuilder.group({
      email: [''],
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      seats: ['']
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    localStorage.clear()
  }

  submitForm() {
    if (!this.form.value.email) {
      this.emailError = true;
          this.emailErrorText = "Please enter your email address"
          setTimeout( ()  => {
            this.emailError = false;
            this.emailErrorText = "";
          }, 2000)
          return false 
    }
    if (this.form.value.email) {
      var pattern = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/);
      if (!pattern.test(this.form.value.email)) {
        this.emailError = true;
          this.emailErrorText = "Please enter valid email address"
          setTimeout( ()  => {
            this.emailError = false;
            this.emailErrorText = "";
          }, 2000)
          return false 
      }
    }

    if (!this.form.value.firstName) {
      this.firstNameError = true;
          this.firstNameErrorText = "Please enter your first name"
          setTimeout( ()  => {
            this.firstNameError = false;
            this.firstNameErrorText = "";
          }, 2000)
          return false 
    }
    if (!this.form.value.lastName) {
      this.lastNameError = true;
          this.lastNameErrorText = "Please enter your last name"
          setTimeout( ()  => {
            this.lastNameError = false;
            this.lastNameErrorText = "";
          }, 2000)
          return false 
    }
    console.log(this.form.value.phoneNumber.length)
    if (!this.form.value.phoneNumber) {
      this.phoneNumberError = true;
          this.phoneNumberErrorText = "Please enter your phone number"
          setTimeout( ()  => {
            this.phoneNumberError = false;
            this.phoneNumberErrorText = "";
          }, 2000)
          return false 
    }
    if (this.form.value.phoneNumber.length < 10) {
      this.phoneNumberError = true;
          this.phoneNumberErrorText = "Please enter valid phone number"
          setTimeout( ()  => {
            this.phoneNumberError = false;
            this.phoneNumberErrorText = "";
          }, 2000)
          return false 
    }
    if (this.form.value.seats <= 0) {
      this.seatsError = true;
          this.seatsErrorText = "Please select at least one seat"
          setTimeout( ()  => {
            this.seatsError = false;
            this.seatsErrorText = "";
          }, 2000)
          return false 
    }
    let email = this.form.get('email').value;
    let firstName = this.form.get('firstName').value;
    let lastName = this.form.get('lastName').value;
    let phoneNumber = this.form.get('phoneNumber').value;
    let seats = this.form.get('seats').value;
    let movieScreenTimeId = localStorage.getItem('movieScreenTimeId')
    let movieScreensId = localStorage.getItem('movieScreensId')
    let screenId = localStorage.getItem('screenId') 
    this.homeService.createBooking(email, firstName, lastName, phoneNumber, seats, movieScreenTimeId, movieScreensId, screenId).subscribe(response => {
      this.success = true;
    }, responseError => {
      this.error = true;
      this.errorText = responseError
    })
  }

}
