import { useState } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import "./style.css"
export default function MainTenzies(){
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice(){
    return new Array(10)
    .fill(0)
    .map(() =>({
     value: Math.ceil(Math.random() * 6),
     isHeld: false,
     id: nanoid()
    }
    ))
    }
    function rollDice(){
      setDice(oldDice => oldDice.map(die => die.isHeld ? die: {...die, value:Math.ceil(Math.random() * 6) }))
    }

    function hold(id){
      setDice(oldDice =>{
        return oldDice.map((die) =>{
          return die.id === id ?
          {...die, isHeld: !die.isHeld}:
          die
        })
      })
    }

      const endGame =  dice.every(ele => ele.value==dice[0].value && ele.isHeld==true)
    
    const diceElement = dice.map(dieObj => <Die key={dieObj.id} id={dieObj.id} isHeld={dieObj.isHeld} hold={() => hold(dieObj.id)} value={dieObj.value} />)
  return(
  <main>
  <div className="dice-container">
    {diceElement}
    </div>
    <button className="roll-dice" onClick={rollDice}>{endGame ? "New Game": "Roll"}</button>
    </main>
  )
}