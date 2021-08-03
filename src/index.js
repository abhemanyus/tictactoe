import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const X = 'X';
const O = 'O';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square value={this.props.board[i]} onClick={ () => this.props.onClick(i) }/>;
  }


  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [ { board: Array(9).fill(null) } ],
      step: 0,
      turn: true
    };
    this.onClick = this.onClick.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }

  jumpTo(move) {
    this.setState( prevState => ({
      step: move,
      turn: (move % 2) === 0,
      history: prevState.history.slice(0, move+1)
    }));
  }

  onClick(sqrNum) {
    const history = this.state.history.slice(0, this.state.step + 1);
    const board = history[history.length - 1].board.slice();
    if (board[sqrNum] || calculateWinner(board)) {
      return;
    }
    board[sqrNum] = this.state.turn ? X : O;
    this.setState( prevState => ( {
      history: prevState.history.concat([{board}]),
      step: history.length,
      turn: (history.length % 2) === 0
    } ) );
  }

  render() {
    const board = this.state.history[this.state.step].board;
    const winner = calculateWinner(board);
    let status;
    
    if(winner) {
      status = `The Winner Is : ${winner}`;
    }
    else {
      status = `Next move: ${this.state.turn ? X: O}`;
    }
    const moves = this.state.history.map((step, move) => {
      let mv = 0;
      if(move) {
        const prevStep = this.state.history[move-1];
        prevStep.board.forEach((item, index) => {
          if(item !== step.board[index]) {
            mv = index;
            return;
          }
        });
      } 
      const desc = move ? `${(move % 2 === 0) ? O : X} at (${(mv % 3) + 1},${Math.floor(mv/3) + 1})` : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            onClick={this.onClick} 
            board={board}
            turn={this.state.turn}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}