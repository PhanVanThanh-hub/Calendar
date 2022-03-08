import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

 
interface InviteeState {
    monthNow:number,
    table:number,
    addEvent:{
        status:boolean,
        day:string,
    },
  
}
 
var initialState :InviteeState={
    monthNow:0,
    table:0,
    addEvent:{
        status:false,
        day:"",
    },
    
   
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
            state.addEvent.day = action.payload
        },

         
    },
})

export const CalendarActions = CalendarSlice.actions;

//Selectors
export const MonthChoose = (state: RootState) => state.calendar.monthNow;
export const TableChoose = (state: RootState) => state.calendar.table;
export const AddEvent = (state: RootState) => state.calendar.addEvent.status;
export const DayAddEvent = (state: RootState) => state.calendar.addEvent.day;
//reducer
const CalendarReducer = CalendarSlice.reducer
export default CalendarReducer
 