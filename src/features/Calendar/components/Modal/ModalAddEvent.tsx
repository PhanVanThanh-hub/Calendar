import React from 'react';
import {
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,

} from '@chakra-ui/react'


import FormAdd from '../Form/FormAddEvent';
import {Event} from '../../../../models/Event';

import { useAppSelector,useAppDispatch } from '../../../../app/hooks';
import {DayAddEvent,CalendarActions} from '../../CalendarSlice';
export interface ModalProps{
    closeAddEvent?: ()=> void,
}

export default function ModalAddEvent({closeAddEvent}:ModalProps){
    const dispatch = useAppDispatch();
    //
    const day = useAppSelector(DayAddEvent);
    //
    const initalValues: Event = {
        title:"",
        detail:"",
        background:"blue",
        color:"gray",
        startTime:"",
        endTime:"",
        dayEvent:day,
    }  
    const handleFormSubmit = async (values: Event) => {
        dispatch(CalendarActions.confirmAddEvent(values))
    };
    return(
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader sx={{textAlign:"center"}}>{day}</ModalHeader>
          
                <ModalBody> 
                    <FormAdd title="Add Event" initalValues={initalValues} onSubmit={handleFormSubmit}/>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={closeAddEvent}>
                        Close
                    </Button>
                    
                </ModalFooter>
            </ModalContent>
             
        </>
    )
}