import React from 'react';
import { Box } from '@chakra-ui/react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/react';

 

export default function  TableAgenda(){
    const calendarAge =[
        {
            day:["Monday","March 7, 2022"],
            task:[
                {time:"10:30am - 1:30pm",detail:"Lunch",status:"1"}
            ]
        },
        {
            day:["Tue","March 8, 2022"],
            task:[
                {time:"1212130am - 1:30pm",detail:"Lunch",status:"2"},
                {time:"321321",detail:"Lunch",status:"3"}
            ]
        }
    ]
    
    return(
        <Box sx={{    border:"1px solid rgb(227, 242, 253)",borderRadius:"8px"}}>
            <div style={{paddingBottom: "24px",padding: "20px"}}>
                <Table sx={{border:"1px solid #ddd"}}>
                    <Tbody  >
                        {calendarAge.map((value,index)=>{
                           
                            return(
                                <> 
                                    <Tr key={index} sx={{border:"1px solid #ddd",backgroundColor:"#f5f5f5"}}>
                                        <Th colSpan={3} scope="colgroup" sx={{"& div":{
                                            padding: "8px 14px",textTransform: "none",
                                            "& ::after":{
                                                content:'" "" "',
                                                clear: "both",
                                                display: "table",
                                            },
                                            "& a":{
                                                textTransform: "none",fontSize:"0.875rem"
                                            }
                                        }}} >
                                            <div>
                                                <a style={{float: "left"}}> 
                                                    {value["day"][0]}
                                                </a>
                                                <a style={{float: "right"}}> 
                                                    {value["day"][1]}
                                                </a>
                                            </div>
                                        </Th>
                                    </Tr>
                                    {
                                        value["task"].map((value1,index1)=>{
                                            return(
                                                <Tr key={index1} sx={{border:"1px solid #ddd","& td":{
                                                     
                                                }}}>
                                                    <Td sx={{paddingLeft: "35px" ,whiteSpace: "nowrap",width: "1px"}}>
                                                        {value1.time}
                                                    </Td>
                                                    <Td sx={{whiteSpace: "nowrap",width: "1px",padding: "8px 14px"  }}>
                                                        <FiberManualRecordIcon 
                                                            sx={{color: value1.status==="1" ? "rgb(33, 150, 243)" :
                                                                        value1.status==="2" ? "rgb(198, 40, 40)"  :
                                                                        value1.status==="3" ? "rgb(255, 229, 127)":
                                                                        value1.status==="3" ? "rgb(103, 58, 183)":
                                                                        value1.status==="3" ? "rgb(158, 158, 158)":"rgb(237, 231, 246)"
                                                                ,height:"0.875rem",width:"0.875rem"}}/>
                                                    
                                                    </Td>
                                                    <Td sx={{padding: "8px 14px"  }} >
                                                        <a>{value1.detail}</a>
                                                    </Td>
                                                </Tr>
                         
                                            )
                                        })
                                    }
                                </>
                            )
                             
                        }
                            
                        )}
                         
                         
                    </Tbody>
                </Table>
            </div>
        </Box>
    )
}