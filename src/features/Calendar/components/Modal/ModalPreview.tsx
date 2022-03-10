import React from 'react';
import {
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,

} from '@chakra-ui/react'
import DeleteIcon from '@mui/icons-material/Delete';

import FormAdd from '../Form/FormAddEvent';

import {Event} from '../../../../models/Event';

import { useAppDispatch } from '../../../../app/hooks';
import {CalendarActions} from '../../CalendarSlice';


export interface ModalProps{
    closePreview?: ()=> void,
    eventPreview:Event,
}

export default function ModalPreviewEvent({closePreview,eventPreview}:ModalProps){
  

    const dispatch = useAppDispatch();

    console.log("eventPreview:",eventPreview)
    const initalValues: Event = {
        ...eventPreview
    }  
    const handleFormSubmit = async (values: Event) => {
        dispatch(CalendarActions.editEvent(values))
        
    };

    const deleteEvent = ()=>{
        dispatch(CalendarActions.deleteEvent(eventPreview))
    }

    return(
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader sx={{textAlign:"center"}}>Edit</ModalHeader>
 
                <ModalBody> 
                    <FormAdd title="Edit" initalValues={initalValues} onSubmit={handleFormSubmit}/>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={deleteEvent}>
                        <DeleteIcon/>
                    </Button>
                    <Button colorScheme='blue' mr={3} onClick={closePreview}>
                        Close
                    </Button>
                    
                </ModalFooter>
            </ModalContent>
             
        </>
    )
}