import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from 'src/app/features/employees/services/employee.service';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent {
  employees$!: Observable<Employee[]>;
  private searchTerms = new Subject<string>();

  constructor(private emploeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employees$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.emploeeService.searchEmployees(term)),
    );
  }

    // Push a search term into the observable stream.
    search(term: string): void {
      this.searchTerms.next(term);
    }
}
