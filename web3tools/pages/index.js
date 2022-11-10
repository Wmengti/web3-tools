import Head from 'next/head';
import Navigation from '../components/Navigation/Navigation';
import { useAccount } from 'wagmi';
import { styled, useTheme } from '@mui/material/styles';
import { Paper, Box, Card, Typography } from '@mui/material';
import Calender from '../components/Tools/Calender';

import { useState } from 'react';
export default function Home() {
  const theme = useTheme();

  const Container = styled('div')(({ them }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    width: '100%',
    gap: '4rem',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <div>
      <Head>
        <title>0x3c tools</title>
        <meta name='description' content='web3 tools' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/tools.png' />
      </Head>

      <Navigation>
        <Box
          width='100%'
          sx={{
            // m: '0',
            p: '5rem',
          }}
        >
          <Typography variant='h2' sx={{ p: '2rem', marginBottom: '4rem' }}>
            Bashboard
          </Typography>
          <Container>
            <Paper
              sx={{
                maxWidth: '100%',
                // m: '4rem auto',
                bgcolor: theme.palette.background.paper,
                borderRadius: '1rem',
                padding: '1rem 6rem',
              }}
              elevation={1}
            >
              <Calender />
            </Paper>
            <Paper
              sx={{
                width: '100%',
                // m: '4rem auto',
                bgcolor: theme.palette.background.paper,
                borderRadius: '1rem',
                padding: '1rem 6rem',
              }}
              elevation={1}
            >
              <Typography variant='h3'>Daily Task</Typography>
              <Box sx={{ display: 'grid' }}>
                {/* <Typography variant='h2'>Bashboard</Typography>
                <Typography variant='h2'>Bashboard</Typography>
                <Typography variant='h2'>Bashboard</Typography> */}
              </Box>
            </Paper>
          </Container>
        </Box>
      </Navigation>
    </div>
  );
}
