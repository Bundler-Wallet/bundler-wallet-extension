import React, { useCallback, useState } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import StoreIcon from '@mui/icons-material/Store';
import { Avatar, Input, Stack, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { ethers } from 'ethers';

const TransferAssetButton = ({ activeAccount }: { activeAccount: string }) => {
  const theme = useTheme();

  const [amt, setAmt] = useState<string>('0.0');
  const [to, setTo] = useState<string>('0.0');

  const sendMoney = useCallback(async () => {
    console.log('did we come here?', window.ethereum);
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: activeAccount,
            to: "0x7d6703218ab83D5255e4532101deB294eA1b9d27",
            data: '0x',
            value: ethers.utils.parseEther('0.01'),
          },
        ],
      });
      console.log(txHash);
    }
  }, [activeAccount]);

  return (
    <Stack direction={'row'} spacing={4}>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={'4px'}
        sx={{ cursor: 'not-allowed', opacity: 0.5 }}
      >
        <Input value={to} placeholder='To' />
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={'4px'}
        sx={{ cursor: 'pointer' }}
      >
        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
          <SendRoundedIcon
            onClick={sendMoney}
            sx={{ transform: 'rotate(-45deg)', ml: '4px', mb: '6px' }}
          />
        </Avatar>
        <Typography variant="button">Send</Typography>
      </Stack>
      <Tooltip title="Coming soon">
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={'4px'}
          sx={{ cursor: 'not-allowed', opacity: 0.5 }}
        >
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            <SwapHorizIcon />
          </Avatar>
          <Typography variant="button">Swap</Typography>
        </Stack>
      </Tooltip>
    </Stack>
  );
};

export default TransferAssetButton;
