import React, {FC} from "react";
import {Grid, Button} from "@mui/material"
interface GridDigitButtonProps {
    digit:string;
    enterDigit:(digit:string)=>void;
    xs?: number
}
export const GridDigitButton :FC <GridDigitButtonProps>=({
    digit, 
    enterDigit,
    xs
}) =>{
    return(
        <Grid item xs={xs}>
            <Button fullWidth variant="outlined" onClick={()=>enterDigit(digit)}>
                {digit}
            </Button>
        </Grid>
    )
}