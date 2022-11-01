import * as React from 'react';
import Box from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const [selectType, setSelectType] = React.useState('');

  const handleChange = (event) => {
    setSelectType(event.target.value);
    props.select(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: '2rem' }}>
      <FormControl sx={{ width: '30%' }} color='border'>
        <InputLabel id='select-label'>Select Token Type</InputLabel>
        <Select
          variant='outlined'
          labelId='select-label'
          id='select'
          value={selectType}
          label='Select Token Type'
          onChange={handleChange}
          placeholder='Select Token Type'
        >
          <MenuItem value={10}>ETH</MenuItem>
          <MenuItem value={20}>ERC20 Token</MenuItem>
          <MenuItem value={30}>ERC721 NFT</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
