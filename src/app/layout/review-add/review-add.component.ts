import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.css']
})

export class ReviewAddComponent implements OnInit {

  reviewForm: FormGroup;
  reviewSaveUrl = "/review-crud";
  reviewGetUrl = "/review-crud";
  employeePutUrl = "/saveEmployee";
  employeeListURL: any = "/getEmployees";
  employeeObj = null;
  submitted = false;
  screen: string;
  employeeId: string;
  reviewId: string;
  employeeList = [];
  filteredOptions: Observable<any[]>;
  localStorage: any;
  selectedEmployee = [];

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

    this.getEmployeeList();

    this.route.paramMap.subscribe(params => {
      this.screen = params.get("screen");
      this.setFormData();

      if (this.screen === "edit") {
        this.submitted = true;

        // tslint:disable-next-line:no-shadowed-variable
        this.route.queryParams.subscribe(params => {

          this.reviewId = params.reviewID;
        });

        this.getFormValue();
      }
    });

    this.filteredOptions = this.reviewForm.get('employee').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    // set chips
    this.reviewForm.get('employee').valueChanges.subscribe((value) => {
      this.selectedEmployee = this.employeeList.filter((obj) => { if (obj.empId === value) { return obj; } });

    });

    this.reviewForm.get('employee').valueChanges.subscribe((value) => {

      const emp = value;
      const rev = this.reviewForm.get('reviewers').value;

      if (rev.includes(emp)) {
        this.reviewForm.controls.employee.setErrors({ alreadyExist: true });
      }

    });

  }
  private _filter(value: string): string[] {

    let filterValue = value;
    // tslint:disable-next-line:use-isnan
    if (Number(value) === NaN) {
      filterValue = value.toLowerCase();
    }

    return this.employeeList.filter(option => option.empName.toLowerCase().includes(filterValue));
  }

  setFormData() {

    this.reviewForm = this.fb.group({
      reviewId: [{ value: '', disabled: true }],
      title: ['', [Validators.required, Validators.maxLength(40)]],
      employee: ['', [Validators.required]],
      reviewers: ['', [Validators.required]],
      comments: ['', [Validators.required, Validators.maxLength(150)]]
    });
  }

  get f() { return this.reviewForm.controls; }

  getEmployeeList() {
    this.submitted = true;

    this.dataService.post(this.employeeListURL, { role: [2] }).subscribe((data: any) => {

      this.employeeList = data.result;
      // this.filteredOptions = from(this.employeeList);
      // this.employeeList.slice(0, 3));
      this.submitted = false;
    });

  }

  getFormValue() {

    const requestObj = {
      reviewId: this.reviewId,
      key: "ReviewDetailList"
    };

    this.dataService.post(this.reviewGetUrl, requestObj).subscribe((data: any) => {

      if (data.status !== "success") {

        this.snackBar.open(data.messageCode, "error", {
          duration: 2000,
        });

        this.router.navigate(['/review-list']);
        return;
      }

      if (data.result.length === 0) {
        this.router.navigate(['/review-list']);
        return;
      }

      this.reviewForm.patchValue(data.result[0]);

      this.submitted = false;

    });

  }


  onSave() {

    // check whether user chose from auto suggestion else set error
    const emp = this.reviewForm.value.employee;
    const arr = this.employeeList.filter(option => option.empId === emp);

    if (arr.length === 0) {
      this.reviewForm.controls.employee.setErrors({ invalid: true });
      return;
    }
    this.submitted = true;

    // TODO: Use EventEmitter with form value
    // this.reviewForm.value.dob.toISOString().substring(0, 10);
    const requestObj = {
      reviewObj: this.reviewForm.value,
      key: 'saveReviews'
    };
    console.log(JSON.stringify(requestObj));

    this.dataService.post(this.reviewSaveUrl, requestObj).subscribe((data: any) => {

      if (data.status !== "success") {

        this.snackBar.open(data.messageCode, "error", {
          duration: 2000,
        });

        this.submitted = false;
        return;
      }

      this.snackBar.open("saved review", "success", {
        duration: 2000,
      });

      setTimeout(() => {
        this.router.navigate(['/review-list']);
      }, 2000);

    });

  }

  consistentEmp() {

    if (this.reviewForm.value.employee) {

      this.reviewForm.value.reviewers.splice(this.reviewForm.value.reviewers.indexOf(this.reviewForm.value.employee), 1);

    }
  }


}