import { Component } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from 'src/app/features/employees/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees.slice(1,5))
  }
}
