import React, {FC} from "react";
import {Grid, Button, styled} from "@mui/material"
interface GridOperationButtonProps {
    operation:string;
    selectOperation:(operation:string)=> void;
    selectedOperation: string
}
const StyledButton = styled(Button)<{selected:boolean}>((props)=>({
backgroundColor:"rgb(254,241,73, .1)",
borderColor: props.selected? "#fff":"rgb(254,241,73,.1)"
}));
export const GridOperationButton: FC <GridOperationButtonProps>=({
    operation,
    selectOperation,
    selectedOperation
}) =>{
    return(
        <Grid item>
            <StyledButton selected={selectedOperation === operation} fullWidth variant="outlined" onClick={()=>selectOperation(operation)}>{operation}</StyledButton>
        </Grid>
    )
}