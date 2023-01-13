/*
Ant Design use for UI library as I don't want to waste time for UI things

*/

import { useEffect, useState } from "react";
import "./App.css";
import { fetchQuestionsApi } from "./api/api";
import { QuestionType } from "./types/QuestionsType";
import { Card, Col, ConfigProvider, Layout, Progress, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { Answer } from "./components/answer/answers";
import { QuestionHeader } from "./components/questionHeader/questionHeader";

function App() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>();
  const getQuestions = async () => {
    await fetchQuestionsApi({
      limit: "10",
      offset: 10,
    }).then((data) => {
      console.log(data);
      setCurrentQuestion(data[0]);
      setQuestions(data);
    });
  };

  //session can't be use for unique question due to api key is not available for free

  // const getSession = async () => {
  //   await getSessionApi().then((data) => {
  //     console.log(data);
  //   });
  // };

  useEffect(() => {
    //session can't be use for unique question due to api key is not available for free

    // getSession();
    getQuestions();
  }, []);
  return (
    <Layout>
      <ConfigProvider>
        <div className="App">
          <header className="App-header">
            <Content style={{ width: "100%" }}>
              <Row justify="center">
                <Col xxl={6} xl={6} lg={8} md={12} sm={18} xs={24}>
                  <Card
                    style={{ height: "100vh", width: "100%" }}
                    cover={<QuestionHeader question={currentQuestion} />}>
                    <Row
                      gutter={[20, 20]}
                      align="stretch"
                      style={{ marginTop: -100 }}>
                      {currentQuestion?.incorrectAnswers?.map((answer, i) => {
                        return (
                          <Col span={12} key={i}>
                            <Answer label={answer} />
                          </Col>
                        );
                      })}
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Progress
                          style={{ marginTop: 80 }}
                          steps={10}
                          percent={20}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Content>
          </header>
        </div>
      </ConfigProvider>
    </Layout>
  );
}

export default App;
