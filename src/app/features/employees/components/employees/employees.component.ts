import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';
import { EMPLOYEES } from 'src/app/core/constants/mock-employees';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees = EMPLOYEES;

  constructor() { }

  ngOnInit(): void {
  }
}
