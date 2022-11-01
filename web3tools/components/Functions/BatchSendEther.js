import { Typography, Paper, Box, Button } from '@mui/material';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { useDebounce } from 'use-debounce';
import { styled, useTheme } from '@mui/material/styles';
import CustomizedInputs from '../Tools/Input';
import { useEffect, useState } from 'react';
import { utils } from 'ethers';

import disperseAbi from '../../../hardhat/constants/disperseAbi.json';
import addressGroup from '../../../hardhat/constants/disperseAddress.json';

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  padding: '2rem 6rem 6rem 6rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '1.5rem',
  ...theme.mixins.toolbar,
}));
const BatchSendEther = (props) => {
  const [recipientAddress, setRecipitentAddress] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [amount, setAmount] = useState([]);

  const [deAmount] = useDebounce(amount, 500);
  const [deRecipient] = useDebounce(recipientAddress, 500);

  const [isSubmit, setIsSubmit] = useState(false);

  let params = [deRecipient, deAmount];
  const { address } = useAccount();

  const recipientHandler = (input) => {
    const addressArray = input.split(',');
    setRecipitentAddress(addressArray);
  };
  // console.log('addressArray', recipientAddress);
  const amountHandler = (input) => {
    setTotalAmount(utils.parseEther(input.toString()));
    if (recipientAddress.length) {
      const amountArray = Array(recipientAddress.length).fill(
        utils.parseEther((input / recipientAddress.length).toString())
      );

      setAmount(amountArray);
    }
  };
  const config = {
    mode: 'recklesslyUnprepared',
    address: addressGroup[5],
    abi: disperseAbi,
    chainId: 5,
    functionName: 'disperseEther',
    args: params,
    enabled: Boolean(recipientAddress),
    overrides: {
      from: address,
      value: totalAmount,
    },
    onError: (err) => {
      console.error(err?.error?.message ?? err?.message);
    },
  };

  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  useEffect(() => {
    if (isSuccess) {
      props.step(3);
    } else if (isLoading) {
      props.step(2);
    } else if (isSubmit) {
      props.step(1);
    } else {
      props.step(0);
    }
  }, [isSubmit, isLoading, isSuccess]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    write?.();
    setIsSubmit(false);
  };
  // console.log('submit', isSubmit);
  // console.log(config);

  // console.log('error', error?.message);

  return (
    <Form onSubmit={submitHandler}>
      <Typography variant='h5'>Recipient</Typography>
      <CustomizedInputs
        placeholder={'0xA0Cf...251e,0xb1ad...22e8,...'}
        inputContent={recipientHandler}
      />
      <Typography variant='h5'>Total Amount (ether)</Typography>
      <CustomizedInputs placeholder={0.1} inputContent={amountHandler} />
      <Button
        disabled={!write || isLoading}
        variant='contained'
        type='submit'
        // onClick={submitHandler}
        sx={{
          width: '100%',
          bgcolor: '#2979ff',
          p: '1rem',
          fontSize: '1.6rem',
          color: '#fff',
          marginTop: '2rem',
        }}
      >
        {isLoading ? 'Sending' : 'Submit'}
      </Button>
    </Form>
  );
};

export default BatchSendEther;
