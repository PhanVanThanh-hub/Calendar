import React  from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/react';
 
import moment from 'moment';

import {Event} from '../../../../models/Event'; 

import {useAppDispatch, useAppSelector } from '../../../../app/hooks';

import {MonthChoose,CalendarActions,DayEvent,ListDayEvent,ListMonthEvent} from '../../CalendarSlice';

interface EventProps{
    list:Event[]
}

export default function TableMonth(){

    const dispatch = useAppDispatch();
 

    //
    const month = useAppSelector(MonthChoose);
    const event = useAppSelector(DayEvent);
    const dayEvent = useAppSelector(ListDayEvent);
    const monthEvent = useAppSelector(ListMonthEvent);

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
    const onClickDate=(dayChoose:string)=>{
        dispatch(CalendarActions.statusAddEvent(true))
        dispatch(CalendarActions.dayAddEvent(dayChoose))
    }
    
    const openPreview=(values:Event):void=>{
        dispatch(CalendarActions.statusPreviewEvent(true))
        dispatch(CalendarActions.EventPreview(values))
    }
 
    
    const eventOfMonth =[""]
    const monthDisplay = value.format('MMMM')

    //lấy object month đang hiển thị
    const index = monthEvent.findIndex(item=>item.month===monthDisplay)
    
    if(index>=0){
        
        //Lấy id các ngày có event trong tháng
        monthEvent[index].id.map((value,index)=>{
            const index1 = dayEvent.findIndex(item=>item.id===value)
            if(index1>=0){
                eventOfMonth.push(...dayEvent[index1].listId)
            }
        })
    }
 
    const eventOfDay:EventProps={
        list:[]
    }
 
    //Lấy  sự kiện diễn ra trong tháng
    eventOfMonth.map((value,index)=>{
        const index2=  event.findIndex(item=>item.id===value)
        if(index2>=0){
            eventOfDay.list.push(event[index2])
        }
    })
     
    // eventOfDay.shift();
    

    return(
        <> 
        <Table variant='simple' sx={{widthL:"913px"}}>
            
            <Thead>
                <Tr role="row">
                {
                    day1.map((value,index)=>
                        <Th  role="columnheader" sx={{ border: "1px solid #ddd",textAlign:"center",textTransform: "none",fontSize:"1rem"}} key={index}>
                            <div>
                                <a style={{color: "rgb(33, 33, 33)",padding: "16px"}}>
                                    {value}
                                </a>
                            </div> 
                        </Th>
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
                           
                            const dayChoose = day.format("MMMM-DD-yyy")
                             
                            const eventInDay:EventProps={
                                list:[]
                            }
                            eventOfDay.list.map((value,index)=>{
                                if(value.dayEvent===dayChoose){
                                    eventInDay.list.push(value)
                                }
                            })
                            return(
                            <Td key={indexWeek} 
                                sx={{ border: "1px solid #ddd",textAlign:"center",padding:"0px",height:"100px",}} 
                                // onClick={()=>onClickDate(dayChoose)}
                              
                                
                            >
                                 
                                <div style={{position: "relative",minHeight: "100%",opacity: monthDay===monthNow ? "1": "0.3"}}>
                                    <div onClick={()=>onClickDate(dayChoose)}>
                                        <a style={{textAlign: "center",marginTop: "12px",marginBottom: "12px",
                                                position: "relative",zIndex: "4",padding: "4px"     
                                            }}
                                        >
                                            {day.format("D").toString()}
                                        </a>
                                    </div>
                                    <div style={{position: "relative",minHeight: "2em"}}>
                                    {
                                        eventInDay.list.map((value,index)=>{
                                            return(
                                                <div  key={index}
                                                    style={{fontSize: "0.85em",padding: "2px 3px 0",width:"100%",backgroundColor:value.background }}
                                                    onClick={()=>openPreview(value)}
                                                >
                                                    <a style={{marginLeft: "4px",marginBottom: "6px",borderRadius: "6px",width:"100%",overflow:"hidden",
                                                        borderColor: "rgb(198, 40, 40)" ,color:value.color}}>
                                                        {value.startTime}:{value.title}
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            </Td>
                            )
                        })}
                    </Tr>
                ))} 
                
            </Tbody>
            
        </Table>
         
        </>
    )
}
