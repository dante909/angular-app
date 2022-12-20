import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  @Input() employee?: Employee;
}
