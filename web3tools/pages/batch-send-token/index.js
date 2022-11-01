import Navigation from '../../components/Navigation/Navigation';
import { Paper, Box } from '@mui/material';

import HorizontalLabelPositionBelowStepper from '../../components/Tools/Stepper';

import { styled, useTheme } from '@mui/material/styles';

import BatchSendEther from '../../components/Functions/BatchSendEther';
import BatchSendToken from '../../components/Functions/BatchSendToken';
import BasicSelect from '../../components/Tools/Select';
import { useState } from 'react';

const BatchSend = () => {
  const theme = useTheme();

  const [step, setStep] = useState(0);
  const [selectType, setSelectType] = useState(10);

  const stepHandler = (switchStep) => {
    setStep(switchStep);
  };
  const selectHandler = (select) => {
    setSelectType(select);
  };

  return (
    <Navigation>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          p: '6rem 0',
        }}
      >
        <Box
          width='80%'
          sx={{
            m: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <HorizontalLabelPositionBelowStepper step={step} />
          <Paper
            sx={{
              width: '80%',
              m: '4rem auto',
              bgcolor: theme.palette.background.paper,
              borderRadius: '1rem',
              padding: '1rem 6rem',
            }}
            elevation={5}
          >
            <BasicSelect select={selectHandler} />
            {selectType === 10 ? <BatchSendEther step={stepHandler} /> : null}
            {selectType === 20 ? <BatchSendToken step={stepHandler} /> : null}
          </Paper>
        </Box>
      </Box>
    </Navigation>
  );
};

export default BatchSend;
