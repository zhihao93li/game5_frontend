import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface QuizAnswer {
  questionNumber: number;
  userAnswer: string;
}

interface QuizSummaryProps {
  quizTitle: string;
  answers: QuizAnswer[];
  totalSimilarPaths: number;
  onResetQuizSet: () => void;
}

const QuizSummary: React.FC<QuizSummaryProps> = ({ quizTitle, answers, totalSimilarPaths, onResetQuizSet }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{quizTitle} - 总结</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Badge variant="secondary" className="text-lg">
            相似路径总数: {totalSimilarPaths}
          </Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>问题</TableHead>
              <TableHead>你的答案</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {answers.map((answer) => (
              <TableRow key={answer.questionNumber}>
                <TableCell>问题 {answer.questionNumber}</TableCell>
                <TableCell>{answer.userAnswer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">重置答题记录</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确定要重置吗？</AlertDialogTitle>
              <AlertDialogDescription>
                此操作无法撤销。这将永久重置你在此题库的答题进度。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={onResetQuizSet}>确定</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default QuizSummary;