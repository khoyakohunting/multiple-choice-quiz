import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Card, Typography } from "antd";
import { useContext } from "react";
import { QuestionContext } from "../../context/questionContext";
import "./answer.scss";
export const Answer = ({
  label,
  id,
  show,
}: {
  label: string;
  id: string;
  show?: boolean;
}) => {
  const questionContext = useContext(QuestionContext);

  const currentAnswer = questionContext?.answers?.find((ans) => ans.id === id);
  return (
    <Card
      className="answer__card"
      onClick={() => {
        if (!currentAnswer) {
          questionContext.setAnswer(id, label);
          setTimeout(() => {
            questionContext.setCurrentQuestionIndex(
              questionContext.currentQuestionIndex + 1
            );
          }, 1000);
        }
      }}>
      {currentAnswer && currentAnswer.answer === label && (
        <div className="answer__card--indicator">
          {currentAnswer.point ? (
            <CheckCircleFilled style={{ color: "#4caf50", fontSize: 18 }} />
          ) : (
            <CloseCircleFilled style={{ color: "red", fontSize: 18 }} />
          )}
        </div>
      )}
      <Typography.Title level={5} style={{ margin: 0 }}>
        {label}
      </Typography.Title>
    </Card>
  );
};
