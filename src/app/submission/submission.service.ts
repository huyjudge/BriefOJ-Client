import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateSubmissionDto } from './create-submission-dto';
import { Observable, catchError, of } from 'rxjs';
import { SubmissionSearchQuery } from './submission-search-query';
import { SubmissionBriefDto } from './submission-brief-dto';
import { PagedResult } from '../shared/paged-result';
import { SubmissionDetailsDto } from './submission-details-dto';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  apiUrl = 'https://briefoj.somee.com/api';

  constructor(private http: HttpClient) { }

  create(command: CreateSubmissionDto): Observable<any> {
    return this.http.post<CreateSubmissionDto>(`${this.apiUrl}/Submissions`, command).pipe(
      catchError(() => {
        return of(undefined);
      })
    );
  }

  search(query: SubmissionSearchQuery): Observable<PagedResult<SubmissionBriefDto>> {
    let params = new HttpParams()
      .set('pageNumber', query.pageNumber)
      .set('pageSize', query.pageSize);
    
    if (query.problemId != null) {
      params = params.set('name', query.problemId);
    }

    if (query.creatorId != null) {
      params = params.set('difficulty', query.creatorId);
    }

    return this.http.get<PagedResult<SubmissionBriefDto>>(`${this.apiUrl}/Submissions?${params.toString()}`);
  }

  getById(id: number): Observable<SubmissionDetailsDto | undefined> {
    return this.http.get<SubmissionDetailsDto>(`${this.apiUrl}/Submissions/${id}`).pipe(
      catchError(() => {
        return of(undefined);
      })
    );
  }
}
