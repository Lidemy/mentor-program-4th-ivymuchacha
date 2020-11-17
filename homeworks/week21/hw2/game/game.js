/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useState, memo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body{
    background: #E5D1D0;
  }
`;

const Game = styled.div`
  width:900px;
  margin: 5% auto;
  padding:30px;
  display: flex;
`;

const Info = styled.h2`
  margin-left:5%;
`;

const Board = styled.div`
  position:absolute;
  border: 2px solid black;
  width:612px;
  padding:1px;
`;

const MemoBoard = memo(Board);

const RealBoard = styled.div`
  width:647px;
  padding:1px;
  transform: translate(-2.47%,-2.2%);
`;

const RealRow = styled.div`
  display:flex;
  border-radius: 50%;
`;

const RealCol = styled.div`
  border-radius: 50%;
  ${props => props.Black === 1 && 'background:black;'};
  ${props => props.Black === 2 && 'background:white;'};
  padding: 17px;
`;

const Row = styled.div`
  display:flex;
  border-radius: 50%;
`;

const Col = styled.div`
  border: 1px solid black;
  padding: 16px;
`;

let y = 0;
let x = 0;
export default function App() {
  const [board, setBoard] = useState(Array(18).fill(Array(18).fill(null)));
  const [realBoard, setRealBoard] = useState(Array(19).fill(Array(19).fill(null)));
  const [isBlack, setIsBlack] = useState(true);
  const [winner, setWinner] = useState(null);

  // 判斷輸贏
  const caculateWinner = (realBoard) => {
    for (let a = 0; a < 19; a += 1) {
      for (let b = 0; b < 19; b += 1) {
        // 四種可能
        if (realBoard[a][b]
          && realBoard[a][b] === realBoard[a][b + 1]
          && realBoard[a][b] === realBoard[a][b + 2]
          && realBoard[a][b] === realBoard[a][b + 3]
          && realBoard[a][b] === realBoard[a][b + 4]) {
          return realBoard[a][b];
        }
        if (realBoard[a][b]
          && realBoard[a + 1][b] === realBoard[a][b]
          && realBoard[a + 2][b] === realBoard[a][b]
          && realBoard[a + 3][b] === realBoard[a][b]
          && realBoard[a + 4][b] === realBoard[a][b]) {
          return realBoard[a][b];
        }
        if (realBoard[a][b]
          && realBoard[a][b] === realBoard[a + 1][b + 1]
          && realBoard[a][b] === realBoard[a + 2][b + 2]
          && realBoard[a][b] === realBoard[a + 3][b + 3]
          && realBoard[a][b] === realBoard[a + 4][b + 4]) {
          return realBoard[a][b];
        }
        if (realBoard[a][b]
          && realBoard[a][b] === realBoard[a + 1][b - 1]
          && realBoard[a][b] === realBoard[a + 2][b - 2]
          && realBoard[a][b] === realBoard[a + 3][b - 3]
          && realBoard[a][b] === realBoard[a + 4][b - 4]) {
          return realBoard[a][b];
        }
      }
    } return null;
  };

  const handleClick = (x, y) => {
    const newBoard = JSON.parse(JSON.stringify(realBoard));
    // 確認是否已有輸贏 決定是否可以繼續下棋
    const GameStatus = caculateWinner(realBoard);
    if (!GameStatus) {
      if (newBoard[y][x] === null) {
        if (isBlack) {
          newBoard[y][x] = 1;
        } else {
          newBoard[y][x] = 2;
        }
        setIsBlack(!isBlack);
        setRealBoard(newBoard);
      }
    }
    const Winner = caculateWinner(newBoard);
    if (Winner) {
      if (Winner === 1) {
        setWinner('Black');
      } else {
        setWinner('White');
      }
    }
  };

  return (
    <div>
      <GlobalStyle />
      <Game>
        <MemoBoard>
          {
          board.map((square, y) => (
            <Row key={y}>
              {
            square.map((item, x) => <Col key={x}>{item}</Col>, x += 1)
            }
            </Row>
          ), y += 1)
        }
        </MemoBoard>
        <RealBoard>
          {
          realBoard.map((square, y) => (
            <RealRow key={y} y={y}>
              {
                square.map((item, x) => (
                  <RealCol key={x} x={x} Black={item} onClick={(e) => { handleClick(x, y); }} />
                ), x += 1)
              }
            </RealRow>
          ), y += 1)
        }
        </RealBoard>
        <Info>
          {
          winner ? `Winner is ${winner}` : `Next is ${isBlack ? 'Black' : 'White'}`
        }
        </Info>
      </Game>
    </div>
  );
}
