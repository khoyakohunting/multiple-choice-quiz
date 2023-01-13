import { Card } from "antd";
import { QuestionType } from "../types/QuestionsType";
import { Answer } from "./answer/answers";

export const Question = ({ data }: { data: QuestionType }) => {
  //Creating accumulated answer mixing correct answer and at random position for difficulty
  const allAnswers = [
    data.correctAnswer,
    ...(data.incorrectAnswers || []),
  ]?.sort((a, b) => 0.5 - Math.random());
  return (
    // <Card>
    <div>
      <div>{data?.question}</div>

      {allAnswers?.map((answer) => {
        return <Answer label={answer} />;
      })}
    </div>
    // </Card>
  );
};
