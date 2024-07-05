import { Routes } from '@angular/router';
import { ProblemListComponent } from './problem/problem-list/problem-list.component';
import { ProblemDetailsComponent } from './problem/problem-details/problem-details.component';
import { SubmissionListComponent } from './submission/submission-list/submission-list.component';
import { SubmissionDetailsComponent } from './submission/submission-details/submission-details.component';
import { HomeComponent } from './home/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Problems', component: ProblemListComponent },
  { path: 'Problems/:id', component: ProblemDetailsComponent },
  { path: 'Submissions', component: SubmissionListComponent },
  { path: 'Submissions/:id', component: SubmissionDetailsComponent }
];
