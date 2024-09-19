import { quizSets, questions } from './api';
import { QuizSet, SubmitAnswerResponse, QuizSummary, Question, GetQuestionInfoResponse } from '../types';

export const getQuizSets = async (): Promise<QuizSet[]> => {
  const response = await quizSets.getQuizSets();
  return response.data;
};

export const getQuestionInfo = async (quizSetId: string): Promise<GetQuestionInfoResponse> => {
  const response = await questions.getQuestionInfo(quizSetId);
  return response.data;
};

export const getQuestionByOrder = async (quizSetId: string, orderInSet: number): Promise<Question> => {
  const response = await questions.getQuestionByOrder(quizSetId, orderInSet);
  return response.data;
};

export const submitAnswer = async (
  quizSetId: string,
  optionNumber: string,
  orderInSet: number
): Promise<SubmitAnswerResponse> => {
  const response = await questions.submitAnswer(quizSetId, optionNumber, orderInSet);
  return response.data;
};

export const getQuizSummary = async (quizSetId: string): Promise<QuizSummary> => {
  const response = await quizSets.getQuizSetSummary(quizSetId);
  return response.data;
};

export const resetAnswerRecord = async (quizSetId: string): Promise<{ wasReset: boolean }> => {
    const response = await quizSets.resetAnswerRecord(quizSetId);
    return response.data;
};