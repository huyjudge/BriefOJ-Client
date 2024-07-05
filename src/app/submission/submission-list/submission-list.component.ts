import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SubmissionService } from '../submission.service';
import { SubmissionSearchQuery } from '../submission-search-query';
import { PagedResult } from '../../shared/paged-result';
import { SubmissionBriefDto } from '../submission-brief-dto';
import { NgForOf, NgIf } from '@angular/common';
import { PaginationComponent } from "../../shared/pagination/pagination.component";
import { SubmissionStatusPipe } from "../submission-status.pipe";
import { RouterLink } from '@angular/router';
import { Subscription, interval, switchMap } from 'rxjs';
import { SubmissionStatusClassPipe } from "../submission-status-class.pipe";

@Component({
    selector: 'app-submission-list',
    standalone: true,
    templateUrl: './submission-list.component.html',
    styleUrl: './submission-list.component.css',
    imports: [NgForOf, PaginationComponent, SubmissionStatusPipe, RouterLink, SubmissionStatusClassPipe, NgIf]
})
export class SubmissionListComponent implements OnInit, OnDestroy {
  private submissionService: SubmissionService;
  searchQuery: SubmissionSearchQuery;
  searchResult: PagedResult<SubmissionBriefDto> | null;
  currentPage: number;
  refreshInterval$!: Subscription;
  searchDone: boolean = false;

  constructor() {
    this.submissionService = inject(SubmissionService);
    this.searchQuery = {
      problemId: null,
      creatorId: null,
      pageNumber: 1,
      pageSize: 10
    };
    this.searchResult = null;
    this.currentPage = 1;
  }

  ngOnInit() {
    this.search();
    this.refreshInterval$ = interval(5000)
      .pipe(switchMap(() => this.submissionService.search(this.searchQuery)))
      .subscribe(response => {
        this.searchResult = response;
      });
  }

  ngOnDestroy() {
    if (this.refreshInterval$) {
      this.refreshInterval$.unsubscribe();
    }
  }

  search() {
    this.searchDone = false;
    this.submissionService.search(this.searchQuery).subscribe(response => {
      this.searchResult = response;
      this.currentPage = 1;
      this.searchDone = true;
    });
  }

  onPageChange(page: number) {
    this.searchQuery.pageNumber = page;
    this.submissionService.search(this.searchQuery).subscribe(response => {
      this.searchResult = response;
      this.currentPage = page;
    });
  }
}
