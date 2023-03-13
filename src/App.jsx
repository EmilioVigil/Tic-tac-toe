import { useState , useEffect } from "react"
import './App.css';
import confetti from "canvas-confetti";
// Componentes
import  Square from './Components/square';
import  {WinnerModal} from './Components/winnerModal';
import  { BoardTabl }  from './Components/boardTable';
import  { Turn } from './Components/turn';
// CONSTANTES
import { TURNS  } from './Logic/constans';
import { checkWinner , checkEndGame } from './Logic/logica';




function App() {
  // ESTADOS
  // Uso el tablero como state para cuando el estado cambie se rendderice el nuevo tablero actualizado
  // Utilizo una funcion para guardar en el local storage el estado
  // Ya que si no lo ponemos asi, en cada render volveria a renderizar el localstorage y es MUY LENTO!!
  const [board , setBoard] = useState( ()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    });
  // const [board , setBoard] = useState(['o','x','x','x','x','o','x','o','o'])


  // Estado para saber de quien es el turno
  const [turn , setTurn] = useState( ()=>{
    const turnFormStorage = window.localStorage.getItem('turn')
    // Si tengo algo en el storage, retorna ese valor sino el valor de X
    return turnFormStorage ?? TURNS.X
  });



  const [winner , setWinner] = useState(null) //Null no hay ganador , false : empate



  // Funcion encargada de actualizar estados , turnos etc
  const updateBoard = (index) =>{
    // Si la pósicion tiene algo, no actualizo !!
    if(board[index] || winner )return

    // Actualizo el board
    const newBoard = [...board];
    newBoard[index] = turn
    setBoard(newBoard)
    
    // Actualizo turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Guardamos aqui la partida, UTILIZAMOS el metetod JSON.stringify para poder guardar el json en el localstorage
    window.localStorage.setItem('board' , JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)


    // Revisamos si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
      confetti()
    } else if(checkEndGame(newBoard)){
      setWinner(false) //empate
    }


  }

  // Seteamos el game
  const resetGame =()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');

  }

  // USE EFFECT
  useEffect( ()=>{
    console.log('cambio el turno')
  }, [turn])
  
  return (
    <main className='board'>
      <h1>Tic-tac-toe</h1>
      <button onClick={resetGame}>Reset del juego</button>

      {/* TABLA DE JUEGO */}
      <BoardTabl board={board} updateBoard={updateBoard} />

      {/* Mostrar en pantalla el turno */}
      <Turn turn={turn} />
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
