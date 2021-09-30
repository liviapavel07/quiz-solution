import { Question } from './question';

interface GetQuestionsRequest {
  amount: number,
  category: string,
  type: string,
  difficulty: string
}

interface ApiInterface {
  getQuestions (req: GetQuestionsRequest): Promise<Question[]>;
}

export type { ApiInterface };
