import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import HomePageStudent from './pages/pageLogged/student/homePageStudent/HomePageStudent';
import TopicsPage from './pages/pageLogged/student/topicsPage/TopicsPage';
import QuestionPage from './pages/pageLogged/student/questionPage/QuestionPage';

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
        <Router>
          <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossOrigin="true"></script>
          <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" crossOrigin="true"></script>
          <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="true"></script>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aluno" element={<HomePageStudent />} />
            <Route path="/topics/:id/:discipline" element={<TopicsPage />} />
            <Route path="/questions/:id/:topics" element={<QuestionPage />} />
          </Routes>
        </Router>
      </>
    );
  }
}