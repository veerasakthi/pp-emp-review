import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule as LM } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';

import { ReactiveFormsModule } from '@angular/forms';
import { ReviewAddComponent } from './review-add/review-add.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewViewComponent } from './review-view/review-view.component';
import { FeedbackAddComponent } from './feedback-add/feedback-add.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    LayoutComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    ReviewAddComponent,
    ReviewListComponent,
    ReviewViewComponent,
    FeedbackAddComponent
  ],

  imports: [
    CommonModule,
    LayoutRoutingModule,
    LM,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatChipsModule
  ]
})
export class LayoutModule { }
