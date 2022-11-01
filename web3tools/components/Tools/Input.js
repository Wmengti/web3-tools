import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.input,

    border: '1px solid #000',
    fontSize: '1.6rem',
    width: '100%',
    margin: '0 auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',

      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.background.border, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function CustomizedInputs(props) {
  const onChangeHandler = (event) => {
    props.inputContent(event.target.value);
  };
  return (
    // <Box component='form' noValidate sx={{ width: '400rem', maxWidth: '100%' }}>
    //   <FormControl variant='standard'>
    //     <InputLabel shrink htmlFor='recipient-input'>
    //       Recipient
    //     </InputLabel>
    <BootstrapInput
      fullWidth
      placeholder={props.placeholder}
      onChange={onChangeHandler}
      multiline
      id='recipient-input'
      required
    />
    // </FormControl>
    // </Box>
  );
}
