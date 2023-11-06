import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import HomePageStudent from './pages/pageLogged/student/homePageStudent/HomePageStudent';
import QuestionPage from './pages/pageLogged/student/questionPage/QuestionPage';
import HomePageTeacher from './pages/pageLogged/teacher/homePageTeacher/HomePageTeacher';
import NewTopics from './pages/pageLogged/teacher/topicsPage/newTopics/NewTopics';
import EditTopics from './pages/pageLogged/teacher/topicsPage/editTopics/EditTopics';
import QuestionPageTeacher from './pages/pageLogged/teacher/questionPage/QuestionPage';
import NewQuestion from './pages/pageLogged/teacher/questionPage/newQuestion/NewQuestion';
import EditQuestion from './pages/pageLogged/teacher/questionPage/editQuestion/EditQuestion';
import AlternativePage from './pages/pageLogged/teacher/alternativePage/AlternativePage';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activePage: "home",
    }
  }

  render() {
    return (
      <>
      <link
            href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
            rel="stylesheet"
        />
        <Router>
          <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossOrigin="true"></script>
          <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" crossOrigin="true"></script>
          <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="true"></script>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aluno" element={<HomePageStudent />} />
            <Route path="/professor" element={<HomePageTeacher />} />
            <Route path="/createNewTopics" element={<NewTopics />} />
            <Route path="/createNewQuestion/:id/:topics" element={<NewQuestion />} />
            <Route path="/topicsEdit/:id" element={<EditTopics />} />
            <Route path="/questionEdit/:id/:topics/:idTopic" element={<EditQuestion />} />
            <Route path="/questions/:id/:topics" element={<QuestionPage />} />
            <Route path="/questionsView/:id/:topics" element={<QuestionPageTeacher />} />
            <Route path="/alternative/:id/:topics/:idTopic" element={<AlternativePage />} />
          </Routes>
        </Router>
      </>
    );
  }
}