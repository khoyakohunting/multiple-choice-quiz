import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Row, Col, Button, Typography } from "antd";
import { useContext } from "react";
import { QuestionContext } from "../../context/questionContext";
import { QuestionType } from "../../types/QuestionsType";

export const QuestionHeader = ({
  question,
  totalQuestions,
  show,
}: {
  question?: QuestionType;
  totalQuestions: number;
  show?: boolean;
}) => {
  const questionContext = useContext(QuestionContext);

  return (
    <div className="question--header">
      <Row justify="space-between">
        <Col>
          <Button
            disabled={questionContext.currentQuestionIndex === 0}
            icon={<LeftOutlined />}
            size="large"
            type="dashed"
            onClick={() =>
              questionContext.setCurrentQuestionIndex(
                questionContext.currentQuestionIndex - 1
              )
            }
          />
        </Col>
        <Col>
          <Button
            disabled={
              questionContext.currentQuestionIndex === totalQuestions ||
              !questionContext?.answers?.find((ans) => ans.id === question?.id)
                ?.answer
            }
            icon={<RightOutlined />}
            size="large"
            type="dashed"
            onClick={() =>
              questionContext.setCurrentQuestionIndex(
                questionContext.currentQuestionIndex + 1
              )
            }
          />
        </Col>
      </Row>
      <Typography.Title level={4} style={{ color: "white", textAlign: "left" }}>
        {question?.question}
      </Typography.Title>
    </div>
  );
};
