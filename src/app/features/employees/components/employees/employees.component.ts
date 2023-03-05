import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from '../../services/employee.service';
import { MessagesService } from 'src/app/features/messages/services/messages.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  isSubmitted = false;
  employees: Employee[] = [];
  addEmployeeForm: FormGroup;
  ranks = ['None', 'Low', 'Medium', 'High'];

  constructor(private employeeService: EmployeeService, private messagesService: MessagesService) { }

  ngOnInit(): void {
  this.addEmployeeForm = new FormGroup({
    name: new FormControl(null, Validators.maxLength(10)),
    surname: new FormControl(null, Validators.maxLength(10)),
    email: new FormControl(null, Validators.email),
    rank: new FormControl(null, Validators.required)
  });

    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (!this.addEmployeeForm.value) { return; }

    let employee = new Employee({
      name: this.addEmployeeForm.value.name,
      surname: this.addEmployeeForm.value.surname,
      email: this.addEmployeeForm.value.email,
      rank: this.addEmployeeForm.value.rank
    });

    this.employeeService.addEmployee(employee).subscribe(employee => { this.employees.push(employee); });
  }

  delete(employee: Employee): void {
    this.employees = this.employees.filter(h => h !== employee);
    this.employeeService.deleteEmployee(employee.id).subscribe();
  }
}
