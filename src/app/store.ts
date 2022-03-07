import { configureStore,combineReducers } from '@reduxjs/toolkit';
import CalendarReducer from '../features/Calendar/CalendarSlice';
const rootReducer =  combineReducers({
    calendar :CalendarReducer,
 
})

export const store = configureStore({
    reducer: rootReducer,

});

 
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

