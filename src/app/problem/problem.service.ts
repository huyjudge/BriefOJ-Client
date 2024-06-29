import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { PagedResult } from '../shared/paged-result';
import { ProblemBriefDto } from './problem-brief-dto';
import { ProblemSearchQuery } from './problem-search-query';
import { ProblemDetailsDto } from './problem-details-dto';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  apiUrl = 'https://localhost:7177/api';

  constructor(private http: HttpClient) { }

  search(query: ProblemSearchQuery): Observable<PagedResult<ProblemBriefDto>> {
    let params = new HttpParams()
      .set('pageNumber', query.pageNumber)
      .set('pageSize', query.pageSize);
    
    if (query.name != null) {
      params = params.set('name', query.name);
    }

    if (query.difficulty != null) {
      params = params.set('difficulty', query.difficulty);
    }

    return this.http.get<PagedResult<ProblemBriefDto>>(`${this.apiUrl}/Problems?${params.toString()}`);
  }

  getById(id: number): Observable<ProblemDetailsDto | null> {
    return this.http.get<ProblemDetailsDto>(`${this.apiUrl}/Problems/${id}`).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }
}
