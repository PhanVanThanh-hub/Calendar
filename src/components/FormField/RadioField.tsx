import {
    FormControl,
    FormLabel,
    FormHelperText,
  } from '@chakra-ui/react';
  import { Radio, RadioGroup } from '@chakra-ui/react'
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOptions {
    label?: string;
    value: string | number;
}

export interface RadioGroupFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
    disabled?: boolean;
    options: RadioOptions[];
}

export function RadioGroupField({ name, control, label, disabled, options }: RadioGroupFieldProps) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { error, invalid },
    } = useController({ name, control });
 
    return (
        <FormControl  as='fieldset' >
            <FormLabel  as='legend'>{label}</FormLabel>
            <RadioGroup onChange={onChange} onBlur={onBlur} value={value}>
                 
                {options.map((option) => {
                    const color:string = String(option.value)
             
                    return(
                    <Radio 
                        key={option.value}
                        value={option.value}
                        sx={{ borderColor:option.value,marginRight:"30px"}}
                        colorScheme={color}
                    >
                         
                    </Radio>
                    )
                })}
                <FormHelperText>{error?.message}</FormHelperText>
            </RadioGroup>
        </FormControl>
    );
}
