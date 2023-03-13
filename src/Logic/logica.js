import { WINNER_COMBOS } from "./constans";

export const checkWinner = (boardToCheck)=>{
    // revisamos todas las combinaciones ganadoras
    // para ver si x u o gano
    for (const combo of WINNER_COMBOS){
      const[a , b, c] = combo;
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    // Si no hay ganador
    return null
  }

// Chequeamos el estado del game
export const checkEndGame = (newBoard)=>{
    // revisamos si hay empate
    // si no hay mas espacios libres
    // en el tablero
    return newBoard.every( (square)=> square !== null )
  }