import { quizSets } from './api';
import { QuizSet } from '../types';

export const getQuizSets = async (): Promise<QuizSet[]> => {
  const response = await quizSets.getAll();
  return response.data;
};
