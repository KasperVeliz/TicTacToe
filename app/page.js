"use client";

import { useState } from 'react';
import './styles.css'

function Square({ value, onSquareClick, id, class2add }){
    const myClass = "square squarebk " + class2add;
    //squarebk is only the tansition css for sqare (to be removed after game over)
    return <button id={id} className={myClass} onClick={onSquareClick}>
            {value}
        </button>;
}

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
      return [a,b,c,squares[a]];
    }
  }
  return null;
}


function removeClass(classToRemove){
    const elementsWithClass = document.querySelectorAll(`.${classToRemove}`);
    elementsWithClass.forEach(element => {
        element.classList.remove(classToRemove);
    });
}

function Board( {xNxt, squares, onPlay}){
    const winner = calculateWinner(squares);
    let status;

    if(winner){
        status = "Winner: " + winner[3];
        removeClass("squarebk");
        const winSquare1 = document.getElementById(String(winner[0]));
        const winSquare2 = document.getElementById(String(winner[1]));
        const winSquare3 = document.getElementById(String(winner[2]));
        winSquare1.classList.add("winSqr");
        winSquare2.classList.add("winSqr");
        winSquare3.classList.add("winSqr");
    }
    else{
        if(squares.includes(null)){
            status = "Next player: " + (xNxt ? "X" : "O");
        }
        else{
            status = "No more moves :(";
            removeClass("squarebk")
        }
    }

    function handleClick(i) {
        if(squares[i] || winner){
            return;
        }
        const nextSquares = squares.slice();
        if(xNxt){
            nextSquares[i] = "X";
        }
        else{
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }
    return (
        <>
        <div className='board'>
            <div className="status">{status}</div>
            <div className="boardRow">
                <Square id="0" value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square id="1" value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square id="2" value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="boardRow">
                <Square id="3" value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square id="4" value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square id="5" value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="boardRow">
                <Square id="6" value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square id="7" value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square id="8" value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </div>
        </>
        
    );
}

export default function Game(){
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currMove, setCurrMove] = useState(0);
    const currSqrs = history[currMove];
    const xNxt = currMove % 2 ===0;

    function handlePlay(nxtSqrs){
        const nextHistory = [...history.slice(0, currMove + 1), nxtSqrs];
        setHistory(nextHistory);
        setCurrMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove){
        setCurrMove(nextMove);
    }

    const moves = history.map((squares,move) =>{
        let description = "";
        if(move > 0){
            description = "Go to move #" + move;
        }
        else{
            description = "Go to game start";
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <>
        <h1>Tic-Tac-Toe</h1>
        <div className="gameField">
            <Board xNxt={xNxt} squares={currSqrs} onPlay={handlePlay}/>
            <div className="history">
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
        <button className="reload" onClick={() => window.location.reload(true)}>RESTART</button>
        </>
    );
}