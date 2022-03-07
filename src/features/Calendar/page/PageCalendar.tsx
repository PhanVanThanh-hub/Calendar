import React from 'react';
 
import { Box } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
 
import moment from 'moment';

import TodayButton from '../components/Header/Today';
import ChooseTime from '../components/Header/ChooseTime';
import ChooseTable from '../components/Header/ChooseTable';

import TableMonth from '../components/Table/TableMonth';
import TableWeek from '../components/Table/TableWeek';
import TableAgenda from '../components/Table/TableAgenda';

import { useAppSelector } from '../../../app/hooks';
import {TableChoose} from '../CalendarSlice';

export default function CalendarPage(){
    
    const table = useAppSelector(TableChoose);

    console.log("table:",table)

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
        </>
    )
}