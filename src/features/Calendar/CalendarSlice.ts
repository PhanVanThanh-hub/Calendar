import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import { Event,Month,Day} from '../../models/Event';

 
interface InviteeState {
    monthNow:number,
    table:number,
    addEvent:{
        status:boolean,
        day:string,
         
    },
    statusPreview:boolean,
    detail:Event[],
    month:Month[],
    day:Day[],
    preview:Event,
  
}
 
var initialState :InviteeState={
    monthNow:0,
    table:0,
    addEvent:{
        status:false,
        day:"",
    },
    statusPreview:false,
    detail:[
        {
            title:"",
            detail:"",
            background:"",
            color:"",
            dayEvent:"",
            startTime:"",
            endTime:"",
        }
    ],
    month:[{
        month:"",
        id:[],
    }],
    day:[
        {
        id:"",
        day:"",
        listId:[]
        }
    ],
    preview:{
        title:"",
        detail:"",
        background:"",
        color:"",
        dayEvent:"",
        startTime:"",
        endTime:"",
    }

    
   
}

function randomId(length:number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
   }
   return result;
}



const CalendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {

        statusChooseMonth(state, action:PayloadAction<number>){
            if(action.payload===0){
                state.monthNow=0
            }
            else{
                state.monthNow +=action.payload;
            }
             
        },
        statusChooseTable(state , action:PayloadAction<number>){
            state.table = action.payload
        },
        statusAddEvent(state , action:PayloadAction<boolean>){
            state.addEvent.status = action.payload
        },
        dayAddEvent(state , action:PayloadAction<string>){
            state.addEvent.day=action.payload
        },
        confirmAddEvent(state,action:PayloadAction<Event>){
            const date=action.payload.dayEvent.split("-");
            

            //tạo ramdom id 
            const idDay = randomId(8)
            const idEvent=randomId(8)

            //Kiểm tra xem obj của tháng đó đã có chưa
            const index = state.month.findIndex(item =>(item.month===date[0]))
            if(index>=0){
                 
                //check xem day co id nằm trong month.id hay chưa,nếu chưa thì thêm idday vào list id của month và tạo 
                //1 day mới 
                var right=0; //Có rồi thì return 0 ,chưa thì return 1
                var whatDay=-1;//Kiểm tra xem đó đó là ngày bao nhiêu
                state.month[index].id.map((value,index)=>{
                    let index1=state.day.findIndex(item =>(item.id===value && date[1]=== item.day))
                    if(index1>=0){
                        whatDay=index1
                        right=1;
                        return;
                    }
                })
                if(right===0){
                    state.month[index].id.push(idDay);
                    const newDay={
                        id:idDay,
                        day:date[1],
                        listId:[idEvent]
                    }
                    state.day.push(newDay)
                }
                else{
                    state.day[whatDay].listId.push(idEvent)
                }
            }
            else{ //nếu chưa có thì tạo new month kèm new day
                const newMonth = {
                    month:date[0],
                    id:[idDay]
                }
                state.month.push(newMonth)
                const newDay={
                    id:idDay,
                    day:date[1],
                    listId:[idEvent]
                }
                state.day.push(newDay)
            }
            //Tạo event
            action.payload["id"]=idEvent 
            state.detail.push(action.payload)
            state.addEvent.status=false
        },
        statusPreviewEvent(state , action:PayloadAction<boolean>){
            state.statusPreview = action.payload
        },
        EventPreview(state,action:PayloadAction<Event>){
            state.preview=action.payload
            
        },
        deleteEvent(state,action:PayloadAction<Event>){
            const index = state.detail.findIndex(item => item.id === action.payload.id)
            state.detail.splice(index, 1);
            state.statusPreview=false
        },
        editEvent(state,action:PayloadAction<Event>){
            const index = state.detail.findIndex(item => item.id === action.payload.id)
            state.detail[index] = {...action.payload}
            state.statusPreview=false
        }
        


         
    },
})

export const CalendarActions = CalendarSlice.actions;

//Selectors
export const MonthChoose = (state: RootState) => state.calendar.monthNow;
export const TableChoose = (state: RootState) => state.calendar.table;
export const AddEvent = (state: RootState) => state.calendar.addEvent.status;
export const DayAddEvent = (state: RootState) => state.calendar.addEvent.day;
export const DayEvent = (state: RootState) => state.calendar.detail;
export const ListDayEvent = (state: RootState) => state.calendar.day;
export const ListMonthEvent = (state: RootState) => state.calendar.month;
export const StatusPreview = (state: RootState) => state.calendar.statusPreview;
export const EventPreview = (state: RootState) => state.calendar.preview;

//reducer
const CalendarReducer = CalendarSlice.reducer
export default CalendarReducer
 