import Square from "./square"
import { TURNS } from '../Logic/constans.js'
import '../App.css'

export function Turn( { turn  } ){
    return(
        <section className='turn'>
            <Square isSelected={ turn === TURNS.X }>
            {TURNS.X}
            </Square>
        
            <Square isSelected={ turn === TURNS.O }>
            {TURNS.O}
            </Square>
    </section>
    )
}