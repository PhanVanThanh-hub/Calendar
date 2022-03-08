import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/react';
import moment from 'moment';


import {useAppDispatch, useAppSelector } from '../../../../app/hooks';

import {MonthChoose,CalendarActions} from '../../CalendarSlice';

export default function TableMonth(){

    const dispatch = useAppDispatch();

    const month = useAppSelector(MonthChoose);


    const day1 =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] 

    //Tao lich trong thang
    const value = moment().add(month, 'M');
    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");
    const day = startDay.clone().subtract(1,"day");

    const calendar =[]
    while(day.isBefore(endDay,"day")){
        calendar.push(
            Array(7)
                .fill(0)
                .map(()=>day.add(1,"day").clone())
        )
    }

    //Function
    const onClickDate=({dayChoose}:any)=>{
        dispatch(CalendarActions.statusAddEvent(true))
        dispatch(CalendarActions.dayAddEvent(dayChoose))
    }
    

    return(
        <Table variant='simple' >
            
            <Thead>
                <Tr>
                {
                    day1.map((value,index)=>
                        <Th sx={{ border: "1px solid #ddd",textAlign:"center",textTransform: "none",fontSize:"1rem"}} key={index}>{value}</Th>
                    )
                }
                </Tr>
            </Thead>
            <Tbody>
                {calendar.map((week,index)=>(
                    <Tr key={index} >
                        {week.map((day,indexWeek)=>{
                            var monthNow =  value.format('MMMM');

                            var monthDay =  day.format('MMMM');
                           
                            const dayChoose = day.format("MMM-DD")
                          
                            return(
                            <Td key={indexWeek} sx={{ border: "1px solid #ddd",textAlign:"center"}} onClick={()=>onClickDate({dayChoose})}>
                                 
                                <div style={{position: "relative",minHeight: "100%",opacity: monthDay===monthNow ? "1": "0.3"}}>
                                    <div>
                                        <a style={{textAlign: "center",marginTop: "12px",marginBottom: "12px",
                                                position: "relative",zIndex: "4",padding: "4px"     
                                            }}
                                        >
                                            {day.format("D").toString()}
                                        </a>
                                    </div>
                                    <div style={{position: "relative",minHeight: "2em"}}>
                                        <div style={{fontSize: "0.85em",padding: "2px 3px 0"}}>

                                        </div>
                                    </div>
                                </div>
                            </Td>
                            )
                        })}
                    </Tr>
                ))} 
                
            </Tbody>
            
        </Table>
    )
}
