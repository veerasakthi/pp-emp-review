import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['empId', 'empName', 'email', 'createdDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  employeeListURL: any = "/getEmployees";
  employeeDeleteURL: any = "/saveEmployee";
  isSpinning = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  localStorage: any;

  constructor(private router: Router, private dataService: DataService) {

    this.localStorage = JSON.parse(localStorage.getItem('empObj'));
    if (this.localStorage.role === 2) {
      this.router.navigate(['/review-list']);
      return;
    }

    this.isSpinning = true;
    this.createNewUser();
  }

  ngOnInit(): void {

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

    this.dataService.post(this.employeeListURL, { role: [1, 2] }).subscribe((data: any) => {

      const userData = data.result;

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(userData);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.isSpinning = false;
    });

  }

  deleteEmployee(empIds) {

    if (confirm(`Are you sure to delete ${empIds}`)) {

      this.isSpinning = true;

      const requestObj = {
        empObj: {
          empId: empIds
        },
        key: "delete"
      };

      this.dataService.post(this.employeeDeleteURL, requestObj).subscribe((data: any) => {

        // console.log(data);
        this.isSpinning = false;
        this.createNewUser();

      });

    }

  }

  editEmployee(empId) {
    this.router.navigate([`/employee/edit`], { queryParams: { empID: empId } });
  }

}
