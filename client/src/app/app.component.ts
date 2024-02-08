import { Component } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Person } from './models/definitions';

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
    
    this.http.get('http://localhost:3333/', {responseType: 'arraybuffer'}).subscribe(r => {
      const person = Person.fromBinary(new Uint8Array(r));
      this.response = (this.toObject(person));
    });
  }

  toObject(input: object) {
    return JSON.parse(JSON.stringify(input, (_, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
}

}
