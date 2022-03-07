import React from 'react';
 
import { Box } from '@chakra-ui/react';
import moment from 'moment';

import TableMonth from '../components/TableMonth';
import TableWeek from '../components/TableWeek';
import TableAgenda from '../components/TableAgenda';
export default function CalendarPage(){
    const value = moment();
    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");
    const day = startDay.clone().subtract(1,"day");

    console.log("startDay:",startDay)
    console.log("endDay:",endDay)
    console.log("day:",day)

    const calendar =[]

    while(day.isBefore(endDay,"day")){
        calendar.push(
            Array(7)
                .fill(0)
                .map(()=>day.add(1,"day").clone())
        )
    }

    console.log("calendar:",calendar)
    return(
        <Box sx={{padding:"20px"}}>
            {/* <TableMonth/> */}
            <TableAgenda/>
            {/* <TableWeek/> */}
            {/* {calendar.map((week)=>(
                <div>
                    {week.map((day)=>(
                        <div>{day.format("D").toString()}</div>
                    ))}
                </div>
            ))}          */}
        </Box>
    )
}