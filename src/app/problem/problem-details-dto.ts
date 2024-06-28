export interface ProblemDetailsDto 
{
    id: number;
    name: string;
    difficulty: number;
    statement: string;
    inputDescription: string;
    outputDescription: string;
    example: string;
    timeLimit: number;
    memoryLimit: number;
    totalSubmissions: number;
    totalInQueue: number;
    totalProcessing: number;
    totalAcceptances: number;
    totalWrongAnswer: number;
    totalTimeLimitExceeded: number;
    totalCompilationError: number;
    totalRuntimeErrorSIGSEGV: number;
    totalRuntimeErrorSIGXFSZ: number;
    totalRuntimeErrorSIGFPE: number;
    totalRuntimeErrorSIGABRT: number;
    totalRuntimeErrorNZEC: number;
    totalRuntimeErrorOther: number;
    totalInternalError: number;
    totalExecFormatError: number;
}
