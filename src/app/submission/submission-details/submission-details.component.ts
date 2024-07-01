import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { SubmissionService } from '../submission.service';
import { SubmissionDetailsDto } from '../submission-details-dto';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { SubmissionStatusPipe } from "../submission-status.pipe";
import { SubmissionStatusClassPipe } from "../submission-status-class.pipe";
import * as ace from 'ace-builds';

@Component({
    selector: 'app-submission-details',
    standalone: true,
    templateUrl: './submission-details.component.html',
    styleUrl: './submission-details.component.css',
    imports: [NgIf, SubmissionStatusPipe, SubmissionStatusClassPipe, RouterLink]
})
export class SubmissionDetailsComponent implements OnInit, AfterViewInit {
  private submissionService: SubmissionService;
  private route: ActivatedRoute;
  submissionDetails: SubmissionDetailsDto | undefined;
  @ViewChild('editor') private editor!: ElementRef<HTMLElement>;
  aceEditor!: ace.Ace.Editor;
  languageSelections = [
    { id: 9, name: 'C++ (GCC 9.2.0)', mode: 'c_cpp' },
    { id: 8, name: 'C (GCC 9.2.0)', mode: 'c_cpp' },
    { id: 10, name: 'C# (Mono 6.6.0.161)', mode: 'csharp' },
    { id: 24, name: 'Pascal (FPC 3.0.4)', mode: 'pascal' },
    { id: 28, name: 'Python (2.7.17)', mode: 'python' },
    { id: 29, name: 'Python (3.8.1)', mode: 'python' },
    { id: 19, name: 'Java (JDK 13.0.1)', mode: 'java' }
  ];

  constructor() {
    this.submissionService = inject(SubmissionService);
    this.route = inject(ActivatedRoute);
  }

  ngAfterViewInit(): void {
    ace.config.set('fontSize', '11pt');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setReadOnly(true);
    this.aceEditor.setShowPrintMargin(false);
    this.aceEditor.setTheme('ace/theme/eclipse');
    this.aceEditor.session.setMode('ace/mode/c_cpp');
    const selectedLanguage = this.languageSelections.find(lang => lang.id === this.submissionDetails?.languageId);
    this.aceEditor.session.setMode(`ace/mode/${selectedLanguage?.mode}`);
    
  }

  ngOnInit(): void {
    const submissionId = this.route.snapshot.params['id'];
    this.submissionService.getById(submissionId).subscribe(response => {
      this.submissionDetails = response;
      this.aceEditor.setValue(this.submissionDetails?.sourceCode ?? '', 1);
    });
  }
}
