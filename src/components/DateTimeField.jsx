import * as React from 'react';
import { Input } from '@chakra-ui/react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticTimePicker from '@mui/lab/StaticTimePicker';

export default function StaticTimePickerDemo() {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticTimePicker
        displayStaticWrapperAs="mobile"
        value={value}
        onChange={(newValue) => {
          console.log("??:",newValue)
        }}
        renderInput={( ) => <Input   />}
      />
    </LocalizationProvider>
  );
}