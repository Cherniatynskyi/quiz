import React from 'react';
import Quiz from './Quiz';
import '../App.css'
import questions from '../utils/questions.json'


const App = () => (
  <div className="App">
    <Quiz questions={questions} />
  </div>
);

export default App;