export interface SubmissionBriefDto {
    id: number;
    time: number | null;
    memory: number | null;
    status: number;
    problemId: number;
    creatorId: number;
    createdAt: string;
    problemName: string;
    languageName: string;
    creatorName: string;
}
