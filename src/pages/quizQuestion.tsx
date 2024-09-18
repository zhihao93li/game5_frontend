import React, { useState, useEffect } from 'react';
import QuizQuestion from '../components/quiz/quizQuestion';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// 模拟的问题数据
const mockQuestion = {
  id: '1',
  content: 'What is the capital of France?',
  options: [
    { optionNumber: 'A', content: 'London' },
    { optionNumber: 'B', content: 'Paris' },
  ],
  quizSetId: '1',
  orderInSet: 1,
};

const QuizQuestionPage: React.FC = () => {
  const [question, setQuestion] = useState<typeof mockQuestion | null>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [similarPathsCount, setSimilarPathsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 模拟 API 调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        setQuestion(mockQuestion);
        // 模拟获取相似路径数量
        setSimilarPathsCount(Math.floor(Math.random() * 100));
      } catch (err) {
        setError('Failed to fetch question. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [questionNumber]);

  const handleSubmit = (selectedOption: string) => {
    console.log(`Submitted answer: ${selectedOption}`);
    // 这里应该有提交答案到后端的逻辑
    // 然后获取下一个问题或结束测验
    if (questionNumber < totalQuestions) {
      setQuestionNumber(prev => prev + 1);
    } else {
      // 测验结束，跳转到总结页面
      console.log('Quiz completed');
    }
  };

  const handleReturnToQuizSets = () => {
    // 这里应该实现返回题库选择页面的逻辑
    console.log('Returning to quiz set selection');
    // 例如，如果使用 React Router，可以这样写：
    // history.push('/quiz-sets');
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

  if (!question) {
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
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        content={question.content}
        options={question.options}
        onSubmit={handleSubmit}
        similarPathsCount={similarPathsCount}
      />
    </div>
  );
};

export default QuizQuestionPage;