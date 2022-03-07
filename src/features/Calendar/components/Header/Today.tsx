import React from 'react';
 
import { Button} from '@chakra-ui/react';

import { useAppDispatch } from '../../../../app/hooks';
import {CalendarActions } from '../../CalendarSlice';

export default function TodayButton(){
    const dispatch = useAppDispatch();

 

    const ChooseToday =(filed:number):void=>{
        dispatch(CalendarActions.statusChooseMonth(filed));
    }
    
    return(
        <Button 
            sx={{border: "1px solid rgba(33, 150, 243, 0.5)",color:"rgb(33, 150, 243)",padding:"5px 15px"}}
            onClick={()=>ChooseToday(0)}
        >
            Today
        </Button>              
    )
}