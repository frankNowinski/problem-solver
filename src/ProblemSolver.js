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
      this.setState({
        error: 'You entered an invalid equation. Please only enter numbers and math operators (+, -, *, /).',
        total: ''
      });
    }
  }

  validInput = () => {
    let valid = true, input = this.state.input;

    input.split('').forEach(c => {
      // this could probably be solved more efficiently using Regex
      if (!('0123456789+-*/').includes(c) && c !== ' ') {
        valid = false;
      }
    });

    return valid;
  }

  solveEquation = () => {
    // I made a pretty big assumption here that each number and operator the user inputted
    // into the text input was separted by a space. If this app was going to production,
    // I would do a much more thorough job sanitizing the input.
    let total     = this.state.input.split(' ');
    let functions = { '*': 'multiply', '/': 'divide' , '+': 'add', '-': 'subtract' }
    let operators = Object.keys(functions);

    for(let i = 0; i <= total.length; i++) {
      operators.forEach(operator => {
        if (total[i] === operator) {
          // assign the two values that are going to be computed
          let a = parseInt(total[i - 1]);
          let b = parseInt(total[i + 1]);

          // determine the appropriate method to call
          let method = functions[operator];

          // call method and get result
          let result = this[method](a, b);

          // this is a little funky: after I retrieve the result, I replace the three
          // elements in the array that I used to compute the problem (a, the operator, and b)
          // with two empty strings and the result. This is to ensure the loop's
          // index stays in the correct place for the next iteration.
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
