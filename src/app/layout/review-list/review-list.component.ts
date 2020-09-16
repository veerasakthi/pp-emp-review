import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  displayedColumns: string[] = ['review_id', 'title', 'employee_id', 'employee_name', 'created_date', 'view'];
  dataSource: MatTableDataSource<any>;
  reviewListURL: any = "/review-crud";
  isSpinning = false;
  localStorage: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  reviewList: any = [];

  constructor(private router: Router, private dataService: DataService) {

    this.localStorage = JSON.parse(localStorage.getItem('empObj'));
    this.isSpinning = true;
    this.createNewUser();
  }

  ngOnInit(): void {
    // tslint:disable-next-line:no-debugger
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Builds and returns a new User. */
  createNewUser() {

    let reqObj: any = {
      key: "ReviewList"
    };

    if (this.localStorage.role === 2) {

      reqObj = {
        key: "ReviewList",
        reviewerEmpId: this.localStorage.empId
      };
    }

    this.dataService.post(this.reviewListURL, reqObj).subscribe((data: any) => {

      this.reviewList = data.result;

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.reviewList);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.isSpinning = false;
    });

  }

  viewReview(reviewId) {

    if (this.localStorage.role === 2) {
      this.router.navigate([`/feedback-add`], { queryParams: { reviewID: reviewId } });
      return;
    }
    this.router.navigate([`/review-view`], { queryParams: { reviewID: reviewId } });
  }

}
