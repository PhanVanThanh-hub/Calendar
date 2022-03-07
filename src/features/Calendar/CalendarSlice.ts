import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

 
interface InviteeState {
    monthNow:number,
    table:number,
  
}
 
var initialState :InviteeState={
    monthNow:0,
    table:0
   
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
        }
         
    },
})

export const CalendarActions = CalendarSlice.actions;

//Selectors
export const MonthChoose = (state: RootState) => state.calendar.monthNow;
export const TableChoose = (state: RootState) => state.calendar.table;
//reducer
const CalendarReducer = CalendarSlice.reducer
export default CalendarReducer
 