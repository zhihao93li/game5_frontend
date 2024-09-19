import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuizSummary from '../components/quiz/quizSummary';
import { getQuizSummary, resetAnswerRecord } from '../services/quiz';
import { QuizSummary as QuizSummaryType } from '../types';

const QuizSummaryPage: React.FC = () => {
  const [summary, setSummary] = useState<QuizSummaryType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { quizSetId } = useParams<{ quizSetId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSummaryData();
  }, [quizSetId]);

  const fetchSummaryData = async () => {
    if (!quizSetId) return;
    setIsLoading(true);
    setError(null);
    try {
      const summaryData = await getQuizSummary(quizSetId);
      setSummary(summaryData);
    } catch (err) {
      setError('获取答题总结失败，请稍后重试。');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnToQuizSets = () => {
    navigate('/quiz-sets');
  };

  const handleResetQuizSet = async () => {
    if (!quizSetId) return;
    setIsLoading(true);
    try {
      const { wasReset } = await resetAnswerRecord(quizSetId);
      if (wasReset) {
        navigate(`/quiz-question/${quizSetId}`);
      } else {
        setError('重置答题记录失败，请稍后重试。');
      }
    } catch (err) {
      setError('重置答题记录失败，请稍后重试。');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">加载总结中...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!summary) {
    return <div className="text-center py-8">没有可用的总结数据。</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">答题总结</h1>
        <button onClick={handleReturnToQuizSets} className="btn btn-outline">
          返回题库列表
        </button>
      </div>
      <QuizSummary
        quizTitle={summary.quizTitle}
        answers={summary.answers}
        totalSimilarPaths={summary.totalSimilarPaths}
        onResetQuizSet={handleResetQuizSet}
      />
    </div>
  );
};

export default QuizSummaryPage;