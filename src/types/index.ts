// 用户相关类型
export interface User {
  userId: string;
  email: string;
  nickname: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
  nickname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token?: string;
}

// 题库相关类型
export interface QuizSet {
  quizSetId: string;
  title: string;
  description: string;
  totalQuestions: number;
  progress: number;
  completed: boolean;
}

// 问题相关类型
export interface QuestionOption {
  optionNumber: string;
  content: string;
}

export interface Question {
  questionId: string;
  quizSetId: string;
  content: string;
  options: QuestionOption[];
  orderInSet: number;
}

export interface SubmitAnswerRequest {
  optionNumber: string;
  orderInSet: number;
}

export interface SubmitAnswerResponse {
  progress: number;
  completed: boolean;
  similarPathsCount: number;
}

export interface GetQuestionInfoResponse {
  currentProgress: number;
  totalQuestions: number;
  nextQuestionOrder: number;
  nextQuestionContent: string | null;
  similarPathsCount: number;
  completed: boolean;
}

// 用户答题记录相关类型
export interface UserAnswerRecord {
  recordId: string;
  userId: string;
  quizSetId: string;
  progress: number;
  answers: string[];
  completed: boolean;
}

// 答题总结相关类型
export interface QuizSummary {
  answers: string[];
  similarPathsCount: number;
}

// API 响应类型
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// 错误响应类型
export interface ErrorResponse {
  message: string;
}
 