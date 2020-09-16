import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-review-view',
  templateUrl: './review-view.component.html',
  styleUrls: ['./review-view.component.css']
})
export class ReviewViewComponent implements OnInit {

  submitted = false;
  reviewId: string;
  reviewGetUrl = "/review-crud";
  reviewList = [];
  reviewHeader = [];

  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService,
    // tslint:disable-next-line:align
    private snackBar: MatSnackBar, private route: ActivatedRoute) { }


  ngOnInit(): void {

    // this.setFormData();

    // tslint:disable-next-line:no-shadowed-variable
    this.route.queryParams.subscribe(params => {
      this.reviewId = params.reviewID;
      this.getFormValue();
    });

  }

  getFormValue() {

    this.submitted = true;

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

      this.reviewList = data.result.detailObj;
      this.reviewHeader = data.result.header;

      this.submitted = false;

    });

  }

  getStars(length) {
    const arr = new Array(+length);
    return arr;
  }

}
