import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemDetailsDto } from '../problem-details-dto';
import { ProblemService } from '../problem.service';
import { ProblemDifficultyPipe } from "../problem-difficulty.pipe";
import { NgIf } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { LatexParagraphComponent } from "../../shared/latex-paragraph/latex-paragraph.component";

@Component({
    selector: 'app-problem-details',
    standalone: true,
    templateUrl: './problem-details.component.html',
    styleUrl: './problem-details.component.css',
    imports: [ProblemDifficultyPipe, NgIf, BaseChartDirective, LatexParagraphComponent]
})
export class ProblemDetailsComponent implements OnInit, AfterViewInit {
  route: ActivatedRoute;
  problemService: ProblemService;
  problemDetails: ProblemDetailsDto | undefined;
  chartConfig: any;
  
  constructor() {
    this.problemService = inject(ProblemService);
    this.route = inject(ActivatedRoute);
  }

  ngOnInit(): void {
    const problemId = Number(this.route.snapshot.params['id']);
    this.problemService.getById(problemId).subscribe(response => {
      this.problemDetails = response;
      this.createChart();
    });
  }

  ngAfterViewInit() {
    
  }

  createChart() {
    this.chartConfig = {
      type: 'pie',
      data: {
        labels: ['Làm đúng', 'Làm sai'],
        datasets: [
          { 
            data: [this.problemDetails?.totalAcceptances, this.problemDetails?.totalWrongAnswer],
            backgroundColor: ['green', 'red']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  }
}
