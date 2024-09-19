import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuizQuestion from '../components/quiz/quizQuestion';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getQuestionInfo, getQuestionByOrder, submitAnswer } from '../services/quiz';
import { Question, SubmitAnswerResponse, GetQuestionInfoResponse } from '../types';

const QuizQuestionPage: React.FC = () => {
  const { quizSetId } = useParams<{ quizSetId: string }>();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Question | null>(null);
  const [questionInfo, setQuestionInfo] = useState<GetQuestionInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestionInfo();
  }, [quizSetId]);

  const fetchQuestionInfo = async () => {
    if (!quizSetId) return;
    setIsLoading(true);
    setError(null);
    try {
      const info = await getQuestionInfo(quizSetId);
      setQuestionInfo(info);
      if (info.nextQuestionOrder) {
        const nextQuestion = await getQuestionByOrder(quizSetId, info.nextQuestionOrder);
        setQuestion(nextQuestion);
      }
    } catch (err) {
      setError('Failed to fetch question information. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (selectedOption: string) => {
    if (!quizSetId || !question || !questionInfo) return;
    try {
      const response: SubmitAnswerResponse = await submitAnswer(quizSetId, selectedOption, question.orderInSet);
      if (response.completed) {
        navigate(`/quiz-summary/${quizSetId}`);
      } else {
        fetchQuestionInfo();
      }
    } catch (err) {
      setError('Failed to submit answer. Please try again.');
      console.error(err);
    }
  };

  const handleReturnToQuizSets = () => {
    navigate('/quiz-sets');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent>
            <p className="text-center py-8">Loading question...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent>
            <p className="text-center py-8 text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!question || !questionInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent>
            <p className="text-center py-8">No question available.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quiz in Progress</h1>
        <Button variant="outline" onClick={handleReturnToQuizSets}>
          Return to Quiz Sets
        </Button>
      </div>
      <QuizQuestion
        questionNumber={questionInfo.nextQuestionOrder}
        totalQuestions={questionInfo.totalQuestions}
        content={question.content}
        options={question.options}
        onSubmit={handleSubmit}
        similarPathsCount={questionInfo.similarPathsCount}
      />
    </div>
  );
};

export default QuizQuestionPage;