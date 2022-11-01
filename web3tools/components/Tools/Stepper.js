import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
const steps = ['Send Transaction', 'Wait For Transaction', 'Successfully Send'];

export default function HorizontalLabelPositionBelowStepper(props) {
  const theme = useTheme();
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={props.step}
        alternativeLabel
        sx={{
          '& .MuiStepLabel-iconContainer': {
            transform: 'scale(1.5)',
            '& .MuiSvgIcon-root': {
              fill: theme.palette.text.primary,
            },
            text: {
              fill: theme.palette.background.default,
              fontSize: '1.2rem',
            },
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                '& .MuiStepLabel-labelContainer span': {
                  fontSize: '1.6rem',
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
