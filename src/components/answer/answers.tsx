import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Card, Typography } from "antd";
import "./answer.scss";
export const Answer = ({ label }: { label: string }) => {
  return (
    <Card className="answer__card">
      <div className="answer__card--indicator">
        <CheckCircleFilled style={{ color: "#4caf50", fontSize: 18 }} />
        <CloseCircleFilled style={{ color: "red", fontSize: 18 }} />
      </div>
      <Typography.Title level={5} style={{ margin: 0 }}>
        {label}
      </Typography.Title>
    </Card>
  );
};
