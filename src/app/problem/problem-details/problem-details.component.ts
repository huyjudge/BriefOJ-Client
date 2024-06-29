import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemDetailsDto } from '../problem-details-dto';
import { ProblemService } from '../problem.service';
import { ProblemDifficultyPipe } from "../problem-difficulty.pipe";
import { NgForOf, NgIf } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { LatexParagraphComponent } from "../../shared/latex-paragraph/latex-paragraph.component";
import * as ace from 'ace-builds';
import { FormsModule } from '@angular/forms';
import { CreateSubmissionDto } from '../../submission/create-submission-dto';
import { SubmissionService } from '../../submission/submission.service';

@Component({
    selector: 'app-problem-details',
    standalone: true,
    templateUrl: './problem-details.component.html',
    styleUrl: './problem-details.component.css',
    imports: [ProblemDifficultyPipe, NgIf, BaseChartDirective, LatexParagraphComponent, NgForOf, FormsModule]
})
export class ProblemDetailsComponent implements OnInit, AfterViewInit {
  private route: ActivatedRoute;
  private router: Router;
  private problemService: ProblemService;
  private submissionService: SubmissionService;
  problemDetails: ProblemDetailsDto | undefined;
  chartConfig: any;
  languageSelections = [
    { id: 9, name: 'C++ (GCC 9.2.0)', mode: 'c_cpp' },
    { id: 8, name: 'C (GCC 9.2.0)', mode: 'c_cpp' },
    { id: 10, name: 'C# (Mono 6.6.0.161)', mode: 'csharp' },
    { id: 24, name: 'Pascal (FPC 3.0.4)', mode: 'pascal' },
    { id: 28, name: 'Python (2.7.17)', mode: 'python' },
    { id: 29, name: 'Python (3.8.1)', mode: 'python' },
    { id: 19, name: 'Java (JDK 13.0.1)', mode: 'java' }
  ];
  createSubmissionDto: CreateSubmissionDto;
  @ViewChild('editor') private editor!: ElementRef<HTMLElement>;
  aceEditor!: ace.Ace.Editor;

  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.problemService = inject(ProblemService);
    this.submissionService = inject(SubmissionService);
    this.createSubmissionDto = { sourceCode: null, problemId: null, languageId: 10 };
  }

  ngOnInit(): void {
    const problemId = Number(this.route.snapshot.params['id']);
    this.problemService.getById(problemId).subscribe(response => {
      if (response) {
        this.problemDetails = response;
        this.createSubmissionDto.problemId = response.id;
        this.createChart();
      }
    });
  }

  ngAfterViewInit() {
    ace.config.set('fontSize', '11pt');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setShowPrintMargin(false);
    this.aceEditor.setTheme('ace/theme/eclipse');
    this.aceEditor.session.setMode('ace/mode/c_cpp');
  }

  createChart() {
    this.chartConfig = {
      type: 'doughnut',
      data: {
        labels: ['AC', 'WA', 'TLE'],
        datasets: [
          { 
            data: [
              this.problemDetails?.totalAcceptances,
              this.problemDetails?.totalWrongAnswer,
              this.problemDetails?.totalTimeLimitExceeded
            ],
            backgroundColor: ['green', 'red', 'yellow']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  }

  onLanguageChange() {
    if (this.aceEditor) {
      const selectedLanguage = this.languageSelections.find(lang => lang.id === this.createSubmissionDto.languageId);
      this.aceEditor.session.setMode(`ace/mode/${selectedLanguage?.mode}`);
    }
  }

  onSubmit(event: any) {
    event.target.disabled = true;
    this.createSubmissionDto.sourceCode = this.aceEditor.getValue();
    this.submissionService.create(this.createSubmissionDto).subscribe(response => {
      if (response) {
        this.router.navigate(['/Submissions']);
      }
    });
  }
}
