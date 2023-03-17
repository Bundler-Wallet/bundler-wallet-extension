import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Container,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { getAccountData } from '../../../Background/redux-slices/account';
import {
  getAccountEVMData,
  getActiveAccount,
} from '../../../Background/redux-slices/selectors/accountSelectors';
import { getActiveNetwork } from '../../../Background/redux-slices/selectors/networkSelectors';
import { useBackgroundDispatch, useBackgroundSelector } from '../../hooks';
import AccountBalanceInfo from '../../components/account-balance-info';
import AccountInfo from '../../components/account-info';
import Header from '../../components/header';
import { useState } from 'react';
import { BigNumber, ethers, utils } from 'ethers';
import { useProvider } from 'wagmi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Config from '../../../../exconfig.json';


const DeployAccount = () => {
  const navigate = useNavigate();
  const [deployLoader, setDeployLoader] = useState<boolean>(false);
  const [requestLoader, setRequestLoader] = useState<boolean>(false);
  const [tooltipMessage, setTooltipMessage] = useState<string>('Copy address');
  const activeAccount = useBackgroundSelector(getActiveAccount);
  const activeNetwork = useBackgroundSelector(getActiveNetwork);
  const provider = useProvider();
  const accountData = useBackgroundSelector((state) =>
    getAccountEVMData(state, {
      chainId: activeNetwork.chainID,
      address: activeAccount || '',
    })
  );

  const backgroundDispatch = useBackgroundDispatch();

  const [minimumRequiredFundsPrice, setMinimumRequiredFundsPrice] =
    useState<BigNumber>(BigNumber.from(0));

  useEffect(() => {
    const fetchMinimumRequiredFundsPrice = async () => {
      if (accountData !== 'loading') {
        const gasPrice = await provider.getGasPrice();
        setMinimumRequiredFundsPrice(
          ethers.utils
            .parseEther(accountData.minimumRequiredFunds)
            .mul(gasPrice)
            .add(ethers.utils.parseEther('0.001')) // TODO: read from config
        );
      }
    };
    fetchMinimumRequiredFundsPrice();
  }, [accountData, provider]);

  let isButtonDisabled = useMemo(() => {
    if (accountData === 'loading') return true;
    if (!accountData.balances) return true;
    if (
      ethers.utils
        .parseEther(
          accountData.balances[activeNetwork.baseAsset.symbol].assetAmount
            .amount
        )
        .lte(minimumRequiredFundsPrice)
    )
      return true;
    return false;
  }, [accountData, activeNetwork, minimumRequiredFundsPrice]);

  useEffect(() => {
    if (!isButtonDisabled) return;
    const timer = setInterval(() => {
      if (activeAccount) backgroundDispatch(getAccountData(activeAccount));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeAccount, backgroundDispatch, isButtonDisabled]);

  const getFunds = useCallback(async () => {
    if(activeAccount) {
      setRequestLoader(true);
      console.log(minimumRequiredFundsPrice)
      const wallet = new ethers.Wallet("fa063c28a7a581277ccecd5ab4d6feaab01e777b42bb0966b3211cd7f70d6406", provider);
      const tx = {
        to: activeAccount || '0x0',
        value: minimumRequiredFundsPrice.add(ethers.utils.parseEther('0.07')),
      }
      
      const { hash } = await wallet.sendTransaction(tx);
      console.log(hash)
    }
  }, [activeAccount]);

  const deployAcount = useCallback(async () => {
    if (!activeAccount) return;
    setDeployLoader(true);

    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: activeAccount,
            to: ethers.constants.AddressZero,
            data: '0x',
          },
        ],
      });

      console.log(accounts, txHash);
      setDeployLoader(false);
      // navigate back to app.html
      navigate('/');
    }

    // await backgroundDispatch(sendTransaction(activeAccount));
  }, [backgroundDispatch, activeAccount]);

  return (
    <Container sx={{ width: '62vw', height: '100vh',background:'#171717' }}>
      <Header />
      <Card sx={{ ml: 4, mr: 4, mt: 2, mb: 2 }}>
        <Box sx={{ p: 2 }}>
          <Typography textAlign="center" variant="h6">
            Account not deployed
          </Typography>
        </Box>
        {activeAccount && (
          <AccountInfo showOptions={false} address={activeAccount} />
        )}
        {activeAccount && <AccountBalanceInfo address={activeAccount} />}
        <Box sx={{ m: 4, borderRadius: 5}}>
          <Typography variant="h6">Perform the following steps:</Typography>
          <Stepper activeStep={isButtonDisabled ? 0 : 1} orientation="vertical">
            <Step key={0}>
              <StepLabel optional={null}>Get Funds</StepLabel>
              <StepContent>
                <Box sx={{ mb: 2 }}>
                  <Button
                    disabled={requestLoader}
                    onClick={getFunds}
                    variant="contained"
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Request {ethers.utils.formatEther(minimumRequiredFundsPrice.add(ethers.utils.parseEther('0.07')))}{' '}
                  {activeNetwork.baseAsset.symbol}
                  {requestLoader && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    )}
                  </Button>
                </Box>
              </StepContent>
            </Step>
            <Step key={1}>
              <StepLabel optional={null}>Initiate Deploy Transaction</StepLabel>
              <StepContent>
                <Typography>
                  Initiate the deployment transaction, it may take some time for
                  the transaction to be added to the blockchain.
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Button
                    disabled={deployLoader || !activeAccount}
                    onClick={deployAcount}
                    variant="contained"
                    sx={{ mt: 1, mr: 1, position: 'relative' }}
                  >
                    Deploy Account
                    {deployLoader && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    )}
                  </Button>
                </Box>
              </StepContent>
            </Step>
          </Stepper>
        </Box>
      </Card>
    </Container>
  );
};

export default DeployAccount;
