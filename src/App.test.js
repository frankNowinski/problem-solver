import React from 'react';
import ReactDOM from 'react-dom';
import ProblemSolver from './ProblemSolver';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProblemSolver />, div);
});

