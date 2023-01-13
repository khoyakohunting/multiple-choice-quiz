/*
Ant Design use for UI library as I don't want to waste time for UI things

*/

import { useEffect, useState } from "react";
import "./App.css";
import { fetchQuestionsApi } from "./api/api";
import { QuestionType } from "./types/QuestionsType";
import {
  Card,
  Col,
  ConfigProvider,
  Layout,
  Progress,
  Row,
  Spin,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { Answer } from "./components/answer/answers";
import { QuestionHeader } from "./components/questionHeader/questionHeader";
import { AnswerType, QuestionContext } from "./context/questionContext";
import Animate from "rc-animate";

function App() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>();
  const [loading, setLoading] = useState(false);

  const getQuestions = async () => {
    setLoading(true);
    await fetchQuestionsApi({
      limit: 10,
      offset: 0,
    }).then((data) => {
      console.log(data);
      // setCurrentQuestion(data[0]);
      const dataWithAnswer = data?.map((question: QuestionType) => {
        return {
          ...question,
          answers: [
            ...(question?.incorrectAnswers || []),
            question?.correctAnswer,
          ].sort((a, b) => 0.5 - Math.random()),
        };
      });
      setQuestions(dataWithAnswer);
    });
    setLoading(false);
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

  //QuestionContext Handlers

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerType[]>([]);

  const setAnswer = (id: string, answer: string) => {
    setAnswers(
      answers.concat({
        id: id,
        answer: answer,
        point:
          questions?.find((qs) => qs.id === id)?.correctAnswer === answer
            ? 1
            : 0,
      })
    );
  };

  ///extra for animation
  const [show, setShow] = useState(true);

  useEffect(() => {
    setCurrentQuestion(questions[currentQuestionIndex]);
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 10);
  }, [currentQuestionIndex, questions]);

  //final score calculation
  const score = answers?.reduce((total, curr) => {
    return total + curr?.point;
  }, 0);
  console.log(show);
  return (
    <Layout>
      <ConfigProvider>
        <QuestionContext.Provider
          value={{
            answers: answers,
            setAnswer: setAnswer,
            currentQuestionIndex: currentQuestionIndex,
            setCurrentQuestionIndex: setCurrentQuestionIndex,
          }}>
          <div className="App">
            <header className="App-header">
              <Content style={{ width: "100%" }}>
                <Row justify="center">
                  <Col xxl={6} xl={6} lg={8} md={12} sm={18} xs={24}>
                    <div className={`loader ${loading ? "show" : "hide"}`}>
                      <Spin />
                    </div>
                    <Card
                      hidden={loading}
                      style={{
                        height: "100vh",
                        width: "100%",
                      }}
                      cover={
                        <Animate showProp="show" transitionName="fade">
                          {/* {show && ( */}
                          <QuestionHeader
                            show={show}
                            totalQuestions={questions?.length}
                            question={currentQuestion}
                          />
                          {/* )} */}
                        </Animate>
                      }>
                      <Row
                        gutter={[20, 20]}
                        align="stretch"
                        style={{ marginTop: -100 }}>
                        {currentQuestion &&
                          currentQuestion?.answers?.map((answer, i) => {
                            return (
                              <Col span={12} key={i}>
                                <Animate showProp="show" transitionName="fade">
                                  <Answer
                                    show={show}
                                    id={currentQuestion.id}
                                    label={answer}
                                  />
                                </Animate>
                              </Col>
                            );
                          })}
                        {questions?.length === currentQuestionIndex && (
                          <Col span={22}>
                            <Card className="answer__card">
                              <Typography.Title level={4}>
                                YOUR FINAL SCORE IS
                              </Typography.Title>
                              <Typography.Title level={1}>
                                {score}
                              </Typography.Title>
                            </Card>
                          </Col>
                        )}
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Progress
                            style={{ marginTop: 80 }}
                            steps={questions?.length}
                            percent={
                              (answers?.length / questions?.length) * 100
                            }
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Content>
            </header>
          </div>
        </QuestionContext.Provider>
      </ConfigProvider>
    </Layout>
  );
}

export default App;
