export type Candidate = {
  _id: string;
  name: string;
  votes: number;
  googleSheetsRowNumber: number;
  reviewComments?: string;
};
