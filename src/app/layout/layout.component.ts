import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  localStorage: any;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router,) {
    this.localStorage = JSON.parse(localStorage.getItem('empObj'));
  }

  logout() {

    localStorage.clear();
    this.router.navigate(['/login']);

  }

  getRole() {
    return (this.localStorage.role === 1) ? "admin" : "employee";
  }

}
