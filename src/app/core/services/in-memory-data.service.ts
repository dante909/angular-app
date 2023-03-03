import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      { id: 12, name: 'Jack Jones' },
      { id: 13, name: 'Michael Walton' },
      { id: 14, name: 'Christopher Holland' },
      { id: 15, name: 'Calvin Young' },
      { id: 16, name: 'Daniil Sorokin' },
      { id: 17, name: 'Christopher Lee' }
    ];
    return {employees};
  }
}