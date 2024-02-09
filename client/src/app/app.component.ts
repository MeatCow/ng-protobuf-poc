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
  protoResponse: Person | undefined;
  protoLength: number | undefined;
  jsonResponse: Person | undefined;
  jsonLength: number | undefined;

  constructor(
    private readonly http: HttpClient
  ) {}

  getProto() {
    this.http.get('/api/proto', {responseType: 'arraybuffer', observe: 'response'}).pipe(
      tap(p => {
        const length = p.headers.get('content-length');
        if (length != null) {
          this.protoLength = Number(length);
        }
      }),
      map(p => p.body ? Person.fromBinary(new Uint8Array(p.body)) : undefined),
      tap(p => this.protoResponse = p),
      ).subscribe();
  }

  getJson() {
    this.http.get<Person>('/api/json', {observe: 'response'}).pipe(
      tap(p => {
        const length = p.headers.get('content-length');
        if (length != null) {
          this.jsonLength = Number(length);
        }
      }),
      tap(p => {
        this.jsonResponse = p.body ? p.body as Person : undefined;
      }),
      ).subscribe();
  }
}
