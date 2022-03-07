import React from 'react';
 
import { Box } from '@chakra-ui/react';
import moment from 'moment';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/react';
export default function TableWeek(){
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf('week');
    const days :any[]= [];

    for (var i = 0; i <= 6; i++) {
        days.push(moment(weekStart).add(i, 'days').format("ddd MM/D"));
    }
    
    const hours=["all-day","12am","1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am",
                "12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm","10pm","11pm"]
     
    return(
        <Table variant='simple'>
            <Thead>
                <Tr>
                <Th sx={{ border: "1px solid #ddd",textAlign:"center",textTransform: "none",fontSize:"1rem"}}></Th>
                {
                    days.map((value,index)=>
                        <Th sx={{ border: "1px solid #ddd",textAlign:"center",textTransform: "none",fontSize:"1em"}} key={index}>{value}</Th>
                    )
                }
                </Tr>
            </Thead>
            <Tbody sx={{overflow:"hidden scroll",height:"200px",width:"100%"}} >
                
                {
                    hours.map((value,index)=>{
                        return(
                            <Tr   key={index}>
                    
                                <Td sx={{ border: "1px solid #ddd",textAlign:"center",textTransform: "none",fontSize:"1em"}}>{value}</Td>   
                                {    
                                    days.map((value1,index)=>
                                        <Td sx={{ border: "1px solid #ddd",textAlign:"center",textTransform: "none",fontSize:"1em"}} key={index}></Td>
                                    )
                                }
                            </Tr>
                        )
                    }
                    
                    )
                }
                 
                {/* <Tr sx={{backgroundColor:"yellow",width:"1000px"}}>
                    
                        <Td></Td>   
                    {    
                        days.map((value,index)=>
                            <Td sx={{ border: "1px solid #ddd",textAlign:"center",textTransform: "none",fontSize:"1em"}} key={index}></Td>
                        )
                    }
                    <Td sx={{backgroundColor:"yellow"}}>
                        <div style={{    position: "relative",overflow: "hidden",direction: "ltr",}}> 
                        <div style={{overflow:"hidden scroll", top: "0",right: "0",left: "0",bottom: "0",}}>
                            <div style={{width: "100%",position: "relative",zIndex: "1",minHeight: "100%",backgroundColor:"red"}}>
                                <div style={{position: "relative",zIndex:"1"}}>
                                    <Table sx={{width: "100%",backgroundColor:"blue"}}>
                                        <colgroup>
                                            <col style={{width: "49px"}}/>
                                        </colgroup>
                                        <Tbody>
                                            {hours.map((value,index)=>
                                                <Tr key={index}>
                                                    <Td sx={{height: "1.5em"}}>
                                                        <div style={{textAlign:"right"}}>
                                                            <div style={{padding: "0 4px",    display:" inline-block",whiteSpace: "nowrap"}}>
                                                                {value}
                                                            </div>
                                                        </div>
                                                    </Td>
                                                    <Td sx={{height: "1.5em",borderBottom: "0"}}>

                                                    </Td>
                                                </Tr>
                                            )}
                                        </Tbody>
                                    </Table>
                                </div>
                                <div style={{position: "absolute",top: "0",left: "0",right: "0",bottom: "0",}}>
                                    <Table sx={{width:"778px",height: "100%"}}>
                                        <colgroup>
                                            <col style={{width: "49px"}}/>
                                        </colgroup>
                                        <Tbody>
                                            <Tr>
                                                {
                                                    days.map((value,index)=>
                                                        <Td sx={{ border: "1px solid #ddd",textAlign:"center",textTransform: "none",fontSize:"1em"}} key={index}> </Td>
                                                    )
                                                }
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                        </div>
                    </Td>
                </Tr> */}
                
            </Tbody>
            
        </Table>
    )
}