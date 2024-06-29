import { Routes } from '@angular/router';
import { ProblemListComponent } from './problem/problem-list/problem-list.component';
import { ProblemDetailsComponent } from './problem/problem-details/problem-details.component';
import { SubmissionListComponent } from './submission/submission-list/submission-list.component';

export const routes: Routes = [
  { path: 'Problems', component: ProblemListComponent },
  { path: 'Problems/:id', component: ProblemDetailsComponent },
  { path: 'Submissions', component: SubmissionListComponent }
];
