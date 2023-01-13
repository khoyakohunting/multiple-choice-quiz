export interface QuestionType {
  category?: string;
  id?: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question?: string;
  tags?: string[];
  type?: Type;
  difficulty?: Difficulty;
  regions?: any[];
  isNiche?: boolean;
}

export enum Difficulty {
  Hard = "hard",
  Medium = "medium",
}

export enum Type {
  MultipleChoice = "Multiple Choice",
}
