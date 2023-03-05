import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from '../../services/employee.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  @Input() employee?: Employee;
  isSubmitted = false;
  editEmployeeForm: FormGroup;
  ranks = ['None', 'Low', 'Medium', 'High'];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private employeeService: EmployeeService
    ) {}

    ngOnInit(): void {
      this.editEmployeeForm = new FormGroup({
        name: new FormControl(null),
        surname: new FormControl(null),
        email: new FormControl(null),
        rank: new FormControl(null)
      });

      this.getEmployee();
    }

    getEmployee(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.employeeService.getEmployee(id).subscribe(employee => this.employee = employee)
    }

    goBack(): void {
      this.location.back();
    }

    save(): void {
      this.isSubmitted = true;
      if (this.employee) {
        this.employeeService.updateEmployee(this.employee)
          .subscribe(() => this.goBack());
      }
    }
}
