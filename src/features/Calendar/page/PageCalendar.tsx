import React from 'react';
 
import { Box } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import {
    Modal,
    
} from '@chakra-ui/react';

import TodayButton from '../components/Header/Today';
import ChooseTime from '../components/Header/ChooseTime';
import ChooseTable from '../components/Header/ChooseTable';

import TableMonth from '../components/Table/TableMonth';
import TableWeek from '../components/Table/TableWeek';
import TableAgenda from '../components/Table/TableAgenda';

import ModalAddEvent from '../components/Modal/ModalAddEvent';
import ModalPreviewEvent from '../components/Modal/ModalPreview';

import { useAppSelector,useAppDispatch } from '../../../app/hooks';
import {TableChoose,AddEvent,CalendarActions,StatusPreview,EventPreview} from '../CalendarSlice';
 
export default function CalendarPage(){
    
    const dispatch = useAppDispatch();

    //
    const table = useAppSelector(TableChoose);
    const open = useAppSelector(AddEvent);
    const openPreview = useAppSelector(StatusPreview);
    const eventPreview = useAppSelector(EventPreview);

    //
    const closeAddEvent =():void=>{

        dispatch(CalendarActions.statusAddEvent(false))
    }

    const closePreview =():void=>{

        dispatch(CalendarActions.statusPreviewEvent(false))
    }

    return(
        <>
            <Box sx={{margin:"20px"}}> 
                <Grid templateColumns='repeat(3, 1fr)' sx={{alignItems: "center",justifyContent: "space-between",display: "flex",}}>
                    <GridItem>
                        <TodayButton/>
                    </GridItem>
                    <GridItem>
                        <ChooseTime/>
                    </GridItem>
                    <GridItem>
                        <ChooseTable/>
                    </GridItem>
                </Grid>
            </Box>
            <Box sx={{margin:"20px",border:"1px solid red",borderRadius:"12px"}}>
                <Box sx={{margin:"20px" }}>
                    {
                        table===0? <TableMonth/> :
                        table===1? <TableWeek/>  : <TableAgenda/>
                    }
                     
                </Box>
                
            </Box>
            <Modal isOpen={open} onClose={closeAddEvent}>
                
                <ModalAddEvent closeAddEvent={closeAddEvent}/>
            </Modal>
            <Modal isOpen={openPreview} onClose={closePreview}>
                <ModalPreviewEvent closePreview={closePreview} eventPreview={eventPreview}/>
            </Modal>
       
        </>
    )
}