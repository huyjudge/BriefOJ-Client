import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'submissionStatusClass',
  standalone: true
})
export class SubmissionStatusClassPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return "badge text-bg-light";
      case 2:
        return "badge text-bg-light";
      case 3:
        return "badge text-bg-success";
      case 4:
        return "badge text-bg-danger";
      case 5:
        return "badge text-bg-warning";
      case 6:
        return "badge text-bg-warning";
      case 7:
        return "badge text-bg-warning";
      case 8:
        return "badge text-bg-warning";
      case 9:
        return "badge text-bg-warning";
      case 10:
        return "badge text-bg-warning";
      case 11:
        return "badge text-bg-warning";
      case 12:
        return "badge text-bg-warning";
      case 13:
        return "badge text-bg-warning";
      case 14:
        return "badge text-bg-warning";
      default:
        return "badge text-bg-dark";
    }
  }
}
