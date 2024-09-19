import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface QuestionOption {
  optionNumber: string;
  content: string;
}

interface QuizQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  content: string;
  options: QuestionOption[];
  onSubmit: (selectedOption: string) => void;
  similarPathsCount: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  questionNumber,
  totalQuestions,
  content,
  options,
  onSubmit,
  similarPathsCount
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (selectedOption && !isSubmitting) {
      setIsSubmitting(true);
      await onSubmit(selectedOption);
      setSelectedOption(null);
      setIsSubmitting(false);
    }
  };

  if (!options || options.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent>
          <p className="text-center py-8">No options available for this question.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Question {questionNumber}</span>
          <span className="text-sm text-muted-foreground">
            Progress: {questionNumber}/{totalQuestions}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-6">{content}</p>
        <div className="space-y-4">
          {options.map((option) => (
            <Button
              key={option.optionNumber}
              variant={selectedOption === option.optionNumber ? "default" : "outline"}
              className="w-full justify-start text-left h-auto py-3 px-4"
              onClick={() => setSelectedOption(option.optionNumber)}
              disabled={isSubmitting}
            >
              {option.content}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch space-y-4">
        <Button onClick={handleSubmit} disabled={!selectedOption || isSubmitting} className="w-full">
          {isSubmitting ? 'Submitting...' : 'Submit Answer'}
        </Button>
        <Progress value={(questionNumber / totalQuestions) * 100} className="w-full" />
        <p className="text-sm text-muted-foreground text-center">
          Similar paths: {similarPathsCount}
        </p>
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;