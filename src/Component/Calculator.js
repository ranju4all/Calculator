import React, {useState} from 'react'
import { pdf } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';
import saveAs from 'file-saver';

function Calculator(props) {
    const [result, setResult] = useState("");
    const [userInput, setUserInput] = useState("");
    const [enable,setEnable] = useState(true);
    
    //const dispatch = useDispatch();

    const handleClick = (e) => {
      if (userInput.substr(userInput.length - 1) === e.target.name && ['/', '*', '-', '+', '.', '+-'].includes(e.target.name))
      return;
      if(['/', '*', '-', '+', '.', '+-'].includes(e.target.name)){
        let inputRows = userInput.split('\n'); 
        let previousValue = inputRows.splice(inputRows.length - 2, 1).join("");
        if (!['/', '*', '-', '+', '.', '+-'].includes(previousValue.substr(previousValue.length -1)) && userInput.split('\n').length > 1 && inputRows.splice(inputRows.length - 1, 1).join("").length == 0) {
          setUserInput(userInput.concat(`${previousValue.trim()} ${e.target.name} \n`))
        } else {
          setUserInput(userInput.concat(` . ${e.target.name} \n`))
        }
      } else {
        setUserInput(userInput.concat(e.target.name))
      }
      autoScrollTextArea();
    }

    const handleTextArea =(e) => {
        let tempName = e.target.value.substr(e.target.value.length - 1)
        if(tempName === '=') calculate(e);
        if (!['/', '*', '-', '+', '.', '+-', '1','2','3','4','5','6','7','8','9','0'].includes(tempName))
        return;
        if (userInput.substr(userInput.length - 1) === tempName && ['/', '*', '-', '+', '.', '+-'].includes(tempName))
        return;
        if(['/', '*', '-', '+', '.', '+-'].includes(tempName)){
          let inputRows = userInput.split('\n'); 
          let previousValue = inputRows.splice(inputRows.length - 2, 1).join("");
          if (!['/', '*', '-', '+', '.', '+-'].includes(previousValue.substr(previousValue.length -1)) && userInput.split('\n').length > 1 && inputRows.splice(inputRows.length - 1, 1).join("").length == 0) {
            setUserInput(userInput.concat(`${previousValue.trim()} ${tempName} \n`))
          } else {
            setUserInput(userInput.concat(` . ${tempName} \n`))
          }
        } else {
          setUserInput(userInput.concat(tempName));
        }
    }

    const clear = () => {
      setUserInput("");
      setResult("");
      setEnable(true);
    }

    const backspace = () => {
        setUserInput(userInput.slice(0,userInput.length - 1));
    }

    const calculate = (e) => {
        try{
          let latestInput = userInput.split("\n----------\n");
          let inputValue = latestInput.splice(latestInput.length - 1, 1).join("").split(" . ").join("");
          let finalInput = eval(inputValue).toString();
          setResult(finalInput);
          setUserInput(userInput.concat(` . ${e.target.name}`) + "\n----------\n" + finalInput + " .   \n");
          if(finalInput !== "" ){
            setEnable(false);
          }
          autoScrollTextArea();
         } catch(err){
          setResult("Error");
         }
    }

    const autoScrollTextArea = () => {
      const textArea = document.getElementById("userInputArea");
      textArea.scrollTop = textArea.scrollHeight;
    }

    const print = async (e) => {
      const blob = await pdf((
          <PdfDocument
              pdfDocumentData={userInput}
          />
      )).toBlob();
      saveAs(blob, 'printed history');
  };

    return (
        
        
        <div className ="container"> 
        <div>
            <span className = "calculator">Calculator</span>
            <span className="close" onClick={() => {
                    props.toggleFunction()}}>X</span>
        </div>
            <form>
                <textarea type="text" value={userInput} onChange={handleTextArea} id="userInputArea" />
                <input type="text" value={result}  />
            </form>
            <div className="keypad">
                <button onClick={backspace} id="backspace">Backspace</button>
                <button onClick={backspace} id="CE">CE</button>
                <button onClick={clear} id="Clear">C</button>
                <button name="7" onClick={handleClick}>7</button>
                <button name="8" onClick={handleClick}>8</button>
                <button name="9" onClick={handleClick}>9</button>
                <button name="/" onClick={handleClick}>/</button>
                <button name="4" onClick={handleClick}>4</button>
                <button name="5" onClick={handleClick}>5</button>
                <button name="6" onClick={handleClick}>6</button>
                <button name="*" onClick={handleClick}>*</button>
                <button name="1" onClick={handleClick}>1</button>
                <button name="2" onClick={handleClick}>2</button>
                <button name="3" onClick={handleClick}>3</button>
                <button name="-" onClick={handleClick}>-</button>
                <button name="0" onClick={handleClick}>0</button>
                <button name="+-" onClick={handleClick}>+-</button>
                <button name="." onClick={handleClick}>.</button>
                <button name="+" onClick={handleClick}>+</button>
                <button disabled={enable} onClick = {() => {
                    props.toggleFunction()
                    props.updateTotalValue(result)}} id="transfer">Transfer</button>
                <button disabled={enable} onClick={print} id="print">Print</button>
                <button name="=" onClick={calculate} id="result">=</button>
                <button onClick={() => {
                    props.toggleFunction()}} id="cancel">Cancel</button>
            </div>
        </div>
        
    )
}

export default Calculator
