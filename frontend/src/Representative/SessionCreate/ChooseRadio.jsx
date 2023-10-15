import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export default function RadioPositionEnd({what}) {

  const handleChange = (event) => {
    setWhat(event.target.value);
  };


  return (
    <FormControl>
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={what}
      onChange={handleChange}
    >
      <FormControlLabel value="Corporate" control={<Radio />} label="Corporate" />
      <FormControlLabel value="Community" control={<Radio />} label="Male" />
    </RadioGroup>
  </FormControl>
  );
}