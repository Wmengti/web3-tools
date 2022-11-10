// import Head from 'next/head';
// import Navigation from '../../components/Navigation/Navigation';
// import { useAccount } from 'wagmi';
// import { styled, useTheme } from '@mui/material/styles';
// import { Paper, Box, Card, Typography } from '@mui/material';
// import Calender from '../../components/Tools/Calender';
// import { MongoClient } from 'mongodb';
// import { useState } from 'react';
// export default function CalenderIndex() {
//   const theme = useTheme();

//   const Container = styled('div')(({ them }) => ({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: theme.spacing(0, 1),
//     width: '100%',
//     gap: '4rem',
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//   }));

//   return (
//     <div>
//       <Head>
//         <title>0x3c tools</title>
//         <meta name='description' content='web3 tools' />
//         <meta name='viewport' content='initial-scale=1, width=device-width' />
//         <link rel='icon' href='/tools.png' />
//       </Head>

//       <Navigation>
//         <Box
//           width='100%'
//           sx={{
//             // m: '0',
//             p: '5rem',
//           }}
//         >
//           <Typography variant='h2' sx={{ p: '2rem', marginBottom: '4rem' }}>
//             Bashboard
//           </Typography>
//           <Container>
//             <Paper
//               sx={{
//                 maxWidth: '100%',
//                 // m: '4rem auto',
//                 bgcolor: theme.palette.background.paper,
//                 borderRadius: '1rem',
//                 padding: '1rem 6rem',
//               }}
//               elevation={1}
//             >
//               <Calender />
//             </Paper>
//             <Paper
//               sx={{
//                 width: '100%',
//                 // m: '4rem auto',
//                 bgcolor: theme.palette.background.paper,
//                 borderRadius: '1rem',
//                 padding: '1rem 6rem',
//               }}
//               elevation={1}
//             >
//               <Typography variant='h3'>Daily Task</Typography>
//               <Box sx={{ display: 'grid' }}>
//                 <Typography variant='h2'>Bashboard</Typography>
//                 <Typography variant='h2'>Bashboard</Typography>
//                 <Typography variant='h2'>Bashboard</Typography>
//               </Box>
//             </Paper>
//           </Container>
//         </Box>
//       </Navigation>
//     </div>
//   );
// }

// export async function getStaticPaths() {
//   const posts = await fetch();
// }

// export async function getStaticProps(context) {
//   // fetch data from an API
//   const user = context.params.address;

//   console.log(user);

//   const client = await MongoClient.connect(
//
//   );
//   const db = client.db();

//   const Collection = db.collection('appointment');
//   const filterAppointment = await Collection.aggregate([
//     // { $match: { address: address } },
//     {
//       $group: {
//         _id: '$id',
//         max_date: {
//           $max: '$time',
//         },
//         records: {
//           $push: '$$ROOT',
//         },
//       },
//     },
//     {
//       $project: {
//         items: {
//           $filter: {
//             input: '$records',
//             as: 'records',
//             cond: {
//               $eq: ['$$records.time', '$max_date'],
//             },
//           },
//         },
//       },
//     },
//     {
//       $unwind: '$items',
//     },
//     {
//       $replaceWith: '$items',
//     },
//   ]).toArray();

//   console.log(filterAppointment, 'filterAppointment');

//   client.close();

//   return {
//     props: {
//       downData: filterAppointment.map((data) => ({
//         address: data.address,
//         time: data.time,
//         data: data.data,
//       })),
//     },
//     revalidate: 1,
//   };
// }
