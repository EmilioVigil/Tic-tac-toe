import React from "react"


export const Square = ({children , isSelected , updateBoard , index})=>{
    const className= `square ${isSelected ? 'is-selected'  :  ''} `
    
    const handleClick = ()=>{
      updateBoard(index)
    }
    
    return(
      <div onClick={handleClick} className={className}>
        {
          children
        }
      </div>
    )
  }


export default Square;