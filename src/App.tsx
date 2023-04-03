import React, {useState} from 'react';
import { Paper, styled, Container, Button, Grid } from '@mui/material';
import { GridOperationButton } from './GridOperationButton';
import { GridDigitButton } from './GridDigitButton';


const OutputContainer = styled(`div`)(({theme})=>({
  width: "100%",
  textAlign: "right",
  height: "2em",
  padding: theme.spacing(2),
  fontSize: "3em",
  overflow: "hidden",
}))
const CalulatorBase = styled(Paper)(({theme})=>({
  padding: theme.spacing(2),
  marginTop:theme.spacing(4),
  borderRadius:15,
}))

function App() {
  const [currentvalue, setCurrentValue]= useState("0");
  const [operation, setOperation]=useState("");
  const [prevalue, setPrevalue] = useState("");
  const [overwrite, setOverwrite] = useState(true);

    const clear = ()=>{
      setCurrentValue("");
      setOverwrite(true);
      setPrevalue("");
    }

    const del = ()=>{
      setCurrentValue("0");
      setOverwrite(true);
    }

    const percent = ()=>{
      const curr = parseFloat(currentvalue);
      setCurrentValue((curr/100).toString());
    }

  const enterDigit = (digit:string)=>{
    if(currentvalue[0]==="0"&& digit === "0") return;
    if(currentvalue.includes(".") && digit == ".") return;
    if(overwrite && digit !== "."){
      setCurrentValue(digit)
    }else{
      setCurrentValue(`${currentvalue}${digit}`);
    }
    setOverwrite(false);
  }
  const selectOperation = (operation:string) =>{
    if(prevalue){
      const val = calculate();
      setCurrentValue(`${val}`);
      setPrevalue(`${val}`)
    }
    else{
      setPrevalue(currentvalue);
    }
    setOperation(operation)
    setOverwrite(true);
  }

  const calculate = () =>{
    if(!prevalue || !operation) return currentvalue;
    const curr = parseFloat(currentvalue);
    const prev = parseFloat(prevalue);
    let result;
    switch (operation){
      case "÷":
       result = curr /prev
        break;
           case "+":
            result = curr + prev
             break;
             case "-":
              result = curr-prev
               break;
               case "X":
                result = curr*prev
                 break;
    }
    return result;
  }
  const equals = ()=>{
    const val = calculate();
    setCurrentValue(`${val}`)
    setPrevalue("");
    setOverwrite(true);
    setOperation("");
  }
  return (
    <Container maxWidth="sm">
      <CalulatorBase elevation={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <OutputContainer>
              {currentvalue}
            </OutputContainer>
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridOperationButton 
            operation={"AC"}
            selectOperation={clear}
            selectedOperation={operation}
            />
             <GridOperationButton 
            operation={"C"}
            selectOperation={del}
            selectedOperation={operation}
            />
             <GridOperationButton 
            operation={"%"}
            selectOperation={percent}
            selectedOperation={operation}
            />
             <GridOperationButton 
            operation={"÷"}
            selectOperation={selectOperation}
            selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={"7"} enterDigit={enterDigit} />
            <GridDigitButton digit={"8"} enterDigit={enterDigit} />
            <GridDigitButton digit={"9"} enterDigit={enterDigit} />
            <GridOperationButton 
            operation={"*"}
            selectOperation={selectOperation}
            selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={"4"} enterDigit={enterDigit} />
            <GridDigitButton digit={"5"} enterDigit={enterDigit} />
            <GridDigitButton digit={"6"} enterDigit={enterDigit} />
            <GridOperationButton 
            operation={"-"}
            selectOperation={selectOperation}
            selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={"1"} enterDigit={enterDigit} />
            <GridDigitButton digit={"2"} enterDigit={enterDigit} />
            <GridDigitButton digit={"3"} enterDigit={enterDigit} />
            <GridOperationButton 
            operation={"+"}
            selectOperation={selectOperation}
            selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={"0"} enterDigit={enterDigit} />
            <GridDigitButton digit={"."} enterDigit={enterDigit} />
            <Grid item xs={3}>
              <Button fullWidth variant='contained' onClick={equals}>=</Button>
            </Grid>
          </Grid>
        </Grid>
      </CalulatorBase>
    </Container>
  );
}

export default App;
