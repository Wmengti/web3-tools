import { Typography, Paper, Box, Button } from '@mui/material';
import {
  useAccount,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from 'wagmi';
import { useDebounce } from 'use-debounce';
import { styled, useTheme } from '@mui/material/styles';
import CustomizedInputs from '../Tools/Input';
import { useEffect, useState } from 'react';
import { utils } from 'ethers';

import disperseAbi from '../../../hardhat/constants/disperseAbi.json';
import addressGroup from '../../../hardhat/constants/disperseAddress.json';
import { erc20Abi } from '../../utils';
const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  padding: '2rem 6rem 6rem 6rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '1.5rem',
  ...theme.mixins.toolbar,
}));
const BatchSendToken = (props) => {
  const { address } = useAccount();
  const [functionStep, setFunctionStep] = useState(1);

  const [isSubmit, setIsSubmit] = useState(false);
  const [recipientAddress, setRecipitentAddress] = useState([]);
  const [tokenAddress, setTokenAddress] = useState('');
  const [totalAmount, setTotalAmount] = useState();
  const [amount, setAmount] = useState([]);

  const [deRecipient] = useDebounce(recipientAddress, 500);
  const [deAmount] = useDebounce(amount, 500);
  const [deTotalAmount] = useDebounce(totalAmount, 500);
  const [deTokenAddress] = useDebounce(tokenAddress, 500);

  const disperseAddress = addressGroup[5];
  const parmasApprove = [disperseAddress, deTotalAmount];
  const paramsERC20 = [deTokenAddress, deRecipient, deAmount];

  // input handler
  const tokenAddressHandler = (input) => {
    setTokenAddress(input.toString());
  };
  const recipientHandler = (input) => {
    const addressArray = input.split(',');
    setRecipitentAddress(addressArray);
  };
  const amountHandler = (input) => {
    setTotalAmount(utils.parseEther(input.toString() || ''));
    if (recipientAddress.length) {
      const amountArray = Array(recipientAddress.length).fill(
        utils.parseEther((input / recipientAddress.length).toString())
      );

      setAmount(amountArray);
    }
  };
  const { data: allowanceData } = useContractRead({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, disperseAddress],
    onSuccess(data) {
      console.log('Success', data);
    },
  });

  useEffect(() => {
    if (allowanceData) {
      const allowanceAmount = utils.formatEther(allowanceData).toString();
      if (allowanceAmount < deTotalAmount) {
        setFunctionStep(1);
      } else {
        setFunctionStep(2);
      }
    }
  }, [deTotalAmount]);

  console.log('functionStep', functionStep);

  let config;
  if (functionStep === 1) {
    config = {
      mode: 'recklesslyUnprepared',
      address: tokenAddress,
      abi: erc20Abi,

      functionName: 'approve',
      args: parmasApprove,
      enabled: Boolean(tokenAddress),

      onError: (err) => {
        console.error(err?.error?.message ?? err?.message);
      },
    };
  } else {
    config = {
      mode: 'recklesslyUnprepared',
      address: disperseAddress,
      abi: disperseAbi,

      functionName: 'disperseToken',
      args: paramsERC20,
      enabled: Boolean(tokenAddress),

      onError: (err) => {
        console.error(err?.error?.message ?? err?.message);
      },
    };
  }
  const { data, write } = useContractWrite(config);

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

  // console.log('error', error?.message);
  // console.log('select', props.select);
  // console.log(functionStep, config);
  return (
    <Form onSubmit={submitHandler}>
      <Typography variant='h5'>Token Address</Typography>
      <CustomizedInputs
        placeholder={'0xA0Cf...251e'}
        inputContent={tokenAddressHandler}
      />

      <Typography variant='h5'>Recipient</Typography>
      <CustomizedInputs
        placeholder={'0xA0Cf...251e,0xb1ad...22e8,...'}
        inputContent={recipientHandler}
      />
      <Typography variant='h5'>Total Amount</Typography>
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
        {functionStep === 1 ? 'Approve' : 'Submit'}
      </Button>
    </Form>
  );
};

export default BatchSendToken;
