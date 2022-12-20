import { Component, OnInit } from '@angular/core';
import { EMPLOYEES } from 'src/app/core/constants/mock-employees';
import { Employee } from 'src/app/core/models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees = EMPLOYEES;
  selectedEmployee ?: Employee;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(employee: Employee) : void{
    this.selectedEmployee = employee;
  }
}
