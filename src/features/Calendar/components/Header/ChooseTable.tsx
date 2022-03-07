import React from 'react';

import { Button, ButtonGroup} from '@chakra-ui/react';
import GridViewIcon from '@mui/icons-material/GridView';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import { useAppDispatch,useAppSelector } from '../../../../app/hooks';
import {CalendarActions,TableChoose } from '../../CalendarSlice';

export default function ChooseTable(){

    const dispatch = useAppDispatch();

    const table= useAppSelector(TableChoose);

    const changeTable =(filed:number):void=>{
        dispatch(CalendarActions.statusChooseTable(filed));
    }
    return(
        <ButtonGroup spacing='0'>
            <Button onClick={()=>changeTable(0)} sx={{ backgroundColor: table===0 ? "rgb(33, 150, 243)": "",color:table ===0 ? "white":" "}}>
                <GridViewIcon  />
            </Button>
            <Button onClick={()=>changeTable(1)} sx={{ backgroundColor: table===1 ? "rgb(33, 150, 243)": "",color:table ===1 ? "white":" "}}>
                <SplitscreenIcon/>
            </Button>
            <Button onClick={()=>changeTable(2)} sx={{ backgroundColor: table===2 ? "rgb(33, 150, 243)": "",color:table ===2 ? "white":" "}}>
                <FormatListNumberedIcon/>
            </Button>
        </ButtonGroup>
    )
}