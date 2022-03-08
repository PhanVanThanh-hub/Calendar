import React,{useState} from 'react';
 
import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button ,Grid, GridItem } from '@chakra-ui/react';
 
import * as yup from 'yup';

import {Event} from '../../../../models/Event';

import {InputField} from '../../../../components/FormField/InputField';
import {RadioGroupField} from '../../../../components/FormField/RadioField';
import {DateField} from '../../../../components/FormField/DateTimeField'; 

export interface EventProps{
    initalValues?:Event;
    onSubmit:(formValues: Event) => void;
}

export default function FormAdd({initalValues,onSubmit}:EventProps){
    const [error, setError] = useState<string>();
    const schema = yup
        .object({
            title:yup
                .string()
                .required('Please enter title'),
            detail:yup
                .string()
                .required('Please enter detail'),
            background: yup
                .string()
                .oneOf(['blue','red', 'yellow', 'orange',"green","teal","purple"], 'Please choose background color')
                .required('Please choose background color'),
            color: yup
                .string()
                .oneOf(['black','red', 'yellow','gray','orange',"green","teal","purple"], 'Please choose background color')
                .required('Please choose background color'),
            startTime: yup.string().required("start time cannot be empty"),
            endTime: yup
                  .string()
                  .required("end time cannot be empty")
                  .test("is-greater", "end time should be greater", function(value) {
                    const { startTime } = this.parent;
                    return moment(value, "HH:mm").isSameOrAfter(moment(startTime, "HH:mm"));
                  })   
          
            
             
        })
        .required();

    const { control, handleSubmit, formState: {isSubmitting} } = useForm<Event>({
        defaultValues: initalValues,
        resolver: yupResolver(schema),
    });
    const handleFormSubmit =  (formValues: Event) => {
        try {
            
            setError('')
             onSubmit?.(formValues);
        } catch (error: any) {
            setError(error.message)
        }
    };
  
    return(
      
          
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="title" control={control} label="Title Event" inputProps={{height:"40px",minHeight:"0px"}} />
                <InputField name="detail" control={control} label="Detail Event" inputProps={{height:"100px"}} />
                <Grid templateColumns='repeat(2, 1fr)' gap={1}  >
                    <GridItem>
                        <DateField name="startTime" control={control} label="Start Time(HH:mm)"/>
                    </GridItem>
                     
                    <GridItem>
                        <DateField name="endTime" control={control} label="End Time(HH:mm)"/>
                    </GridItem>
                </Grid>
                
                <RadioGroupField 
                    name="background" control={control} 
                    label="Background Color"
                    options={[
                        { label:"Blue",value:"blue"},
                        { label: 'Red', value: 'red' },
                        { label: 'yellow', value: 'yellow' },
                        { label:"Orange",value:"orange"},
                        { label:"Green",value:"green"},
                        { label:"Teal",value:"teal"},
                        { label:"Purple",value:"purple"},
                    ]}
                />
                <RadioGroupField 
                    name="color" control={control} 
                    label="Text Color"
                    options={[
                        { label:"Gray",value:"gray"},
                        { label: 'Red', value: 'red' },
                        { label: 'yellow', value: 'yellow' },
                         
                        { label:"Orange",value:"orange"},
                        { label:"Green",value:"green"},
                        { label:"Teal",value:"teal"},
                        { label:"Purple",value:"purple"},

                    ]}
                />
                <div style={{justifyContent: "center",display: "flex",marginTop:"10px"}}>
                    <Button colorScheme='blue' mr={3} type="submit"    >
                        Add Event
                    </Button>
                </div>
                 
            </form>

         
    )
}