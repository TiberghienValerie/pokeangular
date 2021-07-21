import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email!: string;
  public password!: string;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) {

  }



  ngOnInit(): void {
    if (localStorage.hasOwnProperty('access_token')) {
      this.router.navigate(['']);
    }
  }

  submit(): void {
    if (
      0 !== this.email.trim().length &&
      0 !== this.password.trim().length
    ) {
      this.httpClient.post<{token: string}>('https://localhost:8000/authentication_token', {
        email: this.email,
        password: this.password,
      }).subscribe((data) => {
        localStorage.setItem('access_token', data.token);
        this.router.navigate(['']);
      });
    }
  }
}
