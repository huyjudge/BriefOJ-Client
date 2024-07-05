import { Component, OnInit, inject } from '@angular/core';
import { ProblemSearchQuery } from '../problem-search-query';
import { ProblemService } from '../problem.service';
import { PagedResult } from '../../shared/paged-result';
import { ProblemBriefDto } from '../problem-brief-dto';
import { NgForOf, NgIf } from '@angular/common';
import { ProblemDifficultyPipe } from "../problem-difficulty.pipe";
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from "../../shared/pagination/pagination.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-problem-list',
  standalone: true,
  templateUrl: './problem-list.component.html',
  styleUrl: './problem-list.component.css',
  imports: [NgForOf, ProblemDifficultyPipe, FormsModule, PaginationComponent, RouterLink, NgIf]
})
export class ProblemListComponent implements OnInit {
  private problemService: ProblemService;
  searchQuery: ProblemSearchQuery;
  searchResult: PagedResult<ProblemBriefDto> | null;
  currentPage: number;
  difficulties = [
    { name: 'Dễ', value: 1 },
    { name: 'Thường', value: 2 },
    { name: 'Khó', value: 3 }
  ];
  searchDone: boolean = false;

  constructor() {
    this.problemService = inject(ProblemService);
    this.searchQuery = {
      name: null,
      difficulty: null,
      pageNumber: 1,
      pageSize: 10
    };
    this.searchResult = null;
    this.currentPage = 1;
  }

  ngOnInit() {
    this.search();
  }

  search() {
    this.searchDone = false;
    this.problemService.search(this.searchQuery).subscribe(response => {
      this.searchResult = response;
      this.currentPage = 1;
      this.searchDone = true;
    });
  }

  onPageChange(page: number) {
    this.searchQuery.pageNumber = page;
    this.problemService.search(this.searchQuery).subscribe(response => {
      this.searchResult = response;
      this.currentPage = page;
    });
  }
}
