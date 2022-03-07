import React from 'react';

import { Button, Text } from '@chakra-ui/react';
import moment from 'moment';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useAppDispatch,useAppSelector } from '../../../../app/hooks';
import {CalendarActions,MonthChoose } from '../../CalendarSlice';

export default function ChooseTime(){

    const dispatch = useAppDispatch();

    const month = useAppSelector(MonthChoose);

    const changeMonth =(filed:number):void=>{
        dispatch(CalendarActions.statusChooseMonth(filed));
    }
    
    const monthNow = moment().add(month, 'M').format('YYYY-MMMM ');
    return(
        <div style={{display: "flex",flexDirection: "row",alignItems: "center",}}>
            <Button 
                sx={{borderRadius:"50%" ,color: "rgba(0, 0, 0, 0.54)",backgroundColor: "transparent"}}
                onClick = {()=>changeMonth(-1)}
            >
                <ArrowBackIosNewIcon sx={{ width: "12px",height: "24px",}}/>
            </Button>
            <Text sx={{fontSize:"1.25rem",fontWeight: "600"}}>
                {monthNow}
            </Text>
            <Button 
                sx={{borderRadius:"50%" ,color: "rgba(0, 0, 0, 0.54)",backgroundColor: "transparent"}}
                onClick = {()=>changeMonth(1)}
            >
                <ArrowForwardIosIcon sx={{ width: "12px",height: "24px" }}/>
            </Button>
        </div>
    )
}