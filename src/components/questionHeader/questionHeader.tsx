import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Row, Col, Button, Typography } from "antd";
import { QuestionType } from "../../types/QuestionsType";

export const QuestionHeader = ({ question }: { question?: QuestionType }) => {
  return (
    <div className="question--header">
      <Row justify="space-between">
        <Col>
          <Button icon={<LeftOutlined />} size="large" type="dashed" />
        </Col>
        <Col>
          <Button icon={<RightOutlined />} size="large" type="dashed" />
        </Col>
      </Row>
      <Typography.Title level={4} style={{ color: "white", textAlign: "left" }}>
        {question?.question}
      </Typography.Title>
    </div>
  );
};
