import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'problemDifficulty',
  standalone: true
})
export class ProblemDifficultyPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'Dễ';
      case 2:
        return 'Thường';
      case 3:
        return 'Khó';
      default:
        return 'Chưa xác định';
    }
  }
}
