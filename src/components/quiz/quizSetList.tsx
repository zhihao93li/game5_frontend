import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface QuizSet {
  quizSetId: string;
  title: string;
  description: string;
  totalQuestions: number;
  progress: number;
  completed: boolean;
}

interface QuizSetListProps {
  quizSets: QuizSet[] | undefined;
  onStartQuiz: (id: string) => void;
  onContinueQuiz: (id: string) => void;
  onViewSummary: (id: string) => void;
}

const QuizSetList: React.FC<QuizSetListProps> = ({ quizSets, onStartQuiz, onContinueQuiz, onViewSummary }) => {
  if (!quizSets || quizSets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-600">No quiz sets available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {quizSets.map((quizSet) => (
        <Card key={quizSet.quizSetId} className="flex flex-col">
          <CardHeader>
            <CardTitle>{quizSet.title}</CardTitle>
            <CardDescription>{quizSet.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <Progress value={Math.round((quizSet.progress / quizSet.totalQuestions) * 100)} className="w-full" />
            <p className="mt-2 text-sm text-gray-600">
              Progress: ({quizSet.progress}/{quizSet.totalQuestions} questions)
            </p>
          </CardContent>
          <CardFooter>
            {quizSet.progress === 0 && (
              <Button onClick={() => onStartQuiz(quizSet.quizSetId)} className="w-full">Start Quiz</Button>
            )}
            {quizSet.progress > 0 && !quizSet.completed && (
              <Button onClick={() => onContinueQuiz(quizSet.quizSetId)} className="w-full">Continue Quiz</Button>
            )}
            {quizSet.completed && (
              <Button onClick={() => onViewSummary(quizSet.quizSetId)} className="w-full">View Summary</Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default QuizSetList;
