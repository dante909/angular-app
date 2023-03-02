import { Injectable } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';
import { EMPLOYEES } from 'src/app/core/constants/mock-employees';
import { Observable, of } from 'rxjs';
import { MessagesService } from '../../messages/services/messages.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private messagesService: MessagesService) { }

  getEmployees(): Observable<Employee[]>{
    const employees = of(EMPLOYEES);
    this.messagesService.add('EmployeeService: fetched employees');
    return employees;
  }

  getEmployee(id: number): Observable<Employee> {
    const employee = EMPLOYEES.find(employee => employee.id === id)!;
    this.messagesService.add(`EmployeeService: fetched employee id=${id}`);
    return of(employee);
  }
}
