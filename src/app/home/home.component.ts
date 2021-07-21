import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { RetourApi } from '../models/retourApi';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public tabPokemons!: [];

  getPokemons(): Promise<RetourApi<[]>> {
    return this.http
      .get('https://localhost:8000/api/pokemon?page=1')
      .toPromise()
      .then(
        (obj: any) => {
          return {
            statut: 'OK',
            data: obj['hydra:member'],
          };
        },
        () => {
          return { statut: 'KO' };
        }
      );
  }


  constructor(private router: Router, private http: HttpClient) {
    if (localStorage.hasOwnProperty('access_token')) {
      this.getPokemons().then(retourApi => {
        if (retourApi.data) {
          this.tabPokemons = retourApi.data;
        }
      });



    }else{
      this.router.navigate(['/login']);
    }

  }

  ngOnInit(): void {

  }

}
