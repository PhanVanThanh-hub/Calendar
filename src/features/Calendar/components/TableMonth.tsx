import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from '@chakra-ui/react';
import moment from 'moment';
export default function TableMonth(){
    const day1 =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    
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
        <Table variant='simple'>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
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
                {calendar.map((week)=>(
                    <Tr >
                        {week.map((day)=>(
                            <Td sx={{ border: "1px solid #ddd",textAlign:"center"}}>
                                 
                                <div style={{position: "relative",minHeight: "100%"}}>
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

                        ))}
                    </Tr>
                ))} 
                
            </Tbody>
            
        </Table>
    )
}
