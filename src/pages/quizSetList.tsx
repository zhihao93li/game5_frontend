import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizSetList from '../components/quiz/quizSetList';
import { getQuizSets } from '../services/quiz';
import { QuizSet } from '../types';

const QuizSetListPage: React.FC = () => {
  const [quizSets, setQuizSets] = useState<QuizSet[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizSets = async () => {
      try {
        const data = await getQuizSets();
        setQuizSets(data);
        setIsLoading(false);
      } catch (err) {
        console.error('获取题库列表失败:', err);
        setError('获取题库列表失败，请稍后重试。');
        setIsLoading(false);
      }
    };

    fetchQuizSets();
  }, []);

  const handleStartQuiz = (id: string) => {
    navigate(`/quiz-question/${id}`);
  };

  const handleContinueQuiz = (id: string) => {
    navigate(`/quiz-question/${id}`);
  };

  const handleViewSummary = (id: string) => {
    navigate(`/quiz-summary/${id}`);
  };

  if (isLoading) {
    return <div className="text-center py-8">加载题库列表中...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">可用题库</h1>
      <QuizSetList 
        quizSets={quizSets}
        onStartQuiz={handleStartQuiz}
        onContinueQuiz={handleContinueQuiz}
        onViewSummary={handleViewSummary}
      />
    </div>
  );
};

export default QuizSetListPage;