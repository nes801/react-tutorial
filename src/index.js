import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={()=>
//         this.props.onClick()
//       }>
//         {this.props.value}
//       </button>
//     );
//   }
// }
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(){
    super();
    this.state={
      squares:Array(9).fill(null),
      xIsNext:true,
    };
  }
  handleClick(i){
    const sques = this.state.squares.slice();
    sques[i]=this.state.xIsNext ? 'X':'O';
    this.setState({
      squares:sques,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    /*Squareに値を渡す*/
    /*キホン的になんでもカッコで囲ってあげる文化*/
    return (
            <Square
              value={this.state.squares[i]}
              onClick={()=>this.handleClick(i)}
            />
          );
  }

  render() {
    const status = 'Next player: '+
    (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {/*Squareを呼び出してあげる*/}
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
          <ol>{/* TODO */}</ol>
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
