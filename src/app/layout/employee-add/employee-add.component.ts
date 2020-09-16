import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employeeForm: FormGroup;
  employeeSaveUrl = "/saveEmployee";
  employeeGetUrl = "/getEmployees";
  employeePutUrl = "/saveEmployee";
  employeeObj = null;
  submitted = false;
  screen: string;
  employeeId: string;
  localStorage: any;

  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService,
    // tslint:disable-next-line:align
    private snackBar: MatSnackBar, private route: ActivatedRoute) {

    this.localStorage = JSON.parse(localStorage.getItem('empObj'));
    if (this.localStorage.role === 2) {
      this.router.navigate([`/review-list`]);
      return;
    }

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.screen = params.get("screen");
      this.setFormData();

      if (this.screen === "edit") {
        this.submitted = true;

        // tslint:disable-next-line:no-shadowed-variable
        this.route.queryParams.subscribe(params => {

          this.employeeId = params.empID;
        });

        this.getFormValue();
      }
    });


  }

  setFormData() {

    this.employeeForm = this.fb.group({
      empId: [{ value: '', disabled: true }],
      empName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(60)]],
      password: ['', [Validators.required, Validators.maxLength(60)]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      role: ['', [Validators.required]],
      mobileNumber: ['', [Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]],
    });
  }

  get f() { return this.employeeForm.controls; }

  getFormValue() {

    const requestObj = {
      empId: this.employeeId
    };

    this.dataService.post(this.employeeGetUrl, requestObj).subscribe((data: any) => {

      if (data.status !== "success") {

        this.snackBar.open(data.messageCode, "error", {
          duration: 2000,
        });

        this.router.navigate(['/employee-list']);
        return;
      }

      if (data.result.length === 0) {
        this.router.navigate(['/employee-list']);
        return;
      }

      this.employeeForm.patchValue(data.result[0]);

      this.submitted = false;

    });

  }


  onSave() {

    this.submitted = true;

    // TODO: Use EventEmitter with form value
    // this.employeeForm.value.dob.toISOString().substring(0, 10);
    const requestObj = {
      empObj: this.employeeForm.value
    };

    this.dataService.post(this.employeeSaveUrl, requestObj).subscribe((data: any) => {

      if (data.status !== "success") {

        this.snackBar.open(data.messageCode, "error", {
          duration: 2000,
        });

        this.submitted = false;
        return;
      }

      this.snackBar.open("saved employee", "success", {
        duration: 2000,
      });

      setTimeout(() => {
        this.router.navigate(['/employee-list']);
      }, 2000);

    });

  }


  onUpdate() {

    this.submitted = true;

    // TODO: Use EventEmitter with form value
    this.employeeForm.value.empId = +this.employeeId;
    const requestObj = {
      empObj: this.employeeForm.value
    };

    this.dataService.post(this.employeePutUrl, requestObj).subscribe((data: any) => {

      if (data.status !== "success") {

        this.snackBar.open(data.messageCode, "error", {
          duration: 2000,
        });

        this.submitted = false;
        return;
      }

      this.snackBar.open(`updated employee ${this.employeeForm.value.empName}`, "success", {
        duration: 2000,
      });

      setTimeout(() => {
        this.router.navigate(['/employee-list']);
      }, 2000);

    });

  }


}