import { NgForOf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 0;
  @Input() maxPages: number = 5;
  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages'] || changes['currentPage'] || changes['maxPages']) {
      this.generatePages();
    }
  }
  
  generatePages() {
    const pages = [];

    const halfMaxPages = Math.floor(this.maxPages / 2);
    let startPage = Math.max(1, this.currentPage - halfMaxPages);
    let endPage = Math.min(this.totalPages, startPage + this.maxPages - 1);

    if (endPage - startPage + 1 < this.maxPages) {
      startPage = Math.max(1, endPage - this.maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    this.pages = pages;
  }

  onPageChange(page: number): void {
    this.changePage.emit(page);
  }
}
