import { Component } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Person } from './models/definitions';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  response: Person | undefined;

  constructor(
    private readonly http: HttpClient
  ) {}

  onClick() {
    this.http.get('/api/hello', {responseType: 'arraybuffer'}).pipe(
      map(p => Person.fromBinary(new Uint8Array(p))),
      tap(p => console.log(p)),
      tap(p => this.response = p),
      ).subscribe();
  }
}
