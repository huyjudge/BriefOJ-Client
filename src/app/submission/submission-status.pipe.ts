import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'submissionStatus',
  standalone: true
})
export class SubmissionStatusPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return "In queue";
      case 2:
        return "Processing";
      case 3:
        return "Accepted";
      case 4:
        return "Wrong answer";
      case 5:
        return "Time limit exceeded";
      case 6:
        return "Compilation error";
      case 7:
        return "Runtime error SIGSEGV";
      case 8:
        return "Runtime error SIGXFSZ";
      case 9:
        return "Runtime error SIGFPE";
      case 10:
        return "Runtime error SIGABRT";
      case 11:
        return "Runtime error NZEC";
      case 12:
        return "Runtime error other";
      case 13:
        return "Internal error";
      case 14:
        return "Exec format error";
      default:
        return "Unknown status";
    }
  }
}
