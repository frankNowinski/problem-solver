import React from 'react';

class ProblemSolver extends React.Component {
  state = {
    input: '',
    error: '',
    total: ''
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validInput()) {
      this.setState({ error: '' });
      this.solveEquation();
    } else {
      this.setState({ error: 'You entered an invalid equation. Please only enter numbers and math operators (+, -, *, /).' });
    }
  }

  validInput = () => {
    let valid = true;
    let input = this.state.input;

    input.split('').forEach(c => {
      if (!('0123456789+-*/').includes(c) && c !== ' ') {
        valid = false;
      }
    });

    return valid;
  }

  solveEquation = () => {
    let total     = this.state.input.split(' ');
    let functions = { '*': 'multiply', '/': 'divide' , '+': 'add', '-': 'subtract' }
    let operators = Object.keys(functions);

    for(let i = 0; i <= total.length; i++) {
      operators.forEach(operator => {
        if (total[i] === operator) {
          let a = parseInt(total[i - 1]);
          let b = parseInt(total[i + 1]);

          let method = functions[operator];
          let result = this[method](a, b);

          total.splice(i - 1, 3, '', '', result);
        }
      });
    }

    this.setState({ total: total[total.length - 1] });
  }

  multiply = (a, b) => {
    return a * b
  }

  divide = (a, b) => {
    return a / b
  }

  add = (a, b) => {
    return a + b
  }

  subtract = (a, b) => {
    return a - b
  }

  render() {
    const { input, error, total } = this.state;

    return (
      <div className="container">
        <h1 className="text-center">Problem Solver</h1><hr />

        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="input" className="col-form-label col-sm-2 text-right">Equation: </label>

            <div className="col-sm-6">
              <input
                name="input"
                className="form-control"
                value={input}
                onChange={this.handleChange}
                placeholder="2 + 3 / 2"
              />
            </div>

            <button type="submit" className="btn btn-primary col-sm-2" onClick={this.handleSubmit}>Submit</button>
            <br />
          </div>
        </form>

        { error && <div className="alert alert-danger">{error}</div> }
        { total && <div className="alert alert-success">{total}</div> }
      </div>
    );
  }
}

export default ProblemSolver;
