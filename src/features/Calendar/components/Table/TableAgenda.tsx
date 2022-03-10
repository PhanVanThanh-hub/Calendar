import React from 'react';
import { Box } from '@chakra-ui/react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
    Table,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/react';

import moment from 'moment';

import {Event,Day,Month} from '../../../../models/Event'; 

interface TableMonthProps{
    month:number,
    event:Event[],
    dayEvent:Day[],
    monthEvent:Month[]

}

interface EventProps{
    list:Event[]
}

interface CalendarProps{
    list:[
        {
            day:string,
            list:Event[],
        }
    ]
     
}


export default function  TableAgenda({month,event,dayEvent,monthEvent}:TableMonthProps){
    const value = moment().add(0, 'M');
    const monthDisplay = value.format('MMMM')

    var currentDate = moment();
    var weekStart = currentDate.clone().startOf('week');

    const eventInWeek:EventProps={
        list:[]
    }
    const days :any[]= [];
    for (var i = 0; i <= 6; i++) {
            days.push(moment(weekStart).add(i, 'days').format("DD"));
    }

    const eventOfMonth =[""]
    const index = monthEvent.findIndex(item=>item.month===monthDisplay)

    //lấy id của các event trong 1 tuần

    if(index>=0){
        monthEvent[index].id.map((value,index)=>{
            const index1 = dayEvent.findIndex(item=>item.id===value && days.includes(item.day)===true )
            if(index1>=0){
                eventOfMonth.push(...dayEvent[index1].listId)
            }
        })
    }
     
    eventOfMonth.map((value)=>{
        const index = event.findIndex(item =>item.id === value)
        if(index>=0){
            eventInWeek.list.push(event[index])
        }
    })

    //gom các event có chung 1 ngày thành 1 object.
    const calendarA:CalendarProps= {
        list:[
            {
                day:"",
                list:[]
            }
        ]
         
    }
    
    //sắp xếp theo giờ
    eventInWeek.list.sort(function(a,b) {return (parseInt(a.startTime.split(":")[0]) > parseInt(b.startTime.split(":")[0])) ? 1 : ((parseInt(b.startTime.split(":")[0]) > parseInt(a.startTime.split(":")[0])) ? -1 : 0);} );
    
    eventInWeek.list.map((value)=>{
        const index= calendarA.list.findIndex(item=> item.day===value.dayEvent)
        if(index >=0){
            calendarA.list[index].list.push(value)
        }
        else{
            const dayCalendar = {
                day :value.dayEvent,
                list:[value]
            }
            calendarA.list.push(dayCalendar)
        }
    })
    // sắp xếp theo ngày
    calendarA.list.sort(function(a,b) {return (a.day > b.day) ? 1 : ((b.day > a.day) ? -1 : 0);} );

    console.log("hehe:",calendarA)
    calendarA.list.shift();

    return(
        <Box sx={{    border:"1px solid rgb(227, 242, 253)",borderRadius:"8px"}}>
            <div style={{paddingBottom: "24px",padding: "20px"}}>
                <Table sx={{border:"1px solid #ddd"}}>
                    <Tbody  >
                        {calendarA.list.map((value,index)=>{
                           
                            return(
                                <> 
                                    <Tr key={index} sx={{border:"1px solid #ddd",backgroundColor:"#f5f5f5"}}>
                                        <Th colSpan={3} scope="colgroup" sx={{"& div":{
                                            padding: "8px 14px",textTransform: "none",
                                            "& ::after":{
                                                content:'" "" "',
                                                clear: "both",
                                                display: "table",
                                            },
                                            "& a":{
                                                textTransform: "none",fontSize:"0.875rem"
                                            }
                                        }}} >
                                            <div>
                                                <a style={{float: "left"}}> 
                                                    {value.day}
                                                </a>
                                                <a style={{float: "right"}}> 
                                                    {value.day}
                                                </a>
                                            </div>
                                        </Th>
                                    </Tr>
                                    {
                                        value.list.map((value1,index1)=>{
                                            return(
                                                <Tr key={index1} sx={{border:"1px solid #ddd","& td":{
                                                     
                                                }}}>
                                                    <Td sx={{paddingLeft: "35px" ,whiteSpace: "nowrap",width: "1px"}}>
                                                        {value1.startTime} - {value1.endTime}
                                                    </Td>
                                                    <Td sx={{whiteSpace: "nowrap",width: "1px",padding: "8px 14px"  }}>
                                                        <FiberManualRecordIcon 
                                                            sx={{color: value1.color 
                                                                ,height:"0.875rem",width:"0.875rem"}}/>
                                                    
                                                    </Td>
                                                    <Td sx={{padding: "8px 14px"  }} >
                                                        <a>{value1.title}</a>
                                                    </Td>
                                                </Tr>
                         
                                            )
                                        })
                                    }
                                </>
                            )
                             
                        }
                            
                        )}
                         
                         
                    </Tbody>
                </Table>
            </div>
        </Box>
    )
}