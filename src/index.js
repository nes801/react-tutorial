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
  renderSquare(i) {
    /*Squareに値を渡す*/
    /*キホン的になんでもカッコで囲ってあげる文化*/
    return (
            <Square
              value={this.props.squares[i]}
              onClick={()=>this.props.onClick(i)}
            />
          );
  }

  render() {
    return (
      <div>
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
  constructor(){
    super();
    this.state={
      history:[{
        squares:Array(9).fill(null),
      }],
      stepNumber:0,
      xIsNext:true,
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[history.length-1];
    const sques = current.squares.slice();
    if(calculateWinner(sques)||sques[i]){
      return;
    }
    sques[i]=this.state.xIsNext ? 'X':'O';
    this.setState({
      history:history.concat([{
        squares:sques,
      }]),
      stepNumber:history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber:step,
      //偶数の時Trueにする
      xIsNext:(step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    //historyから新しいhstoryを作る
    const moves = history.map((step,move)=>{
      console.log(step,move);
      //aタグの中身，表示部分
      const desc = move ?
        'Move #'+ move :
        'Game start';
      return (
        <li key={move}>
          <a href='#' onClick={()=>this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if(winner){
      status = 'Winner: '+winner;
    }else{
      status = 'Next player: '+(this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i)=>this.handleClick(i)}
          />
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

function calculateWinner(squares){
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c]=lines[i];
    //squaresの中身が同じ記号かを確認
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}
