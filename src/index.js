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
      turn: true
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(sqrNum) {
    const board = this.state.history[this.state.history.length - 1].board.slice();
    if (board[sqrNum] || calculateWinner(board)) {
      return;
    }
    board[sqrNum] = this.state.turn ? X : O;
    this.setState( prevState => ( {
      history: prevState.history.concat([{board}]),
      turn: !prevState.turn
    } ) );
  }

  render() {
    const board = this.state.history[this.state.history.length - 1].board;
    const winner = calculateWinner(board);
    let status;
    
    if(winner) {
      status = `The Winner Is : ${winner}`;
    }
    else {
      status = `Next move: ${this.state.turn ? X: O}`;
    }
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
          <ol>{/* info */}</ol>
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