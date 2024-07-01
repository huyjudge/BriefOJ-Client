export interface SubmissionDetailsDto {
    id: number;
    time: number | null;
    memory: number | null;
    sourceCode: string;
    status: number;
    problemId: number;
    creatorId: number;
    languageId: number;
    createdAt: string;
    problemName: string;
    languageName: string;
    creatorName: string;
}
