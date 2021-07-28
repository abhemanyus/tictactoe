import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const X = 'X';
const O = 'O';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => {this.props.sign || this.props.gotClicked(this.props.value)}}>
        {this.props.sign}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      turn: 0
    };
    this.gotClicked = this.gotClicked.bind(this);
  }
  renderSquare(i) {
    return <Square sign={this.state.board[i]} value={i} gotClicked={this.gotClicked}/>;
  }

  gotClicked(sqrNum) {
    this.setState(
      (prevState) => {
        let board = prevState.board;
        board[sqrNum] = prevState.turn % 2 === 0 ? X : O;
        let turn = prevState.turn + 1;

        return( { board, turn } )
      }
    );
  }

  render() {
    const status = `Next player: ${this.state.turn % 2 === 0 ? X : O}`;

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
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
