import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { ReviewAddComponent } from './review-add/review-add.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewViewComponent } from './review-view/review-view.component';
import { FeedbackAddComponent } from './feedback-add/feedback-add.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'employee-list'
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent
      },
      {
        path: 'employee/:screen',
        component: EmployeeAddComponent
      },
      {
        path: 'review/:screen',
        component: ReviewAddComponent
      },
      {
        path: 'review-list',
        component: ReviewListComponent
      },
      {
        path: 'review-view',
        component: ReviewViewComponent
      },
      {
        path: 'feedback-add',
        component: FeedbackAddComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
