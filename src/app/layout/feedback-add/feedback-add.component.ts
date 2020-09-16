import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feedback-add',
  templateUrl: './feedback-add.component.html',
  styleUrls: ['./feedback-add.component.css']
})
export class FeedbackAddComponent implements OnInit {

  feedbackForm: FormGroup;
  feedbackSaveUrl = "/review-crud";
  feedbackGetURL = "/review-crud";
  employeeObj = null;
  submitted = false;
  screen: string;
  employeeId: string;
  reviewId: string;
  localStorage: any;
  rating: any = 0;
  reviewHeader = [];

  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService,
    // tslint:disable-next-line:align
    private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.localStorage = JSON.parse(localStorage.getItem('empObj'));
    this.setFormData();
    this.route.queryParams.subscribe(params => {

      this.reviewId = params.reviewID;
    });

    this.getFormValue();
  }

  setFormData() {

    this.feedbackForm = this.fb.group({
      detail_id: [''],
      reviewerId: [''],
      rating: ['', [Validators.required]],
      feedback: ['', [Validators.required, Validators.maxLength(400)]],
    });
  }

  get f() { return this.feedbackForm.controls; }

  getFormValue() {

    const requestObj = {
      key: "ReviewDetailList",
      reviewId: this.reviewId,
      reviewerEmpId: this.localStorage.empId
    };

    this.dataService.post(this.feedbackGetURL, requestObj).subscribe((data: any) => {

      if (data.status !== "success") {

        this.snackBar.open(data.messageCode, "error", {
          duration: 2000,
        });

        this.router.navigate(['/review-list']);
        return;
      }

      this.feedbackForm.patchValue(data.result.detailObj[0]);
      this.rating = this.feedbackForm.value.rating;
      this.reviewHeader = data.result.header;

      this.submitted = false;

    });

  }


  onSave() {

    this.submitted = true;

    const requestObj = {
      detailObj: this.feedbackForm.value,
      key: "updateReviews",
    };

    this.dataService.post(this.feedbackSaveUrl, requestObj).subscribe((data: any) => {

      if (data.status !== "success") {

        this.snackBar.open(data.messageCode, "error", {
          duration: 2000,
        });

        this.submitted = false;
        return;
      }

      this.snackBar.open("saved feedback", "success", {
        duration: 2000,
      });

      setTimeout(() => {

        this.router.navigate(['/review-list']);
        this.submitted = false;

      }, 2000);

    });

  }

  onChange() {
    this.feedbackForm.controls.rating.setValue(this.rating);
    this.feedbackForm.controls.rating.markAsDirty();
  }

  getStars(length) {
    const arr = new Array(+length);
    return arr;
  }
}