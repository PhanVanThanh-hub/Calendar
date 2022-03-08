import React from 'react';

import {
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,

} from '@chakra-ui/react'

import FormAdd from '../components/Form/FormAddEvent';
import {Event} from '../../../models/Event';

import { useAppSelector } from '../../../app/hooks';
import {DayAddEvent} from '../CalendarSlice';
export interface ModalProps{
    closeAddEvent?: ()=> void,
}

export default function ModalAddEvent({closeAddEvent}:ModalProps){

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
        console.log("values:",values)
    };
    return(
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader sx={{textAlign:"center"}}>{day}</ModalHeader>
          
                <ModalBody> 
                    <FormAdd initalValues={initalValues} onSubmit={handleFormSubmit}/>
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