import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginURL: any = "/login";
  isSpinning = false;

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {

    this.isSpinning = true;

    const requestObj = {
      email: this.loginForm.value.userName,
      password: this.loginForm.value.password
    };

    console.log(JSON.stringify(requestObj));

    this.dataService.post(this.loginURL, requestObj).subscribe((data: any) => {

      this.isSpinning = false;

      if (data.status !== "success" || data.result.length === 0) {

        this.snackBar.open(data.data, "error", {
          duration: 2000,
        });
        return;
      }

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('empObj', JSON.stringify(data.result[0]));
      this.router.navigate(['/review-list']);

    });

  }

}
