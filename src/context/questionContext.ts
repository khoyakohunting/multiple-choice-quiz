import React from "react";

export interface AnswerType {
  id: string;
  answer: string;
  point: number;
}

interface AnswerContextType {
  answers: AnswerType[];
  currentQuestionIndex: number;
  setAnswer: (id: string, answer: string) => void;
  setCurrentQuestionIndex: (id: number) => void;
}

const defaultValue: AnswerContextType = {
  answers: [],
  currentQuestionIndex: 0,
  setAnswer: () => {},
  setCurrentQuestionIndex: () => {},
};

export const QuestionContext = React.createContext(defaultValue);
